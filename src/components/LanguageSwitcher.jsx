import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const { i18n, t } = useTranslation();

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const languages = [
    { code: 'fr', label: t('language.french') },
    { code: 'en', label: t('language.english') },
    { code: 'de', label: t('language.german') }
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          style={{
            padding: '8px 16px',
            margin: '0 5px',
            backgroundColor: i18n.language === lang.code ? '#007bff' : '#f0f0f0',
            color: i18n.language === lang.code ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
