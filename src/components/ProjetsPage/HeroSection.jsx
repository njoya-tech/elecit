import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projet1 from '../../assets/projet1.JPG';
import { MY_COLORS } from '../../utils/colors';

const HeroSection = () => {
  const { t } = useTranslation(); 
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden" 
      style={{ backgroundColor: MY_COLORS.white }}
    >
      {/* Image de fond */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundImage: `url(${projet1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div 
        className="absolute inset-0 w-full h-full bg-black"
        style={{ opacity: 0.6 }}
      />
     
      {/* Contenu principal */}
      <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Titre */}
          <div className="mb-4 sm:mb-6">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t('projet.title')}
            </h1>
          </div>
         
          {/* Sous-titre */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
              {t('projet.subtitle')}
            </p>
          </div>
         
          {/* Boutons d'action */}
          <div className="flex items-center justify-center">
            <button 
              className="px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 lg:px-12 lg:py-4 border-2 text-sm sm:text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: MY_COLORS.secondaryGreen,
                color: MY_COLORS.secondaryGreen,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
                e.currentTarget.style.color = MY_COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = MY_COLORS.secondaryGreen;
              }}
            >
              {t('projet.buttonText')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;