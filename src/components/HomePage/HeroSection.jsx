import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fond_sombre from '../../assets/fond_sombre.png';
import design_x from '../../assets/design_x.png';
import vid from '../../assets/vid.png';
import fleche from '../../assets/fleche.png';

import { MY_COLORS } from '../../utils/colors';

const HeroSection = ({ slides }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[650px] overflow-hidden">
        
      {/* Container principal avec padding unifié */}
      <div className="absolute inset-0 px-4 sm:px-8 md:px-16 lg:px-24">
        
        {/* Images de fond avec slides */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>

        {/* Overlay fond_sombre.png avec opacité 80% */}
        <div 
          className="absolute inset-0 md:mr-20 mr-9"
          style={{ 
            backgroundImage: `url(${fond_sombre})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8 
          }}
        />

        {/* Design X à droite - TOUJOURS VISIBLE sur tous les écrans */}
        <div className="absolute inset-y-0 right-0 w-1/2 sm:w-2/5 md:w-1/2 lg:mr-40 flex items-center justify-end pointer-events-none">
          <img 
            src={design_x} 
            alt="Design X" 
            className="h-[100%] w-auto sm:h-[100%] md:h-[99%] lg:h-[99%] object-contain opacity-90 md:opacity-100"
          />
        </div>

        {/* Contenu principal - Adapté pour cohabiter avec X */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full sm:w-3/5 md:w-3/5 lg:w-1/2 py-8 md:py-0">
            
            {/* Sous-titre avec icône */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M13 5L20 12L13 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 5L13 12L6 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-xs sm:text-sm md:text-base tracking-wider" style={{color: MY_COLORS.secondaryGreen}}>
                {t(slides[currentSlide].subtitle)}
              </span>
            </div>

            {/* Titre principal avec hauteur minimale pour éviter les sauts */}
            <div className="transition-all duration-700 ease-in-out min-h-[110px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[180px]"> 
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-white leading-tight md:leading-snug mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                {t(slides[currentSlide].title)}{' '}
                <span style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted)}</span>
                <br />
                {t(slides[currentSlide].title2)}{' '}
                <span style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted2)}</span>
                <br />
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl"> 
                  {t(slides[currentSlide].title3)}
                </span>
              </h1>
            </div>

            {/* Boutons d'action - Toujours visibles */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              
              {/* Bouton vidéo avec effet hover */}
              <button
                className="relative group transition-all duration-300 flex-shrink-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Play video"
              >
                <div
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center overflow-hidden
                    transition-all duration-300
                    ${isHovered ? 'bg-transparent border-2 scale-110' : ''}
                  `}
                  style={{
                    backgroundColor: isHovered ? 'transparent' : MY_COLORS.secondaryGreen,
                    borderColor: isHovered ? MY_COLORS.secondaryGreen : 'transparent'
                  }}
                >
                  <img 
                    src={vid} 
                    alt="Video Icon"
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-all duration-300 ${isHovered ? 'scale-125' : ''}`}
                  />
                </div>
              </button>

              {/* Bouton Soumettre un projet avec flèche */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <button 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 border-2 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap"
                  style={{
                    borderColor: MY_COLORS.secondaryGreen,
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {t('hero.submitProject')}
                </button>
                
                {/* Flèche animée - Toujours visible */}
                <div className="animate-bounce-horizontal flex-shrink-0">
                  <img 
                    src={fleche} 
                    alt="Fleche"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide (points) - Toujours visibles */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              background: currentSlide === index ? MY_COLORS.secondaryGreen : 'white', 
            }}
            className={`
              w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300
              ${currentSlide === index ? 'scale-125' : 'opacity-60 hover:opacity-100'}
            `}     
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Animation CSS pour la flèche */}
      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;