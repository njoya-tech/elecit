import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ============================================================================
// CONSTANTS & CONFIG
// ============================================================================
export const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const ANIMATION_CONFIG = {
  exitDuration: 600,
  autoPlayInterval: 2000,
  staggerDelay: 120,
};

// ============================================================================
// CSS ANIMATIONS
// ============================================================================
const animationStyles = `
  @keyframes slideOutLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  @keyframes slideUpReveal {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-out-left {
    animation: slideOutLeft ${ANIMATION_CONFIG.exitDuration}ms ease-in-out forwards;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const BlogCarousel = ({ services }) => {
  const { t } = useTranslation();
  
  // -- ETAT DU MOTEUR CARROUSEL --
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const timeoutRef = useRef(null);

  const totalSlides = Math.ceil(services.length / cardsPerView);

  // -- GESTION RESPONSIVE --
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // -- LOGIQUE DE TRANSITION --
  const performTransition = (targetIndex) => {
    if (isExiting) return;

    setIsExiting(true);
    setNextIndex(targetIndex);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsExiting(false);
    }, ANIMATION_CONFIG.exitDuration);
  };

  // -- AUTOPLAY --
  useEffect(() => {
    if (isPaused || isExiting || totalSlides === 0) return;

    const interval = setInterval(() => {
      const nextIdx = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      performTransition(nextIdx);
    }, ANIMATION_CONFIG.autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isExiting, isPaused]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // -- HANDLERS --
  const handlePrevious = () => {
    performTransition(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    performTransition(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  const getVisibleItems = (pageIndex) => {
    const startIndex = pageIndex * cardsPerView;
    return services.slice(startIndex, startIndex + cardsPerView);
  };

  const currentItems = getVisibleItems(currentIndex);
  const nextItems = getVisibleItems(nextIndex);

  // -- RENDER CARD FUNCTION --
  const renderCard = (service, idx, isNextSlide = false) => {
    const displayNumber = currentIndex * cardsPerView + idx + 1;

    return (
      <div 
        key={`${service.id || idx}-${idx}-${isNextSlide ? 'next' : 'curr'}`}
        className="flex-1 w-full px-4" 
        style={{
          animation: isNextSlide ? `slideUpReveal 0.6s ease-out forwards` : undefined,
          animationDelay: isNextSlide ? `${idx * ANIMATION_CONFIG.staggerDelay}ms` : undefined,
          opacity: isNextSlide ? 0 : 1,
        }}
      >
        <div 
          className="relative p-1 rounded-xl"
          style={{ 
            border: `2px solid ${MY_COLORS.green}`,
            minHeight: '480px'
          }}
        >
          <div className="bg-white rounded-lg shadow-lg h-full flex flex-col relative">
            {/* Badge numéro */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-6 z-20 
                         w-12 h-12 rounded-full flex items-center justify-center 
                         text-white font-bold text-xl shadow-lg"
              style={{ backgroundColor: MY_COLORS.green }}
            >
              {displayNumber}
            </div>

            {/* IMAGE */}
            <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              <h3 
                className="text-lg md:text-xl font-bold text-center mb-3"
                style={{ color: MY_COLORS.black }}
              >
                {service.title}
              </h3>

              <p className="text-sm md:text-base text-center leading-relaxed text-gray-700 mb-4">
                {service.description}
              </p>

              <div className="flex justify-center mt-auto">
                <button
                  className="px-4 md:px-6 py-2 rounded-full text-white font-semibold text-sm md:text-base transition-all hover:scale-105"
                  style={{ backgroundColor: MY_COLORS.green }}
                >
                  {t('blog.seeMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (services.length === 0) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white }}
      >
        <div className="text-xl" style={{ color: MY_COLORS.black }}>
          Aucun service disponible
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>

      <div 
        className="relative w-full py-16 px-4"
        style={{ backgroundColor: MY_COLORS.white, minHeight: '650px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[550px] flex items-center justify-center">
            
            {/* BOUTON GAUCHE */}
            <button
              onClick={handlePrevious}
              disabled={isExiting}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50"
              style={{ marginLeft: '-10px' }}
              aria-label="Précédent"
            >
              <svg 
                className="w-5 h-5 md:w-6 md:h-6" 
                fill="none" 
                stroke={MY_COLORS.black} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* ZONE CAROUSEL */}
            <div className="relative w-full px-8 md:px-12 overflow-visible">
              
              {/* GROUPE ACTUEL */}
              <div
                className={`flex items-stretch justify-center ${
                  isExiting ? "animate-slide-out-left" : ""
                }`}
              >
                {currentItems.map((item, idx) => renderCard(item, idx, false))}
              </div>

              {/* GROUPE SUIVANT (Superposé pour l'animation) */}
              {isExiting && (
                <div className="absolute inset-0 flex items-stretch justify-center">
                  {nextItems.map((item, idx) => renderCard(item, idx, true))}
                </div>
              )}
            </div>

            {/* BOUTON DROIT */}
            <button
              onClick={handleNext}
              disabled={isExiting}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50"
              style={{ marginRight: '-10px' }}
              aria-label="Suivant"
            >
              <svg 
                className="w-5 h-5 md:w-6 md:h-6" 
                fill="none" 
                stroke={MY_COLORS.black} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* INDICATEURS (DOTS) */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => performTransition(index)}
                disabled={isExiting}
                className="transition-all rounded-full"
                style={{
                  width: currentIndex === index ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: currentIndex === index ? MY_COLORS.green : '#CCCCCC',
                }}
                aria-label={`Aller au groupe ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BlogCarousel);