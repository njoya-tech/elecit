// src/services/projects.service.js
import { directus } from './api/directus';
import { readItems } from '@directus/sdk';

/**
 * Service de gestion des projets
 * Gère la récupération multilingue des projets et catégories
 */
const ProjectsService = {
  
  /**
   * Récupérer toutes les catégories traduites
   * @param {string} language - Langue (fr, en, de)
   * @returns {Promise<Array>}
   */
  async getCategories(language = 'fr') {
    try {
      const categories = await directus.request(
        readItems('project_categories', {
          filter: {
            status: { _eq: 'published' }
          },
          fields: [
            'id',
            'sort',
            'translations.*'
          ],
          sort: ['sort']
        })
      );

      // Vérifier que les catégories existent
      if (!categories || categories.length === 0) {
        console.warn('Aucune catégorie trouvée dans Directus');
        return [];
      }

      // Mapper pour extraire uniquement la traduction correspondante
      return categories.map(cat => {
        // Vérifier que translations existe et est un tableau
        const translations = Array.isArray(cat.translations) ? cat.translations : [];
        const translation = translations.find(t => t.language === language);
        const fallback = translations.find(t => t.language === 'fr');
        
        return {
          id: cat.id,
          label: translation?.label || fallback?.label || 'Sans catégorie',
          sort: cat.sort
        };
      });

    } catch (error) {
      console.error('Erreur récupération catégories:', error);
      console.error('Détails:', error.message);
      return [];
    }
  },

  /**
   * Récupérer tous les projets avec traductions et images
   * @param {string} language - Langue (fr, en, de)
   * @param {string|null} categoryId - Filtrer par catégorie (optionnel)
   * @returns {Promise<Array>}
   */
  async getProjects(language = 'fr', categoryId = null) {
    try {
      const filter = {
        status: { _eq: 'published' }
      };

      // Ajouter filtre catégorie si spécifié (et différent de 'all')
      if (categoryId && categoryId !== 'all') {
        filter.category_id = { _eq: categoryId };
      }

      const projects = await directus.request(
        readItems('projects', {
          filter,
          fields: [
            'id',
            'number',
            'date_realisation',
            'status_project',
            'sort',
            'category_id.id',
            'category_id.translations.*',
            'translations.*',
            'images.*'
          ],
          sort: ['sort']
        })
      );

      // Vérifier que les projets existent
      if (!projects || projects.length === 0) {
        console.warn('Aucun projet trouvé dans Directus');
        return [];
      }

      // Mapper les données pour le frontend
      return projects.map(project => {
        const translations = Array.isArray(project.translations) ? project.translations : [];
        const translation = translations.find(t => t.language === language);
        const fallback = translations.find(t => t.language === 'fr');
        
        // Gérer la catégorie
        const categoryTranslations = Array.isArray(project.category_id?.translations) 
          ? project.category_id.translations 
          : [];
        const categoryTranslation = categoryTranslations.find(t => t.language === language);
        const categoryFallback = categoryTranslations.find(t => t.language === 'fr');
        
        // Trier les images : principale en premier
        const images = Array.isArray(project.images) ? project.images : [];
        const sortedImages = images.sort((a, b) => {
          if (a.is_main) return -1;
          if (b.is_main) return 1;
          return (a.sort || 0) - (b.sort || 0);
        });

        return {
          id: project.id,
          number: project.number,
          title: translation?.title || fallback?.title || 'Sans titre',
          shortDescription: translation?.short_description || fallback?.short_description || '',
          description: translation?.description || fallback?.description || '',
          utilite: translation?.utility || fallback?.utility || '',
          retourClient: translation?.client_feedback || fallback?.client_feedback || '',
          responsable: translation?.responsible || fallback?.responsible || '',
          dateRealisation: this.formatDate(project.date_realisation, language),
          statut: project.status_project || 'En cours',
          category: categoryTranslation?.label || categoryFallback?.label || 'Sans catégorie',
          categoryId: project.category_id?.id,
          images: sortedImages.map(img => ({
            id: img.id,
            url: `${import.meta.env.VITE_DIRECTUS_URL}/assets/${img.image}`,
            isMain: img.is_main
          }))
        };
      });

    } catch (error) {
      console.error('Erreur récupération projets:', error);
      console.error('Détails:', error.message);
      return [];
    }
  },

  /**
   * Récupérer un projet spécifique
   * @param {string} projectId - ID du projet
   * @param {string} language - Langue
   * @returns {Promise<Object|null>}
   */
  async getProjectById(projectId, language = 'fr') {
    try {
      const projects = await this.getProjects(language);
      return projects.find(p => p.id === projectId) || null;
    } catch (error) {
      console.error('Erreur récupération projet:', error);
      return null;
    }
  },

  /**
   * Formater une date selon la langue
   * @param {string} date - Date ISO
   * @param {string} language - Langue
   * @returns {string}
   */
  formatDate(date, language) {
    if (!date) return '';
    
    const locales = {
      fr: 'fr-FR',
      en: 'en-US',
      de: 'de-DE'
    };

    return new Date(date).toLocaleDateString(locales[language] || 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Statistiques (pour backoffice)
   * @returns {Promise<Object>}
   */
  async getStats() {
    try {
      const projects = await directus.request(
        readItems('projects', {
          aggregate: {
            count: '*'
          },
          groupBy: ['status', 'category_id']
        })
      );

      return {
        success: true,
        data: projects
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur récupération stats'
      };
    }
  }
};

export default ProjectsService;