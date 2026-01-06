import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticles } from '../services/articles';
import LanguageSwitcher from './LanguageSwitcher';

const ArticlesList = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les articles
  const loadArticles = async (locale) => {
    setLoading(true);
    const data = await getArticles(locale);
    setArticles(data);
    setLoading(false);
  };

  // Charger au montage du composant
  useEffect(() => {
    loadArticles(i18n.language);
  }, []);

  // Fonction callback pour le changement de langue
  const handleLanguageChange = (newLang) => {
    loadArticles(newLang);
  };

  if (loading) {
    return <div>{t('articles.loading')}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Switcher de langue */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />

      {/* Paragraphe local (i18next) */}
      <p style={{ 
        fontSize: '18px', 
        marginBottom: '30px',
        color: '#555'
      }}>
        {t('intro.paragraph')}
      </p>

      {/* Titre de section (i18next) */}
      <h1 style={{ marginBottom: '30px' }}>
        {t('articles.title')}
      </h1>

      {/* Liste des articles (Directus) */}
      {articles.length === 0 ? (
        <p>{t('articles.noArticles')}</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {articles.map(article => (
            <article 
              key={article.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {article.file && (
                <img 
                  src={article.file}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '15px'
                  }}
                />
              )}
              
              <h2 style={{ 
                fontSize: '24px',
                marginBottom: '10px',
                color: '#333'
              }}>
                {article.title}
              </h2>
              
              <p style={{ 
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '15px'
              }}>
                {article.description}
              </p>
              
              {article.date_created && (
                <p style={{ 
                  fontSize: '14px',
                  color: '#999'
                }}>
                  {t('articles.publishedOn')} {new Date(article.date_created).toLocaleDateString(i18n.language)}
                </p>
              )}
              
              <button style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                {t('articles.readMore')}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;