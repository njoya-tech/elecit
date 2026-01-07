// src/services/newsletter.service.js
import { directus } from './api/directus';
import { createItem, readItems } from '@directus/sdk';

/**
 * Service de gestion de la newsletter
 * Gère les inscriptions multilingues (fr, en, de)
 */
const NewsletterService = {
  
  /**
   * Inscription à la newsletter
   * @param {string} email - Email de l'abonné
   * @param {string} language - Langue (fr, en, de)
   * @returns {Promise} Résultat de l'inscription
   */
  async subscribe(email, language = 'fr') {
    try {
      // Validation basique
      if (!email || !this.isValidEmail(email)) {
        throw new Error('Email invalide');
      }

      if (!['fr', 'en', 'de'].includes(language)) {
        throw new Error('Langue non supportée');
      }

      // Vérifier si l'email existe déjà
      const existing = await this.checkExisting(email);
      
      if (existing) {
        // Réactiver si inactif
        if (existing.status === 'inactive') {
          return await this.reactivate(existing.id);
        }
        throw new Error('Cet email est déjà inscrit');
      }

      // Créer l'inscription
      const result = await directus.request(
        createItem('newsletter_subscriptions', {
          email: email.toLowerCase().trim(),
          language,
          status: 'active',
          created_at: new Date().toISOString()
        })
      );

      return {
        success: true,
        message: 'Inscription réussie',
        data: result
      };

    } catch (error) {
      console.error('Erreur inscription newsletter:', error);
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'inscription'
      };
    }
  },

  /**
   * Vérifier si un email existe déjà
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  async checkExisting(email) {
    try {
      const results = await directus.request(
        readItems('newsletter_subscriptions', {
          filter: {
            email: {
              _eq: email.toLowerCase().trim()
            }
          },
          limit: 1
        })
      );

      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Erreur vérification email:', error);
      return null;
    }
  },

  /**
   * Réactiver un abonnement
   * @param {string} id - ID de l'abonnement
   * @returns {Promise}
   */
  async reactivate(id) {
    try {
      await directus.request(
        updateItem('newsletter_subscriptions', id, {
          status: 'active'
        })
      );

      return {
        success: true,
        message: 'Abonnement réactivé'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la réactivation'
      };
    }
  },

  /**
   * Se désabonner
   * @param {string} email
   * @returns {Promise}
   */
  async unsubscribe(email) {
    try {
      const existing = await this.checkExisting(email);
      
      if (!existing) {
        throw new Error('Email non trouvé');
      }

      await directus.request(
        updateItem('newsletter_subscriptions', existing.id, {
          status: 'inactive'
        })
      );

      return {
        success: true,
        message: 'Désinscription réussie'
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la désinscription'
      };
    }
  },

  /**
   * Validation email simple
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Statistiques (pour backoffice)
   * @returns {Promise<Object>}
   */
  async getStats() {
    try {
      const all = await directus.request(
        readItems('newsletter_subscriptions', {
          aggregate: {
            count: '*'
          },
          groupBy: ['language', 'status']
        })
      );

      return {
        success: true,
        data: all
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur récupération stats'
      };
    }
  }
};

export default NewsletterService;