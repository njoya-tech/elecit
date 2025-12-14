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

  // Auto-défilement des slides
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  // Protection si slides n'est pas défini
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden">
        
      {/* Images de fond avec marges responsives */}
      <div className="absolute inset-y-0 left-2 right-2 xs:left-4 xs:right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 xl:left-24 xl:right-24">
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
        className="absolute inset-y-0 left-2 right-2 xs:left-4 xs:right-4 sm:left-6 sm:right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 xl:left-24 xl:right-24"
        style={{ 
          backgroundImage: `url(${fond_sombre})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8 
        }}
      />

      {/* Design X à droite - Responsive selon l'écran */}
      <div className="absolute right-2 sm:right-4 md:right-8 lg:right-16 xl:right-24 top-0 h-full w-1/3 md:w-2/5 lg:w-1/2 justify-end hidden sm:flex items-center">
        <img 
          src={design_x} 
          alt="Design X" 
          className="w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96 h-auto object-contain opacity-90"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-full flex items-center pt-6 sm:pt-8 md:pt-0">
        <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
          {/* Sous-titre avec icône */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M13 5L20 12L13 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 5L13 12L6 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xs sm:text-sm md:text-base tracking-wider" style={{color: MY_COLORS.secondaryGreen}}>
              {t(slides[currentSlide].subtitle)}
            </span>
          </div>

          {/* Titre principal avec transition et min-height responsive */}
          <div className="transition-all duration-700 ease-in-out min-h-[100px] xs:min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]"> 
            <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight sm:leading-snug md:leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              {t(slides[currentSlide].title)}{' '}
              <span className="" style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted)}</span>
              <br />
              {t(slides[currentSlide].title2)}{' '}
              <span style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted2)}</span>
              <br />
              {/* Taille du titre 3 ajustée pour tous les écrans */}
              <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl"> 
                  {t(slides[currentSlide].title3)}
              </span>
            </h1>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Bouton vidéo avec effet hover */}
            <button
              className="relative group transition-all duration-300 flex-shrink-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className={`
                  w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center overflow-hidden
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
                  className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-all duration-300 ${isHovered ? 'scale-125' : ''}`}
                />
              </div>
            </button>

            {/* Bouton Soumettre un projet */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                className="px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 border-2 text-white text-xs xs:text-sm sm:text-sm md:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap"
                style={{
                  borderColor: MY_COLORS.secondaryGreen,
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('hero.submitProject')}
              </button>
              
              {/* Flèche animée */}
              <div className="animate-bounce-horizontal flex-shrink-0">
                <img 
                  src={fleche} 
                  alt="Fleche"
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide (points) */}
      <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-2.5 md:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              background: currentSlide === index ? MY_COLORS.secondaryGreen : 'white', 
            }}
            className={`
              w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300
              ${currentSlide === index ? 'scale-125' : ''}
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
            transform: translateX(10px);
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
