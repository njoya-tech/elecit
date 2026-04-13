// src/services/job-applications.service.js
import { directus } from "./api/directus";
import { createItem, readItems } from "@directus/sdk";
import { uploadCV } from "./cv-upload";

class JobApplicationsService {

  async submitApplication(applicationData, jobOfferId) {
    try {
      console.log('📤 Envoi candidature pour offre:', jobOfferId);

      let cvFileId = null;
      if (applicationData.cvFile) {
        cvFileId = await uploadCV(applicationData.cvFile);
        if (!cvFileId) throw new Error("Erreur lors de l'upload du CV");
      }

      const submission = await directus.request(
        createItem("job_applications", {
          first_name: applicationData.firstName || applicationData.name,
          last_name: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          sex: applicationData.sex,
          birth_date: this._formatBirthDate(applicationData.day, applicationData.month, applicationData.year),
          job_offer: jobOfferId,
          job_offer_title: applicationData.jobTitle,
          motivation: applicationData.motivation,
          cv_files: cvFileId,
          status: "published",
          application_status: "pending",
          application_date: new Date().toISOString(),
          is_spontaneous: false,
        })
      );

      console.log('✅ Candidature envoyée:', submission);
      return { success: true, data: submission, message: "Candidature envoyée avec succès" };

    } catch (error) {
      console.error('❌ Erreur submitApplication:', error);
      return { success: false, error: error.message, message: "Erreur lors de l'envoi de la candidature" };
    }
  }

  _formatBirthDate(day, month, year) {
    if (!day || !month || !year) return null;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  async getApplicationsByEmail(email) {
    try {
      return await directus.request(
        readItems("job_applications", {
          filter: { email: { _eq: email }, status: { _eq: "published" } },
          fields: ["*", "job_offer.id", "job_offer.translations.*"],
          sort: ["-application_date"],
        })
      ) || [];
    } catch (error) {
      console.error('❌ Erreur getApplicationsByEmail:', error);
      return [];
    }
  }

  async hasAlreadyApplied(email, jobOfferId) {
    try {
      const results = await directus.request(
        readItems("job_applications", {
          filter: { email: { _eq: email }, job_offer: { _eq: jobOfferId }, status: { _eq: "published" } },
          limit: 1,
        })
      );
      return (results || []).length > 0;
    } catch (error) {
      console.error('❌ Erreur hasAlreadyApplied:', error);
      return false;
    }
  }

  validateFormData(formData) {
    const errors = [];

    if (!formData.firstName && !formData.name) {
      errors.push("Le prénom est requis");
    } else if ((formData.firstName || formData.name).trim().length < 2) {
      errors.push("Le prénom doit contenir au moins 2 caractères");
    }
    if (!formData.lastName || formData.lastName.trim().length < 2) errors.push("Le nom de famille doit contenir au moins 2 caractères");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) errors.push("Email invalide");

    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) errors.push("Numéro de téléphone invalide (minimum 8 chiffres)");

    if (!formData.sex || !["Masculin", "Féminin"].includes(formData.sex)) errors.push("Veuillez sélectionner votre sexe");

    const day = parseInt(formData.day), month = parseInt(formData.month), year = parseInt(formData.year);
    if (!day || day < 1 || day > 31) errors.push("Jour de naissance invalide");
    if (!month || month < 1 || month > 12) errors.push("Mois de naissance invalide");
    if (!year || year < 1940 || year > new Date().getFullYear() - 16) errors.push("Année de naissance invalide (vous devez avoir au moins 16 ans)");

    if (!formData.motivation || formData.motivation.trim().length < 50) errors.push("La lettre de motivation doit contenir au moins 50 caractères");

    if (!formData.cvFile) {
      errors.push("Veuillez joindre votre CV");
    } else {
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(formData.cvFile.type)) errors.push("Le CV doit être au format PDF ou Word");
      if (formData.cvFile.size > 5 * 1024 * 1024) errors.push("Le CV ne doit pas dépasser 5 MB");
    }

    return { valid: errors.length === 0, errors };
  }
}

export default new JobApplicationsService();