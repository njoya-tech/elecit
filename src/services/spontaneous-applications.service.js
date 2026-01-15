// src/services/spontaneous-applications.service.js

class SpontaneousApplicationsService {
  
  /**
   * Soumettre une candidature spontanée (SANS offre d'emploi liée)
   * @param {Object} applicationData - Données du formulaire
   * @returns {Promise<Object>}
   */
  async submitSpontaneousApplication(applicationData) {
    try {
      console.log('📤 Envoi candidature spontanée');
      console.log('📋 Données:', applicationData);

      // 1. Upload du CV d'abord (si fichier présent)
      let cvFileId = null;
      if (applicationData.cvFile) {
        cvFileId = await this._uploadCV(applicationData.cvFile);
        if (!cvFileId) {
          throw new Error('Erreur lors de l\'upload du CV');
        }
      }

      // 2. Formater la date de naissance
      const birthDate = this._formatBirthDate(
        applicationData.day,
        applicationData.month,
        applicationData.year
      );

      // 3. Créer l'objet de candidature spontanée
      const payload = {
        // Informations personnelles
        first_name: applicationData.firstName || applicationData.name,
        last_name: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        sex: applicationData.sex,
        birth_date: birthDate,
        
        // ⚠️ PAS de relation job_offer (candidature spontanée)
        job_offer: null,
        
        // Poste souhaité (texte libre)
        desired_position: applicationData.position,
        
        // Motivation
        motivation: applicationData.motivation,
        
        // CV (relation vers directus_files)
        cv_file: cvFileId,
        
        // Métadonnées
        status: 'published',
        application_status: 'pending',
        application_date: new Date().toISOString(),
        is_spontaneous: true // ⚠️ Flag pour distinguer les candidatures spontanées
      };

      console.log('📦 Payload final:', payload);

      // 4. Envoyer la candidature à Directus
      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.errors?.[0]?.message || 'Erreur lors de l\'envoi');
      }

      const result = await response.json();
      console.log('✅ Candidature spontanée envoyée:', result);

      return {
        success: true,
        data: result.data,
        message: 'Candidature spontanée envoyée avec succès'
      };

    } catch (error) {
      console.error('❌ Erreur submitSpontaneousApplication:', error);
      return {
        success: false,
        error: error.message,
        message: 'Erreur lors de l\'envoi de la candidature'
      };
    }
  }

  /**
   * Upload du fichier CV vers Directus
   * @private
   */
  async _uploadCV(file) {
    try {
      console.log('📤 Upload CV:', file.name);

      const formData = new FormData();
      formData.append('file', file);

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/files`;
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.error('❌ Erreur upload CV:', response.status);
        return null;
      }

      const result = await response.json();
      console.log('✅ CV uploadé, ID:', result.data.id);
      
      return result.data.id;

    } catch (error) {
      console.error('❌ Erreur _uploadCV:', error);
      return null;
    }
  }

  /**
   * Formater la date de naissance
   * @private
   */
  _formatBirthDate(day, month, year) {
    if (!day || !month || !year) return null;
    
    const paddedDay = day.toString().padStart(2, '0');
    const paddedMonth = month.toString().padStart(2, '0');
    
    return `${year}-${paddedMonth}-${paddedDay}`;
  }

  /**
   * Récupérer les candidatures spontanées par email
   * @param {string} email - Email du candidat
   * @returns {Promise<Array>}
   */
  async getSpontaneousApplicationsByEmail(email) {
    try {
      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications?filter[email][_eq]=${email}&filter[is_spontaneous][_eq]=true&filter[status][_eq]=published&fields=*&sort[]=-application_date`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ Erreur récupération candidatures spontanées');
        return [];
      }

      const result = await response.json();
      return result.data || [];

    } catch (error) {
      console.error('❌ Erreur getSpontaneousApplicationsByEmail:', error);
      return [];
    }
  }

  /**
   * Vérifier si un email a déjà envoyé une candidature spontanée récemment
   * @param {string} email - Email du candidat
   * @param {number} daysLimit - Nombre de jours (défaut: 30)
   * @returns {Promise<boolean>}
   */
  async hasRecentSpontaneousApplication(email, daysLimit = 30) {
    try {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() - daysLimit);
      const limitDateISO = limitDate.toISOString();

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications?filter[email][_eq]=${email}&filter[is_spontaneous][_eq]=true&filter[application_date][_gte]=${limitDateISO}&limit=1`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      return (result.data || []).length > 0;

    } catch (error) {
      console.error('❌ Erreur hasRecentSpontaneousApplication:', error);
      return false;
    }
  }

  /**
   * Valider les données du formulaire de candidature spontanée
   * @param {Object} formData - Données du formulaire
   * @returns {Object} { valid: boolean, errors: Array }
   */
  validateFormData(formData) {
    const errors = [];

    // Validation nom et prénom
    if (!formData.firstName && !formData.name) {
      errors.push('Le prénom est requis');
    } else if ((formData.firstName || formData.name).trim().length < 2) {
      errors.push('Le prénom doit contenir au moins 2 caractères');
    }
    
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      errors.push('Le nom de famille doit contenir au moins 2 caractères');
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push('Email invalide');
    }

    // Validation téléphone
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.push('Numéro de téléphone invalide (minimum 8 chiffres)');
    }

    // Validation sexe
    if (!formData.sex || !['Masculin', 'Féminin'].includes(formData.sex)) {
      errors.push('Veuillez sélectionner votre sexe');
    }

    // Validation date de naissance
    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);

    if (!day || day < 1 || day > 31) {
      errors.push('Jour de naissance invalide');
    }
    if (!month || month < 1 || month > 12) {
      errors.push('Mois de naissance invalide');
    }
    if (!year || year < 1940 || year > new Date().getFullYear() - 16) {
      errors.push('Année de naissance invalide (vous devez avoir au moins 16 ans)');
    }

    // Validation poste souhaité (⚠️ REQUIS pour candidature spontanée)
    if (!formData.position || formData.position.trim().length < 3) {
      errors.push('Veuillez préciser le poste souhaité (minimum 3 caractères)');
    }

    // Validation motivation
    if (!formData.motivation || formData.motivation.trim().length < 50) {
      errors.push('La lettre de motivation doit contenir au moins 50 caractères');
    }

    // Validation CV
    if (!formData.cvFile) {
      errors.push('Veuillez joindre votre CV');
    } else {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(formData.cvFile.type)) {
        errors.push('Le CV doit être au format PDF ou Word');
      }
      if (formData.cvFile.size > maxSize) {
        errors.push('Le CV ne doit pas dépasser 5 MB');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default new SpontaneousApplicationsService();