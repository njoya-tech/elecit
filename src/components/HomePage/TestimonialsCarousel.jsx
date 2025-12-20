import React from 'react';
import { motion } from 'framer-motion';
import comm from '../../assets/comm.png'
import { useTranslation } from 'react-i18next';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Icône guillemets pour le témoignage
const QuoteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill={MY_COLORS.green} />
    <path d="M16 28C16 25.7909 17.7909 24 20 24C22.2091 24 24 25.7909 24 28C24 30.2091 22.2091 32 20 32C17.7909 32 16 30.2091 16 28ZM20 24C20 20 22 16 26 16V18C23 18 22 20 22 24H20Z" fill="white"/>
    <path d="M24 28C24 25.7909 25.7909 24 28 24C30.2091 24 32 25.7909 32 28C32 30.2091 30.2091 32 28 32C25.7909 32 24 30.2091 24 28ZM28 24C28 20 30 16 34 16V18C31 18 30 20 30 24H28Z" fill="white"/>
  </svg>
);

// Composant Étoiles
const StarRating = ({ rating = 5 }) => {
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
};

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

const { t } = useTranslation();
const testimonials = t('testimonials.items', { returnObjects: true });

// Pour les aria-labels :



  const totalSlides = testimonials.length;

  // Auto-slide toutes les 5 secondes
  React.useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculer quelles cartes afficher (3 cartes visibles)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      cards.push({ ...testimonials[index], originalIndex: index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      className="relative w-full py-16 px-4"
      style={{ backgroundColor: MY_COLORS.white }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Conteneur principal du carousel */}
        <div className="relative">
          {/* Bouton Gauche */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            style={{ marginLeft: '-20px' }}
           aria-label={t('testimonials.ariaLabels.previous')}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke={MY_COLORS.black} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cartes Témoignages */}
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0.7 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12"
          >
            {visibleCards.map((testimonial, idx) => (
              <div 
                key={testimonial.id}
                className="relative p-6 rounded-xl bg-white shadow-lg"
                  style={{ border: `2px solid ${MY_COLORS.green}` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="h-full flex flex-col"
                >
                  {/* Icône Guillemets */}
                {/* Icône Commentaire avec cercle vert */}
                  <div className="flex justify-center -mt-12 mb-4">
                    <div 
                      className="rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: MY_COLORS.green,
                        width: '64px',
                        height: '64px'
                      }}
                    >
                      <img 
                        src={comm} 
                        alt="commentaire" 
                        className="w-8 h-8"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  </div>

                  {/* Ligne décorative en pointillés au-dessus */}
                  <div 
                    className="w-full mb-6"
                    style={{
                      height: '2px',
                      backgroundImalge: `inear-gradient(to right, ${MY_COLORS.green} 50%, transparent 50%)`,
                      backgroundSize: '12px 2px',
                      backgroundRepeat: 'repeat-x'
                    }}
                  />

                  {/* Texte du témoignage */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-gray-700 leading-relaxed flex-1 px-2"
                    style={{ fontSize: '15px' }}
                  >
                    {testimonial.text}
                  </motion.p>

                  {/* Étoiles */}
                  <StarRating rating={testimonial.rating} />

                  {/* Ligne décorative en pointillés en bas */}
                  <div 
                    className="w-full my-4"
                    style={{
                      height: '2px',
                      backgroundImage: `linear-gradient(to right, ${MY_COLORS.green} 50%, transparent 50%)`,
                      backgroundSize: '12px 2px',
                      backgroundRepeat: 'repeat-x'
                    }}
                  />

                  {/* Auteur */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-center"
                  >
                    <p className="font-bold text-gray-900" style={{ fontSize: '16px' }}>
                      {testimonial.author}
                    </p>
                    <p className="font-bold mt-1" style={{ color: MY_COLORS.black, fontSize: '14px' }}>
                      {testimonial.company}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Bouton Droite */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            style={{ marginRight: '-20px' }}
           aria-label={t('testimonials.ariaLabels.next')}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke={MY_COLORS.black} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicateurs de pagination (pointillés) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all rounded-full"
              style={{
                width: currentIndex === index ? '32px' : '8px',
                height: '8px',
                backgroundColor: currentIndex === index ? MY_COLORS.green : '#CCCCCC',
              }}
            aria-label={`${t('testimonials.ariaLabels.goToTestimonial')} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;                                              
