// src/services/projects.service.js
import { directus } from './api/directus';

const LANGUAGE_MAP = {
  'en': 1,
  'fr': 2,
  'de': 3
};

class ProjectsService {
  
  async getCategories(locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/project_categories?filter[status][_eq]=published&fields=*,translations.*&sort=sort`;
      const response = await fetch(url);
      const result = await response.json();
      const categories = result.data || [];

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

  async getProjects(locale = 'fr', categoryId = null) {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      // Filtres
      let filterQuery = 'filter[status][_eq]=published';
      if (categoryId && categoryId !== 'all') {
        filterQuery += `&filter[category_id][_eq]=${categoryId}`;
      }

      // 🎯 CORRECTION FINALE : Le champ s'appelle "images" mais pointe vers "projects_files"
      // On doit donc demander : images.directus_files_id.*
      const fieldsQuery = 'fields=*,translations.*,images.id,images.directus_files_id.*';
      const sortQuery = 'sort[]=-realization_date&sort[]=sort';

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/projects?${filterQuery}&${fieldsQuery}&${sortQuery}`;
      
      console.log('🌐 URL:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ Réponse HTTP:', response.status, response.statusText);
        return [];
      }

      const result = await response.json();
      const projects = result.data || [];

      console.log('📦 Projects bruts:', projects);
      if (projects.length > 0) {
        console.log('🖼️ Images du premier projet:', projects[0].images);
      }

      return projects.map((project, index) => 
        this._formatProject(project, index + 1, languageId)
      );

    } catch (error) {
      console.error('❌ Erreur getProjects:', error);
      return [];
    }
  }

  async getProjectBySlug(slug, locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/projects?filter[status][_eq]=published&fields=*,translations.*,images.id,images.directus_files_id.*`;
      
      const response = await fetch(url);
      const result = await response.json();
      const projects = result.data || [];

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

_formatProject(project, number, languageId) {
  const translation = project.translations?.find(t => t.languages_id === languageId) || {};

  console.log('🔍 Formatage projet:', project.id);
  console.log('🖼️ Images brutes:', project.images);

  // Traiter les images depuis le champ "images" (qui est lié à projects_files)
  const images = (project.images || [])
    .map(item => {
      const file = item.directus_files_id;
      const fileId = file?.id || file;

      if (!fileId) {
        console.warn('⚠️ Image sans fileId:', item);
        return null;
      }

      return {
        id: item.id,
        fileId: fileId,
        url: `${import.meta.env.VITE_DIRECTUS_URL}/assets/${fileId}`
      };
    })
    .filter(img => img !== null);

  console.log('✅ Images formatées:', images);

  const statusMap = {
    'completed': 'Terminé',
    'in_progress': 'En cours',
    'planned': 'Planifié'
  };

  const formatted = {
    id: project.id,
    number: number,
    title: translation.title || 'Sans titre',
    slug: translation.slug || '',
    shortDescription: this._truncateText(translation.description, 150),
    description: translation.description || '',
    utilite: translation.utility || '',
    retourClient: translation.client_feedback || '',
    responsable: translation.responsible_name || '',  // ✅ Maintenant depuis translation
    dateRealisation: this._formatDate(project.realization_date),
    statut: statusMap[project.project_status] || project.project_status,
    categoryId: project.category_id || null,
    categoryName: '',
    mainImage: images[0]?.url || null,
    gallery: images.map(img => img.url)
  };

  console.log('📦 Projet formaté:', {
    title: formatted.title,
    mainImage: formatted.mainImage,
    galleryCount: formatted.gallery.length,
    responsable: formatted.responsable  // ✅ Ajoutez ceci pour débugger
  });

  return formatted;
}

  _truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

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