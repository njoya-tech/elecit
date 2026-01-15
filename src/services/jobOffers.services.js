const LANGUAGE_MAP = {
  'en': 1,
  'fr': 2,
  'de': 3
};

class JobOffersService {
  
  async getJobOffers(locale = 'fr') {
    try {
      const languageId = LANGUAGE_MAP[locale] || LANGUAGE_MAP['fr'];

      const filterQuery = 'filter[status][_eq]=published&filter[is_active][_eq]=true';
      const fieldsQuery = 'fields=*,translations.*';
      const sortQuery = 'sort[]=-published_at&sort[]=-date_created';

      const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/job_offers?${filterQuery}&${fieldsQuery}&${sortQuery}`;
      
      console.log('🌐 Fetching Job Offers:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        return [];
      }

      const result = await response.json();
      const jobOffers = result.data || [];

      console.log('📦 Raw Job Offers:', jobOffers);

      return jobOffers.map(job => this._formatJobOffer(job, languageId));

    } catch (error) {
      console.error('❌ Error getJobOffers:', error);
      return [];
    }
  }

  _formatJobOffer(job, languageId) {
    const translation = job.translations?.find(
      t => t.languages_id === languageId
    ) || {};

    console.log('🔍 Formatting job:', job.id);

    // Mapper les types de job
    const jobTypeMap = {
      'full_time': 'Temps plein',
      'part_time': 'Temps partiel',
      'contract': 'CDD',
      'cdi': 'CDI',
      'freelance': 'Freelance',
      'internship': 'Stage',
      'temporary': 'Temporaire'
    };

    // Parser les activités
    const activities = this._parseActivities(translation.activities);

    return {
      id: job.id,
      
      // Pour JobOffersList
      title: translation.title || 'Sans titre',
      location: translation.location || '',
      publicationDate: this._formatDate(job.published_at || job.date_created),
      tags: this._parseTags(job.job_type),
      
      // Pour JobOfferModal
      subtitle: translation.title || '',
      type: jobTypeMap[job.job_type] || job.job_type || 'Non spécifié',
      validUntil: this._formatDate(job.expires_at),
      description: translation.description || '',
     responsibilities: translation.Responsabilities || translation.responsibilities || '',
      activities: activities,
      profile: translation.profile_required || '',
      
      // Métadonnées
      jobType: job.job_type,
      isActive: job.is_active,
      status: job.status
    };
  }

  _parseActivities(activitiesText) {
    if (!activitiesText) return [];

    // Si HTML avec <li>
    if (activitiesText.includes('<li>')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(activitiesText, 'text/html');
      const listItems = doc.querySelectorAll('li');
      return Array.from(listItems).map(li => li.textContent.trim());
    }

    // Si HTML avec <p>
    if (activitiesText.includes('<p>')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(activitiesText, 'text/html');
      const paragraphs = doc.querySelectorAll('p');
      return Array.from(paragraphs)
        .map(p => p.textContent.trim())
        .filter(text => text.length > 0);
    }

    // Si texte avec retours à la ligne
    if (activitiesText.includes('\n')) {
      return activitiesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    // Si une seule ligne
    return [activitiesText];
  }

  _parseTags(jobType) {
    if (!jobType) return [];
    
    const tagMap = {
      'full_time': ['Temps plein', 'CDI'],
      'part_time': ['Temps partiel'],
      'contract': ['CDD', 'Contrat'],
      'cdi': ['CDI'],
      'freelance': ['Freelance'],
      'internship': ['Stage'],
      'temporary': ['Temporaire']
    };

    return tagMap[jobType] || [jobType];
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

export default new JobOffersService();