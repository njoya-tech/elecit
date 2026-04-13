// src/services/cv-upload.js
import { directus } from "./api/directus";
import { uploadFiles } from "@directus/sdk";

/**
 * Upload un fichier CV dans le dossier dédié sur Directus
 * Le dossier est configuré via VITE_DIRECTUS_CV_FOLDER_ID dans .env
 * @param {File} file - Fichier CV
 * @returns {Promise<string|null>} ID du fichier uploadé, ou null en cas d'erreur
 */
export async function uploadCV(file) {
  try {
    console.log('📤 Upload CV:', file.name);

    const formData = new FormData();
    formData.append("file", file);

    // Dossier cible — défini une seule fois dans .env
    const folderId = import.meta.env.VITE_DIRECTUS_CV_FOLDER_ID;
    if (folderId) {
      formData.append("folder", folderId);
    } else {
      console.warn('⚠️ VITE_DIRECTUS_CV_FOLDER_ID non défini, upload dans le dossier racine');
    }

    const result = await directus.request(uploadFiles(formData));

    console.log('✅ CV uploadé, ID:', result.id);
    return result.id;

  } catch (error) {
    console.error('❌ Erreur uploadCV:', error);
    return null;
  }
}