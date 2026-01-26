import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchAllPosts, getAssetUrl, getTranslation } from '../../services/blog.js';

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
  autoPlayInterval: 4000,
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
const BlogCarousel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // -- ETAT DU MOTEUR CARROUSEL --
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  const totalSlides = posts.length > 0 ? Math.ceil(posts.length / cardsPerView) : 0;

  // -- FETCH POSTS FROM DIRECTUS --
  useEffect(() => {
    let isActive = true;

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('BlogCarousel - Fetching posts from Directus...');
        
        // Fetch posts from Directus (limit to 9 for carousel)
        const directusPosts = await fetchAllPosts({
          limit: 9,
          sort: '-created_at'
        });

        console.log('BlogCarousel - Posts fetched:', directusPosts);

        if (!isActive) return;

        // Transform Directus data
        const transformedPosts = directusPosts.map((post) => {
          // Get translated version based on current language
          const translatedPost = getTranslation(post, i18n.language);
          
          return {
            id: translatedPost.id,
            slug: post.slug,
            title: translatedPost.title,
            excerpt: translatedPost.excerpt,
            image: getAssetUrl(post.cover_image),
            category: translatedPost.category?.name || '',
            views: translatedPost.views || 0,
            comments: translatedPost.comments_count || 0,
            likes: translatedPost.likes || 0,
          };
        });

        console.log('BlogCarousel - Transformed posts:', transformedPosts);
        setPosts(transformedPosts);
      } catch (err) {
        if (!isActive) return;
        console.error('BlogCarousel - Error fetching posts:', err);
        setError('Failed to load blog posts');
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    loadPosts();

    return () => {
      isActive = false;
    };
  }, [i18n.language]);

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

  const handleViewMore = (id) => {
    navigate(`/blog/${id}`);
  };

  const getVisibleItems = (pageIndex) => {
    const startIndex = pageIndex * cardsPerView;
    return posts.slice(startIndex, startIndex + cardsPerView);
  };

  const currentItems = getVisibleItems(currentIndex);
  const nextItems = getVisibleItems(nextIndex);

  // -- RENDER CARD FUNCTION --
  const renderCard = (post, idx, isNextSlide = false) => {
    const displayNumber = currentIndex * cardsPerView + idx + 1;

    return (
      <div 
        key={`${post.id}-${idx}-${isNextSlide ? 'next' : 'curr'}`}
        className="flex-1 w-full px-4" 
        style={{
          animation: isNextSlide ? `slideUpReveal 0.6s ease-out forwards` : undefined,
          animationDelay: isNextSlide ? `${idx * ANIMATION_CONFIG.staggerDelay}ms` : undefined,
          opacity: isNextSlide ? 0 : 1,
        }}
      >
        <div 
          className="relative p-1 h-[480px] rounded-xl"
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
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title || 'Blog post'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', post.image);
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage non disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: '#f3f4f6' }}
                >
                  <span className="text-gray-400">Pas d'image</span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
              <h3 
                className="text-lg md:text-xl font-bold text-center mb-3"
                style={{ color: MY_COLORS.black }}
              >
                {post.title || 'Sans titre'}
              </h3>

              <p className="text-sm md:text-base text-center leading-relaxed text-gray-700 mb-4 line-clamp-3">
                {post.excerpt || 'Aucune description disponible'}
              </p>

              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => handleViewMore(post.id)}
                  className="px-4 md:px-6 py-2 rounded-full text-white font-semibold text-sm md:text-base transition-all hover:scale-105"
                  style={{ backgroundColor: MY_COLORS.green }}
                >
                  {t('blog.seeMore') || 'Voir plus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -- LOADING STATE --
  if (loading) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white, minHeight: '650px' }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: MY_COLORS.green }}
        ></div>
      </div>
    );
  }

  // -- ERROR STATE --
  if (error) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white, minHeight: '650px' }}
      >
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: MY_COLORS.green }}
          >
            {t('common.retry') || 'Réessayer'}
          </button>
        </div>
      </div>
    );
  }

  // -- EMPTY STATE --
  if (!posts || posts.length === 0) {
    return (
      <div 
        className="w-full py-16 px-4 flex justify-center items-center"
        style={{ backgroundColor: MY_COLORS.white }}
      >
        <div className="text-xl" style={{ color: MY_COLORS.black }}>
          {t('blog.noArticles') || 'Aucun article disponible'}
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