import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProjectsService from '../../services/projets/projects.service';

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

const ServicesCarousel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // -- ETAT DU MOTEUR CARROUSEL --
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const handleViewMore = (id) => {
    navigate(`/projets/${id}`);
  };

  // Charger les projets depuis Directus
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await ProjectsService.getProjects(i18n.language);
        setProjects(projectsData);
      } catch (error) {
        console.error('Erreur chargement projets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  const totalSlides = Math.ceil(projects.length / cardsPerView);

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
    return projects.slice(startIndex, startIndex + cardsPerView);
  };

  const currentItems = getVisibleItems(currentIndex);
  const nextItems = getVisibleItems(nextIndex);

  // -- RENDER CARD FUNCTION --
  const renderCard = (project, idx, isNextSlide = false) => {
    const projectImage = project?.mainImage || 'https://via.placeholder.com/400x300';
    const projectNumber = project?.number || (currentIndex * cardsPerView + idx + 1);

    return (
      <div 
        key={`${project?.id || idx}-${idx}-${isNextSlide ? 'next' : 'curr'}`}
        className="flex-1 w-full px-4" 
        style={{
          animation: isNextSlide ? `slideUpReveal 0.6s ease-out forwards` : undefined,
          animationDelay: isNextSlide ? `${idx * ANIMATION_CONFIG.staggerDelay}ms` : undefined,
          opacity: isNextSlide ? 0 : 1,
        }}
      >
        <div 
          className="relative p-1 h-[480px] rounded-xl"
          style={{ border: `2px solid ${MY_COLORS.green}` }}
        >
          <div className="bg-white rounded-lg shadow-lg h-full flex flex-col relative">
            {/* Badge numéro */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-6 z-20 
                         w-12 h-12 rounded-full flex items-center justify-center 
                         text-white font-bold text-xl shadow-lg"
              style={{ backgroundColor: MY_COLORS.green }}
            >
              {projectNumber}
            </div>

            {/* IMAGE */}
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img
                src={projectImage}
                alt={project?.title || 'Projet'}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3
                className="text-xl font-bold text-center mb-3"
                style={{ color: MY_COLORS.black }}
              >
                {project?.title || 'Sans titre'}
              </h3>

              <p className="text-sm text-center leading-relaxed text-gray-700 line-clamp-3">
                {project?.shortDescription || project?.description || ''}
              </p>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleViewMore(project.id)}
                  className="px-6 py-2 rounded-full text-white font-semibold transition-all cursor-pointer hover:scale-105"
                  style={{ backgroundColor: MY_COLORS.green }}
                >
                  {t('servicesCarousel.seeMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white }}
      >
        <div className="text-xl" style={{ color: MY_COLORS.green }}>
          {t('projects.loading')}...
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white }}
      >
        <div className="text-xl" style={{ color: MY_COLORS.black }}>
          Aucun projet disponible
        </div>
      </div>
    );
  }

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
              aria-label="Précédent"
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
              aria-label="Suivant"
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
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesCarousel;