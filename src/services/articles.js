import directus from './api/directus';
import { readItems, readItem } from '@directus/sdk';



export const getArticles = async (locale = 'fr') => {
  try {
    const articles = await directus.request(
      readItems('articles', {
        fields: [
          'id',
          'status',
          'date_created',
          'file',
          'translations.id',
          'translations.languages_code',
          'translations.title',
          'translations.description'
        ],
        filter: {
          status: { _eq: 'published' }
        }
      })
    );

    // Transformer chaque article pour n'avoir que la traduction active
    return articles.map(article => {
      const translation = article.translations?.find(
        t => t.languages_code === locale
      ) || article.translations?.[0]; // Fallback sur première traduction

      return {
        id: article.id,
        title: translation?.title || 'Sans titre',
        description: translation?.description || '',
        file: article.file ? `${process.env.REACT_APP_DIRECTUS_URL}/assets/${article.file}` : null,
        date_created: article.date_created,
        status: article.status
      };
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
};

/**
 * Récupère un article par son ID
 * @param {string|number} id - ID de l'article
 * @param {string} locale - Code langue
 * @returns {Promise<Object|null>}
 */
export const getArticleById = async (id, locale = 'fr') => {
  try {
    const article = await directus.request(
      readItems('articles', {
        fields: [
          'id',
          'status',
          'date_created',
          'file',
          'translations.id',
          'translations.languages_code',
          'translations.title',
          'translations.description'
        ],
        filter: {
          id: { _eq: id }
        }
      })
    );

    if (!article || article.length === 0) return null;

    const item = article[0];
    const translation = item.translations?.find(
      t => t.languages_code === locale
    ) || item.translations?.[0];

    return {
      id: item.id,
      title: translation?.title || 'Sans titre',
      description: translation?.description || '',
      file: item.file ? `${process.env.REACT_APP_DIRECTUS_URL}/assets/${item.file}` : null,
      date_created: item.date_created,
      status: item.status
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return null;
  }
};