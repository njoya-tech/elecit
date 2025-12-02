import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const languages = [
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'de', flag: '🇩🇪', label: 'Deutsch' }
  ];

  return (
    <div className="w-full bg-slate-900 flex items-center justify-end pr-20 h-20">
      <div className="flex items-center gap-4">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-all duration-200
              ${i18n.language === lang.code 
                ? 'bg-white text-slate-600 shadow-lg' 
                : 'bg-slate-500 text-white hover:bg-slate-400'
              }
            `}
            title={lang.label}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.code.toUpperCase()}</span>
            
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;