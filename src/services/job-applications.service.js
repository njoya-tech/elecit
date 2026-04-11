// src/services/job-applications.service.js

class JobApplicationsService {
  
  /**
   * Soumettre une candidature
   * @param {Object} applicationData - Données du formulaire
   * @param {number} jobOfferId - ID de l'offre d'emploi
   * @returns {Promise<Object>}
   */
  async submitApplication(applicationData, jobOfferId) {
    try {
      console.log('📤 Envoi candidature pour offre:', jobOfferId);
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

      // 3. Créer l'objet de candidature
      const payload = {
        // Informations personnelles
        first_name: applicationData.firstName || applicationData.name,
        last_name: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        sex: applicationData.sex,
        birth_date: birthDate,
        
        // Relation avec l'offre d'emploi
        job_offer: jobOfferId,
         job_offer_title: applicationData.jobTitle,
        
        // Motivation
        motivation: applicationData.motivation,
        
        // CV (relation vers directus_files)
        cv_file: cvFileId,
        
        // Métadonnées
        status: 'published',
        application_status: 'pending',
        application_date: new Date().toISOString(),
        is_spontaneous: false // ✅ Explicitement false pour les candidatures liées
      };

      console.log('📦 Payload final:', payload);

      // 4. Envoyer la candidature à Directus
      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications`;
      const token = import.meta.env.VITE_DIRECTUS_TOKEN; // ✅ Fix: token ajouté
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ Fix: manquait ici
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.errors?.[0]?.message || 'Erreur lors de l\'envoi');
      }

      const result = await response.json();
      console.log('✅ Candidature envoyée:', result);

      return {
        success: true,
        data: result.data,
        message: 'Candidature envoyée avec succès'
      };

    } catch (error) {
      console.error('❌ Erreur submitApplication:', error);
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
      const token = import.meta.env.VITE_DIRECTUS_TOKEN;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // ✅ Fix: manquait ici
          // ⚠️ Ne pas mettre Content-Type, FormData le gère seul
        },
        body: formData
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error('❌ Erreur upload CV:', response.status, errorBody);
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
   * Récupérer les candidatures d'un utilisateur par email
   * @param {string} email - Email du candidat
   * @returns {Promise<Array>}
   */
  async getApplicationsByEmail(email) {
    try {
      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications?filter[email][_eq]=${email}&filter[status][_eq]=published&fields=*,job_offer.id,job_offer.translations.*&sort[]=-application_date`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ Erreur récupération candidatures');
        return [];
      }

      const result = await response.json();
      return result.data || [];

    } catch (error) {
      console.error('❌ Erreur getApplicationsByEmail:', error);
      return [];
    }
  }

  /**
   * Vérifier si un email a déjà postulé pour une offre
   * @param {string} email - Email du candidat
   * @param {number} jobOfferId - ID de l'offre
   * @returns {Promise<boolean>}
   */
  async hasAlreadyApplied(email, jobOfferId) {
    try {
      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_applications?filter[email][_eq]=${email}&filter[job_offer][_eq]=${jobOfferId}&filter[status][_eq]=published&limit=1`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      return (result.data || []).length > 0;

    } catch (error) {
      console.error('❌ Erreur hasAlreadyApplied:', error);
      return false;
    }
  }

  /**
   * Valider les données du formulaire
   * @param {Object} formData - Données du formulaire
   * @returns {Object} { valid: boolean, errors: Array }
   */
  validateFormData(formData) {
    const errors = [];

    if (!formData.firstName && !formData.name) {
      errors.push('Le prénom est requis');
    } else if ((formData.firstName || formData.name).trim().length < 2) {
      errors.push('Le prénom doit contenir au moins 2 caractères');
    }
    
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      errors.push('Le nom de famille doit contenir au moins 2 caractères');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push('Email invalide');
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.push('Numéro de téléphone invalide (minimum 8 chiffres)');
    }

    if (!formData.sex || !['Masculin', 'Féminin'].includes(formData.sex)) {
      errors.push('Veuillez sélectionner votre sexe');
    }

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

    if (!formData.motivation || formData.motivation.trim().length < 50) {
      errors.push('La lettre de motivation doit contenir au moins 50 caractères');
    }

    if (!formData.cvFile) {
      errors.push('Veuillez joindre votre CV');
    } else {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024;

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

export default new JobApplicationsService();