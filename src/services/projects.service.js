// src/services/projects.service.js
import { directus } from './api/directus';
import { readItems } from '@directus/sdk';

/**
 * Mapping des codes de langue vers les IDs Directus
 * IMPORTANT : Vérifiez dans votre table 'languages' pour confirmer ces IDs
 */
const LANGUAGE_MAP = {
  'en': 1,
  'fr': 2,
  'de': 3
};

class ProjectsService {
  
  /**
   * Récupère toutes les catégories avec traductions
   */
  async getCategories(locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const categories = await directus.request(
        readItems('project_categories', {
          filter: {
            status: { _eq: 'published' }
          },
          fields: ['*', 'translations.*'],
          sort: ['sort']
        })
      );

      console.log('📦 Categories from Directus:', categories);

      // Filtrer les traductions par langue côté client
      return categories.map(category => {
        const translation = category.translations?.find(
          t => t.languages_id === languageId
        );

        return {
          id: category.id,
          label: translation?.name || 'Sans nom',
          slug: translation?.slug || ''
        };
      });

    } catch (error) {
      console.error('❌ Erreur getCategories:', error);
      return [];
    }
  }

  /**
   * Récupère tous les projets avec traductions et images
   */
  async getProjects(locale = 'fr', categoryId = null) {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const filter = {
        status: { _eq: 'published' }
      };

      if (categoryId && categoryId !== 'all') {
        filter.category = { _eq: categoryId };
      }

      const projects = await directus.request(
        readItems('projects', {
          filter,
   fields: [
        '*',
        'category.*',
        'category.translations.*',
        'translations.*',
       'images.*',                    // ← images (pas project_images)
  'images.directus_files_id.*'   // ← Votre champ ✓
      ],

          sort: ['-realization_date', 'sort']
        })
      );

      console.log('📦 Projects from Directus:', projects);

      return projects.map((project, index) => 
        this._formatProject(project, index + 1, languageId)
      );

    } catch (error) {
      console.error('❌ Erreur getProjects:', error);
      return [];
    }
  }

  /**
   * Récupère un projet spécifique par son slug
   */
  async getProjectBySlug(slug, locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const projects = await directus.request(
        readItems('projects', {
          filter: {
            status: { _eq: 'published' }
          },
    fields: [
        '*',
        'category.*',
        'category.translations.*',
        'translations.*',
        'images.*',                    // ← images (pas project_images)
  'images.directus_files_id.*'   // ← Votre champ ✓
      ],

          limit: 1000 // Charger tous pour filtrer par slug côté client
        })
      );
console.log('📦 Projects RAW:', projects[0]);     // ← images brut
console.log('🎨 Projects FORMATÉES:', formatted);
      // Filtrer par slug côté client
      const project = projects.find(p => {
        const translation = p.translations?.find(t => t.languages_id === languageId);
        return translation?.slug === slug;
      });

      if (!project) return null;

      return this._formatProject(project, 1, languageId);
    } catch (error) {
      console.error('❌ Erreur getProjectBySlug:', error);
      return null;
    }
  }

  /**
   * Formate un projet pour l'UI
   * @private
   */
_formatProject(project, number, languageId) {
  const translation = project.translations?.find(t => t.languages_id === languageId) || {};
  const categoryTranslation = project.category?.translations?.find(t => t.languages_id === languageId) || {};

  // 🔧 CORRECTION IMAGES - REMPLACEZ CE BLOC COMPLET
  const sortedImages = (project.images || [])
    .map(img => {
      const fileId = img.directus_files_id?.id || img.directus_files_id;
      return {
        id: img.id,
        fileId: fileId,
        isFeatured: img.is_featured || false,
        url: fileId ? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}` : null
      };
    })
    .filter(img => img.url);  // Garde seulement les images avec URL

  const featuredImage = sortedImages.find(img => img.isFeatured) || sortedImages[0];

  const statusMap = {
    'completed': 'Terminé',
    'in_progress': 'En cours',
    'planned': 'Planifié'
  };

  return {
    id: project.id,
    number: number,
    title: translation.title || 'Sans titre',
    slug: translation.slug || '',
    shortDescription: this._truncateText(translation.description, 150),
    description: translation.description || '',
    utilite: translation.utility || '',
    retourClient: translation.client_feedback || '',
    responsable: project.responsible_name || '',
    dateRealisation: this._formatDate(project.realization_date),
    statut: statusMap[project.project_status] || project.project_status,
    categoryId: project.category?.id || null,
    categoryName: categoryTranslation.name || '',
    mainImage: featuredImage?.url || null,      // ✅ "http://192.168.50.46:8055/assets/6d6548db..."
    gallery: sortedImages.map(img => img.url)    // ✅ ["http://192.168.50.46:8055/assets/6d6548db..."]
  };
}


  /**
   * Génère l'URL d'une image Directus
   * @private
   */
  _getImageUrl(fileId, transforms = {}) {
    if (!fileId) return null;

    const baseUrl = `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}`;
    
    const params = new URLSearchParams();
    if (transforms.width) params.append('width', transforms.width);
    if (transforms.height) params.append('height', transforms.height);
    if (transforms.quality) params.append('quality', transforms.quality || 80);
    if (transforms.fit) params.append('fit', transforms.fit || 'cover');
    if (transforms.format) params.append('format', transforms.format || 'webp');

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * Tronque un texte
   * @private
   */
  _truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  /**
   * Formate une date
   * @private
   */
  _formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}

export default new ProjectsService();

