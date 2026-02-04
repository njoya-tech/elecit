// src/services/projects.js
import { directus } from "../api/directus";
// eslint-disable-next-line no-unused-vars
import { readItems, readItem, updateItem } from "@directus/sdk";

/**
 * Get asset URL from Directus file ID
 */
export const getAssetUrl = (fileId) => {
  if (!fileId) return null;
  return `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}`;
};

/**
 * Common fields for IT project queries
 * Adjust these based on your Directus schema
 */
const PROJECT_FIELDS = [
  "id",
  "slug",
  "cover_image",
  "created_at",
  "date",
  "status",
  "category",
  // Translation fields with expanded language relation
  "translations.id",
  "translations.it_project_id",
  "translations.title",
  "translations.excerpt",
  "translations.description",
  "translations.utility",
  "translations.client_feedback",
  "translations.client_role",
  "translations.languages_id.id",
  "translations.languages_id.code",
  "translations.languages_id.name",
];

/**
 * Fetch all IT projects
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of projects to fetch (default: 100)
 * @param {number} options.offset - Pagination offset (default: 0)
 * @param {string} options.sort - Sort field (default: '-created_at')
 * @returns {Promise<Array>} Array of IT projects
 */
export const fetchAllProjects = async (options = {}) => {
  const {
    limit = 100,
    offset = 0,
    sort = "-created_at",
  } = options;

  try {
    const projects = await directus.request(
      readItems("it_projects", {
        fields: PROJECT_FIELDS,
        sort: [sort],
        limit,
        offset,
      })
    );

    return projects;
  } catch (error) {
    console.error("Error fetching IT projects:", error);
    throw error;
  }
};

/**
 * Fetch single IT project by ID
 * @param {string|number} projectId - Project ID
 * @returns {Promise<Object>} IT project object
 */
export const fetchProjectById = async (projectId) => {
  try {
    const project = await directus.request(
      readItem("it_projects", projectId, {
        fields: PROJECT_FIELDS,
      })
    );

    return project;
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw error;
  }
};

/**
 * Fetch single IT project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} IT project object or null
 */
export const fetchProjectBySlug = async (slug) => {
  try {
    const projects = await directus.request(
      readItems("it_projects", {
        fields: PROJECT_FIELDS,
        filter: {
          slug: { _eq: slug },
        },
        limit: 1,
      })
    );

    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw error;
  }
};

/**
 * Get translated content for a project
 * @param {Object} project - IT project object with translations
 * @param {string} languageCode - Language code (e.g., 'en', 'fr', 'de')
 * @returns {Object} Project with translated content or original if translation not found
 */
export const getTranslation = (project, languageCode) => {
  if (!project || !project.translations || project.translations.length === 0) {
    return project;
  }

  const translations = Array.isArray(project.translations)
    ? project.translations
    : [project.translations];

  console.log(`Looking for project translation with code: "${languageCode}"`);
  console.log("Available project translations:", translations);

  // Find translation matching the requested language
  const translation = translations.find((t) => {
    const langCode = t.languages_id?.code;
    console.log(`Comparing: "${langCode}" === "${languageCode}"`, langCode === languageCode);
    return langCode === languageCode;
  });

  if (!translation) {
    console.log(`No project translation found for "${languageCode}"`);
    // Return first translation as fallback, or the project as-is
    return translations.length > 0 
      ? { 
          ...project, 
          title: translations[0].title, 
          excerpt: translations[0].excerpt, 
          description: translations[0].description,
          utility: translations[0].utility,
          client_feedback: translations[0].client_feedback,
          client_role: translations[0].client_role,
        }
      : project;
  }

  console.log(`✅ Found project translation:`, translation);

  // Return the project with translated content
  return {
    ...project,
    title: translation.title,
    excerpt: translation.excerpt,
    description: translation.description,
    utility: translation.utility,
    client_feedback: translation.client_feedback,
    client_role: translation.client_role,
  };
};