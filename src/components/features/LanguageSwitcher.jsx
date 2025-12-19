import React from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
// CORRECTION: Utiliser ../../assets/ au lieu de ../assets/
import en from '../../assets/en.png';
import enn from '../../assets/enn.png'
import fr from '../../assets/fr.png';
import all from '../../assets/all.png';

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
    { code: 'fr', label: 'Français', flag: fr },
    { code: 'en', label: 'English', flag: enn },
    { code: 'de', label: 'Deutsch', flag: all }
  ];

  return (
    <div 
      className="w-full flex items-center lg:justify-end justify-center md:justify-end  pr-20 h-20" 
      style={{ backgroundColor: MY_COLORS.black }}
    >
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
                : ' text-white hover:bg-slate-400'
              }
            `}
            title={lang.label}
          >
            <img 
              src={lang.flag} 
              alt={lang.label} 
              className="w-6 h-6 rounded-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;