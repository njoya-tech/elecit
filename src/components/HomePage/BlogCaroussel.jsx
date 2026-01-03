/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const BlogCarousel = ({ services, t }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(0); // 1 pour droite, -1 pour gauche

  const totalSlides = services.length;

  // Auto-slide toutes les 5 secondes
  React.useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection(1); // Coulisse vers la droite
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1); // Coulisse vers la gauche
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculer quelles cartes afficher (3 cartes visibles)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      cards.push({ ...services[index], originalIndex: index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  // Variants pour l'animation en fonction de la direction
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

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
            aria-label="Précédent"
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

          {/* Cartes avec AnimatePresence */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
                         transition={{ duration: 0.9, ease: "easeInOut" }}

              className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12"
            >
              {visibleCards.map((service, idx) => (
                <div 
                  key={`${currentIndex}-${idx}`}
                  className="relative p-1 h-[480px] rounded-xl"
                  style={{ border: `2px solid ${MY_COLORS.green}` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-lg shadow-lg h-full flex flex-col relative"
                  >
                    {/* Badge */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 -top-6 z-20 
                                 w-12 h-12 rounded-full flex items-center justify-center 
                                 text-white font-bold text-xl shadow-lg"
                      style={{ backgroundColor: MY_COLORS.green }}
                    >
                      {((currentIndex + idx) % totalSlides) + 1}
                    </div>

                    {/* IMAGE */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-center"
                      >
                        {service.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-sm text-center leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      <div className="flex justify-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-2 rounded-full text-white font-semibold"
                          style={{ backgroundColor: MY_COLORS.green }}
                        >
                          {t ? t('seeMore') : 'Voir plus'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bouton Droite */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            style={{ marginRight: '-20px' }}
            aria-label="Suivant"
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
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
  );
};

export default BlogCarousel;