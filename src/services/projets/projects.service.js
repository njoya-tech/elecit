// src/services/projects.service.js
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://192.168.50.46:8055';

const LANGUAGE_MAP = {
  'en': 1,
  'fr': 2,
  'de': 3
};

class ProjectsService {
  
  /**
   * Récupère toutes les catégories de projets
   */
  async getCategories(locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const url = `${DIRECTUS_URL}/items/project_categories?filter[status][_eq]=published&fields=*,translations.*&sort=sort`;
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

  /**
   * Récupère les projets expertise (sans description, process, etc.)
   * Pour le carousel d'expertise - uniquement cover_image et titre
   */
  async getExpertiseProjects(locale = 'fr', categoryId) {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];
      console.log('🔍 [getExpertiseProjects] Langue:', locale, '→ ID:', languageId);
      console.log('🔍 [getExpertiseProjects] Catégorie:', categoryId);

      // Filtres: projets publiés de la catégorie donnée
      // ET qui n'ont PAS de description_projet, process_title, process_utility
      let filterQuery = `filter[status][_eq]=published&filter[category_id][_eq]=${categoryId}`;
      
      // Champs minimaux pour l'expertise carousel
      const fieldsQuery = 'fields=id,date_realization,category_id,translations.title,translations.slug,translations.languages_id,translations.description_projet,translations.process_title,translations.process_utility,cover_image.directus_files_id.*';
      const sortQuery = 'sort[]=-date_realization&sort[]=sort';

      const url = `${DIRECTUS_URL}/items/projets?${filterQuery}&${fieldsQuery}&${sortQuery}`;
      console.log('🌐 [getExpertiseProjects] URL:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ [getExpertiseProjects] Réponse HTTP:', response.status, response.statusText);
        return [];
      }

      const result = await response.json();
      const projects = result.data || [];

      console.log('📦 [getExpertiseProjects] Projets bruts reçus:', projects.length);

      // Filtrer côté client les projets qui n'ont PAS de description, process_title, process_utility
      const expertiseProjects = projects.filter(project => {
        const translation = project.translations?.find(t => t.languages_id === languageId);
        
        const hasNoDescription = !translation?.description_projet || translation.description_projet.trim() === '';
        const hasNoProcessTitle = !translation?.process_title || translation.process_title.trim() === '';
        const hasNoProcessUtility = !translation?.process_utility || translation.process_utility.trim() === '';
        
        return hasNoDescription && hasNoProcessTitle && hasNoProcessUtility;
      });

      console.log('✅ [getExpertiseProjects] Projets expertise filtrés:', expertiseProjects.length);

      // Formater uniquement avec cover_image et titre
      return expertiseProjects.map((project, index) => {
        const translation = project.translations?.find(t => t.languages_id === languageId) || {};
        
        // Cover image
        let coverImageUrl = null;
        if (project.cover_image && project.cover_image.length > 0) {
          const coverFile = project.cover_image[0]?.directus_files_id;
          const fileId = coverFile?.id || coverFile;
          
          if (fileId) {
            coverImageUrl = `${DIRECTUS_URL}/assets/${fileId}`;
          }
        }

        return {
          id: project.id,
          title: translation.title || 'Sans titre',
          slug: translation.slug || '',
          coverImage: coverImageUrl,
          categoryId: project.category_id
        };
      });

    } catch (error) {
      console.error('❌ [getExpertiseProjects] Erreur:', error);
      return [];
    }
  }

  /**
   * Récupère tous les projets ou filtrés par catégorie
   * FILTRE: Uniquement les projets avec description_projet non vide
   */
  async getProjects(locale = 'fr', categoryId = null) {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];
      console.log('🔍 [getProjects] Langue:', locale, '→ ID:', languageId);
      console.log('🔍 [getProjects] Catégorie filtre:', categoryId);

      // Construction des filtres
      let filterQuery = 'filter[status][_eq]=published';
      if (categoryId && categoryId !== 'all') {
        filterQuery += `&filter[category_id][_eq]=${categoryId}`;
      }

      // Champs à récupérer - STRUCTURE AVEC RELATIONS
      const fieldsQuery = 'fields=*,translations.*,cover_image.directus_files_id.*,images_caroussel.directus_files_id.*,video.directus_files_id.*';
      const sortQuery = 'sort[]=-date_realization&sort[]=sort';

      const url = `${DIRECTUS_URL}/items/projets?${filterQuery}&${fieldsQuery}&${sortQuery}`;
      console.log('🌐 [getProjects] URL:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ [getProjects] Réponse HTTP:', response.status, response.statusText);
        return [];
      }

      const result = await response.json();
      const projects = result.data || [];

      console.log('📦 [getProjects] Projets bruts reçus:', projects.length);
      
      // 🔥 FILTRAGE: Garder uniquement les projets avec description_projet non vide
      const projectsWithDescription = projects.filter(project => {
        const translation = project.translations?.find(t => t.languages_id === languageId);
        const hasDescription = translation?.description_projet && translation.description_projet.trim() !== '';
        
        if (!hasDescription) {
          console.log(`⏭️ [getProjects] Projet ${project.id} ignoré (pas de description)`);
        }
        
        return hasDescription;
      });

      console.log('✅ [getProjects] Projets avec description:', projectsWithDescription.length);
      
      if (projectsWithDescription.length > 0) {
        console.log('🔍 [getProjects] Premier projet brut:', {
          id: projectsWithDescription[0].id,
          cover_image: projectsWithDescription[0].cover_image,
          images_caroussel: projectsWithDescription[0].images_caroussel,
          video: projectsWithDescription[0].video,
          translations: projectsWithDescription[0].translations?.length
        });
      }

      return projectsWithDescription.map((project, index) => 
        this._formatProject(project, index + 1, languageId)
      );

    } catch (error) {
      console.error('❌ [getProjects] Erreur:', error);
      return [];
    }
  }

  /**
   * Récupère le premier projet publié (pour MobileBankProject)
   * FILTRE: Uniquement les projets avec description_projet non vide
   */
  async getProjectBySlug(locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];
      console.log('🔍 [getProjectBySlug] Langue:', locale, '→ ID:', languageId);

      // Filtres
      const filterQuery = 'filter[status][_eq]=published';
      
      // Champs à récupérer - STRUCTURE AVEC RELATIONS
      const fieldsQuery = 'fields=*,translations.*,cover_image.directus_files_id.*,images_caroussel.id,images_caroussel.directus_files_id.*,video.id,video.directus_files_id.*';
      const sortQuery = 'sort[]=-date_realization&sort[]=sort';

      const url = `${DIRECTUS_URL}/items/projets?${filterQuery}&${fieldsQuery}&${sortQuery}`;
      
      console.log('🌐 [getProjectBySlug] URL:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ [getProjectBySlug] Réponse HTTP:', response.status, response.statusText);
        return null;
      }

      const result = await response.json();
      const projects = result.data || [];

      console.log('📦 [getProjectBySlug] Projets bruts reçus:', projects.length);

      if (projects.length === 0) {
        console.warn('⚠️ [getProjectBySlug] Aucun projet publié trouvé');
        return null;
      }

      // 🔥 FILTRAGE: Garder uniquement les projets avec description_projet non vide
      const projectsWithDescription = projects.filter(project => {
        const translation = project.translations?.find(t => t.languages_id === languageId);
        const hasDescription = translation?.description_projet && translation.description_projet.trim() !== '';
        
        if (!hasDescription) {
          console.log(`⏭️ [getProjectBySlug] Projet ${project.id} ignoré (pas de description)`);
        }
        
        return hasDescription;
      });

      console.log('✅ [getProjectBySlug] Projets avec description:', projectsWithDescription.length);

      if (projectsWithDescription.length === 0) {
        console.warn('⚠️ [getProjectBySlug] Aucun projet avec description trouvé');
        return null;
      }

      // Récupère le premier projet avec description
      const project = projectsWithDescription[0];
      
      console.log('✅ [getProjectBySlug] Premier projet:', {
        id: project.id,
        cover_image: project.cover_image,
        images_caroussel: project.images_caroussel?.length,
        video: project.video?.length,
        translations: project.translations?.length
      });

      return this._formatProject(project, 1, languageId);
      
    } catch (error) {
      console.error('❌ [getProjectBySlug] Erreur:', error);
      return null;
    }
  }

  /**
   * Formate un projet pour l'affichage
   */
  _formatProject(project, number, languageId) {
    console.log('🎨 [_formatProject] Formatage projet ID:', project.id);

    const translation = project.translations?.find(t => t.languages_id === languageId) || {};
    
    console.log('📝 [_formatProject] Traduction trouvée:', {
      title: translation.title,
      status: translation.status_projets,
      hasDescription: !!translation.description_projet
    });

    // 🖼️ COVER IMAGE (image principale) - STRUCTURE CORRIGÉE
    let coverImageUrl = null;
    if (project.cover_image && project.cover_image.length > 0) {
      const coverFile = project.cover_image[0]?.directus_files_id;
      const fileId = coverFile?.id || coverFile;

      if (fileId) {
        coverImageUrl = `${DIRECTUS_URL}/assets/${fileId}`;
        console.log('🖼️ [_formatProject] Cover image:', coverImageUrl);
      } else {
        console.warn('⚠️ [_formatProject] Cover image sans fileId pour projet', project.id);
      }
    } else {
      console.warn('⚠️ [_formatProject] Pas de cover_image pour projet', project.id);
    }

    // 🎠 CAROUSEL IMAGES
    const carouselImages = (project.images_caroussel || [])
      .map((item, idx) => {
        const file = item.directus_files_id;
        const fileId = file?.id || file;

        if (!fileId) {
          console.warn(`⚠️ [_formatProject] Carousel image ${idx} sans fileId:`, item);
          return null;
        }

        const url = `${DIRECTUS_URL}/assets/${fileId}`;
        console.log(`🎠 [_formatProject] Carousel image ${idx}:`, url);
        
        return {
          id: item.id,
          fileId: fileId,
          url: url
        };
      })
      .filter(img => img !== null);

    console.log('✅ [_formatProject] Carousel images:', carouselImages.length);

    // 🎥 VIDEO
    let videoUrl = null;
    if (project.video && project.video.length > 0) {
      const videoFile = project.video[0]?.directus_files_id;
      const videoFileId = videoFile?.id || videoFile;
      
      if (videoFileId) {
        videoUrl = `${DIRECTUS_URL}/assets/${videoFileId}`;
        console.log('🎥 [_formatProject] Vidéo:', videoUrl);
      } else {
        console.warn('⚠️ [_formatProject] Vidéo sans fileId');
      }
    }

    // 📊 STATUS MAP
    const statusMap = {
      'completed': 'Terminé',
      'in_progress': 'En cours',
      'planned': 'Planifié'
    };

    const formatted = {
      id: project.id,
      number: number,
      
      // Données de traduction
      title: translation.title || 'Sans titre',
      slug: translation.slug || '',
      status: statusMap[translation.status_projets] || translation.status_projets || 'N/A',
      descriptionProjet: translation.description_projet || '',
      processTitle: translation.process_title || '',
      processUtility: translation.process_utility || '',
      valueDescription: translation.value_description || '',
      clientFeedback: translation.client_feedback || '',
      expertiseText: translation.expertise_text || '',
      
      // Données non traduites
      dateRealisation: this._formatDate(project.date_realization),
      nameClientFeedback: project.name_client_feedback || '',
      categoryId: project.category_id || null,
      
      // Médias
      coverImage: coverImageUrl,
      carouselImages: carouselImages.map(img => img.url),
      videoUrl: videoUrl,
      
      // Compatibilité avec l'ancien format (pour ProjectCard)
      mainImage: coverImageUrl,
      gallery: carouselImages.map(img => img.url),
      shortDescription: this._truncateText(translation.description_projet, 150),
      description: translation.description_projet || '',
      responsable: project.name_client_feedback || '',
      statut: statusMap[translation.status_projets] || translation.status_projets || 'N/A'
    };

    console.log('📦 [_formatProject] Projet formaté:', {
      id: formatted.id,
      title: formatted.title,
      coverImage: !!formatted.coverImage,
      carouselCount: formatted.carouselImages.length,
      hasVideo: !!formatted.videoUrl,
      responsable: formatted.responsable
    });

    return formatted;
  }

  /**
   * Tronque un texte HTML à une longueur maximale
   */
  _truncateText(text, maxLength) {
    if (!text) return '';
    
    // Retire les balises HTML
    const plainText = text.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  }

  /**
   * Formate une date en français
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