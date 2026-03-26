import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { comm } from '../../assets' // Votre import d'image conservé

// ============================================================================
// CONSTANTS & CONFIG
// ============================================================================
const MY_COLORS = {
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
// CSS ANIMATIONS (Moteur EnterprisePartners)
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
// SUB-COMPONENTS
// ============================================================================
const StarRating = React.memo(({ rating = 5 }) => {
  return (
    <div className="flex justify-center gap-1 my-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-6 h-6"
          fill={i < rating ? '#FFD700' : '#FFD700'}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const TestimonialsCarousel = () => {
  const { t } = useTranslation();
  
  // -- ETAT DU MOTEUR CARROUSEL (Identique à EnterprisePartners) --
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const timeoutRef = useRef(null);

  const testimonials = useMemo(() => 
    t('testimonials.items', { returnObjects: true }), 
    [t]
  );

  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

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
    return testimonials.slice(startIndex, startIndex + cardsPerView);
  };

  const currentItems = getVisibleItems(currentIndex);
  const nextItems = getVisibleItems(nextIndex);

  // -- RENDER CARD FUNCTION --
  const renderCard = (testimonial, idx, isNextSlide = false) => (
    <div 
      key={`${testimonial.id}-${idx}-${isNextSlide ? 'next' : 'curr'}`}
      className="flex-1 w-full px-4" 
      style={{
        animation: isNextSlide ? `slideUpReveal 0.6s ease-out forwards` : undefined,
        animationDelay: isNextSlide ? `${idx * ANIMATION_CONFIG.staggerDelay}ms` : undefined,
        opacity: isNextSlide ? 0 : 1,
      }}
    >
      <div 
        className="relative p-6 rounded-xl bg-white shadow-lg h-full flex flex-col"
        style={{ border: `2px solid ${MY_COLORS.green}` }}
      >
        <div className="flex justify-center -mt-12 mb-4">
          <div 
            className="rounded-full flex items-center justify-center "
            style={{ 
              backgroundColor: MY_COLORS.green,
              width: '64px',
              height: '64px'
            }}
          >
            {/* ✅ IMAGE COMM.PNG CONSERVÉE EXACTEMENT ICI */}
            <img 
              src={comm} 
              alt="commentaire" 
              className="w-8 h-8"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        <div 
          className="w-full mb-6"
          style={{
            height: '2px',
            backgroundImage: `linear-gradient(to right, ${MY_COLORS.green} 50%, transparent 50%)`,
            backgroundSize: '12px 2px',
            backgroundRepeat: 'repeat-x'
          }}
        />

        <p className="text-center text-gray-700 leading-relaxed flex-1 px-2" style={{ fontSize: '15px' }}>
          {testimonial.text}
        </p>

        <StarRating rating={testimonial.rating} />

        <div 
          className="w-full my-4"
          style={{
            height: '2px',
            backgroundImage: `linear-gradient(to right, ${MY_COLORS.green} 50%, transparent 50%)`,
            backgroundSize: '12px 2px',
            backgroundRepeat: 'repeat-x'
          }}
        />

        <div className="text-center">
          <p className="font-bold text-gray-900" style={{ fontSize: '16px' }}>
            {testimonial.author}
          </p>
          <p className="font-bold mt-1" style={{ color: MY_COLORS.black, fontSize: '14px' }}>
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{animationStyles}</style>

      <div 
        className="relative w-full py-16 px-4"
        style={{ backgroundColor: MY_COLORS.white, minHeight: '600px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[500px] flex items-center justify-center">
            
            {/* BOUTON GAUCHE */}
            <button
              onClick={handlePrevious}
              disabled={isExiting}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50"
              style={{ marginLeft: '-10px' }}
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke={MY_COLORS.black} viewBox="0 0 24 24">
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50"
              style={{ marginRight: '-10px' }}
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke={MY_COLORS.black} viewBox="0 0 24 24">
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
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TestimonialsCarousel);