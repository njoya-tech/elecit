import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fond_sombre from '../../assets/fond_sombre.png';
import projet1 from '../../assets/projet1.JPG'
import design_x from '../../assets/design_x.png';
import vid from '../../assets/vid.png';
import fleche from '../../assets/fleche.png';

import { MY_COLORS } from '../../utils/colors';




const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
 
  // Simulated translations
  const t = (key) => {
    const translations = {
      'projets.title': 'NOS RÉALISATIONS',
      'projets.subtitle': 'Découvrez quelques-uns des projets que nous avons conçus et réalisés pour nos clients.',
      'projets.buttonText': 'Livre blanc'
    };
    return translations[key] || key;
  };

  return (
    <div className="relative w-[1800px] translate-x-15 h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Image de fond */}
      
       <div className='flex items-center justify-center '>
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundImage: `url(${projet1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
     
      </div>
    

      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div 
        className="absolute inset-0 w-full h-full bg-black"
        style={{ opacity: 0.6 }}
      />
     
      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:left-14 sm:px-6 lg:px-8 h-full flex items-center pt-8 md:pt-0">
        <div className="w-full">
          {/* Titre */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t('projets.title')}
            </h1>
          </div>
         
          {/* Sous-titre */}
          <div className='mt-8 mb-12'>
            <p className="text-white text-center text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
              {t('projets.subtitle')}
            </p>
          </div>
         
          {/* Boutons d'action */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Bouton Livre blanc */}
            <div className="flex items-center gap-3">
              <button 
                className="px-8 py-3 sm:px-12 sm:py-4 border-2 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300"
                style={{
                  borderColor: MY_COLORS.secondaryGreen,
                  color: MY_COLORS.secondaryGreen
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
                {t('projets.buttonText')}
              </button>
              
             
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;