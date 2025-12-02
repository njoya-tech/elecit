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
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        
      {/* Images de fond et Overlay */}
      <div className="absolute inset-y-0 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24">
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
        className="absolute inset-y-0 left-4 right-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24"
        style={{ 
          backgroundImage: `url(${fond_sombre})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8 
        }}
      />

      {/* Design X à droite - Masqué sur mobile */}
      <div className="absolute right-4 md:right-16 lg:right-24 top-0 h-full w-1/2 justify-end pr-0 hidden md:flex items-center">
        <img 
          src={design_x} 
          alt="Design X" 
          className="w-96 h-auto object-contain"
        />
        </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-8 md:pt-0">
        <div className="w-full md:w-2/3 lg:w-1/2">
          {/* Sous-titre avec icône */}
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
              <path d="M13 5L20 12L13 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 5L13 12L6 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-sm md:text-base tracking-wider" style={{color: MY_COLORS.secondaryGreen}}>
              {t(slides[currentSlide].subtitle)}
            </span>
          </div>

          {/* Titre principal avec transition et min-height responsive */}
          <div className="transition-all duration-700 ease-in-out min-h-[140px] md:min-h-[180px]"> 
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug sm:leading-tight mb-6 md:mb-8">
              {t(slides[currentSlide].title)}{' '}
              <span className="" style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted)}</span>
              <br />
              {t(slides[currentSlide].title2)}{' '}
              <span style={{color: MY_COLORS.secondaryGreen}}>{t(slides[currentSlide].highlighted2)}</span>
              <br />
              {/* Taille du titre 3 ajustée pour mobile */}
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"> 
                  {t(slides[currentSlide].title3)}
              </span>
            </h1>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Bouton vidéo avec effet hover */}
            <button
              className="relative group transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden
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
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${isHovered ? 'scale-125' : ''}`}
                />
              </div>
            </button>

            {/* Bouton Soumettre un projet */}
            <div className="flex items-center gap-3">
              <button 
                className="px-5 py-2 sm:px-8 sm:py-3 border-2 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300"
                style={{
                  borderColor: MY_COLORS.secondaryGreen,
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('hero.submitProject')}
              </button>
              
              {/* Flèche animée */}
              <div className="animate-bounce-horizontal">
                <img 
                  src={fleche} 
                  alt="Fleche"
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide (points) */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              background: currentSlide === index ? MY_COLORS.secondaryGreen : 'white', 
            }}
            className=  {`
              w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300
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