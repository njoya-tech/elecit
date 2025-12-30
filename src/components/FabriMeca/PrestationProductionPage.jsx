import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant pour une carte de prestation
const PrestationCard = ({ number, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative"
    >
      {/* Numéro en cercle */}
      <div 
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold z-10"
        style={{ backgroundColor: MY_COLORS.secondaryGreen }}
      >
        {number}
      </div>

      {/* Carte */}
      <div className="border-2 border-gray-300 rounded-lg p-6 pt-10 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="text-xl font-bold text-center mb-4" style={{ color: MY_COLORS.black }}>
          {title}
        </h3>
        <p className="text-base text-center leading-relaxed" style={{ color: MY_COLORS.black }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Composant Section Prestations
const PrestationsSection = ({ data }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-right mb-12 relative"
        >
          <div className="flex items-center justify-center text-center gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: MY_COLORS.secondaryGreen }}>
              {data.title}
            </h2>
                       <div className='absolute -bottom-20 -right-50 -scale-x-[1]' >
                          <motion.img src={data.icon} alt="" className="w-45 h-45  "
                           // Animation: Uniquement le mouvement vertical (flottement)
               animate={{ 
                 y: [0, -15, 0], // Commence à 0, monte à -15px, revient à 0
               }}
               
               // Transition: Rend le flottement doux et répétitif
               transition={{ 
                 // On cible explicitement la propriété 'y'
                 y: {
                   duration: 2, 
                   ease: "easeInOut", 
                   repeat: Infinity, 
                   repeatType: "reverse", 
                 }
               }}
                          />
                       </div>
          </div>
          <p className="text-lg  justify-center text-center" style={{ color: MY_COLORS.black }}>
            {data.subtitle}
          </p>
        </motion.div>

        {/* Cartes de prestations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {data.prestations.map((prestation, index) => (
            <PrestationCard
              key={index}
              number={prestation.number}
              title={prestation.title}
              description={prestation.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Carte de Production
const ProductionCard = ({ image, title }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group flex-shrink-0 w-72 md:w-80"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-96 object-cover"
      />
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
      >
        <h3 className="text-white text-xl font-bold uppercase">
          {title}
        </h3>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
    </motion.div>
  );
};

const ProductionCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

const nextSlide = () => {
  setDirection(1);
  setCurrentIndex((prev) => (prev + 3) % items.length);
};

const prevSlide = () => {
  setDirection(-1);
  setCurrentIndex((prev) => (prev - 3 + items.length) % items.length);
};

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Calculer les 3 cartes visibles
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % items.length;
      cards.push({ ...items[index], originalIndex: index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  // Variants pour l'animation
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
    <div className="relative">
      {/* Bouton précédent */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
        style={{ color: MY_COLORS.secondaryGreen }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carrousel */}
      <div className="overflow-hidden px-12">
        <div className="flex gap-6 justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {visibleCards.map((item, idx) => (
              <motion.div
                key={`${currentIndex}-${idx}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductionCard
                  image={item.image}
                  title={item.title}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bouton suivant */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
        style={{ color: MY_COLORS.secondaryGreen }}
      >
        <ChevronRight size={24} />
      </button>

      
{/* Indicateurs */}
<div className="flex justify-center gap-2 mt-8">
  {Array.from({ length: Math.ceil(items.length / 3) }).map((_, index) => {
    const slideIndex = index * 3;
    const isActive = Math.floor(currentIndex / 3) === index;
    return (
      <button
        key={index}
        onClick={() => goToSlide(slideIndex)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isActive ? 'w-8' : ''
        }`}
        style={{
          backgroundColor: isActive ? MY_COLORS.secondaryGreen : '#D1D5DB'
        }}
      />
    );
  })}
</div>
    </div>
  );
};
// Composant Section Production
const ProductionSection = ({ data }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center text-center gap-4 mb-12 relative"
        >
             <div className='absolute -top-29 right-250' >
                         <motion.img src={data.icon} alt="" className="w-45 h-45" 
                           animate={{ rotate: 360 }}
                           transition={{ 
                           duration: 6, 
                           ease: "linear", 
                           repeat: Infinity 
                      }}
                         
                         />
                      </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center" style={{ color: MY_COLORS.secondaryGreen }}>
            {data.title}
          </h2>
        </motion.div>

        {/* Carrousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ProductionCarousel items={data.items} />
        </motion.div>

        {/* Icône décorative en bas à droite */}
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className=""
        >
          <div className='absolute right-30 -translate-y-15 ' >
                         <motion.img src={data.decorIcon} alt="" className="w-35 h-35" 
                           animate={{ rotate: 360 }}
                           transition={{ 
                           duration: 6, 
                           ease: "linear", 
                           repeat: Infinity 
                      }}
                         
                         />
                      </div>
        </motion.div>
      </div>
    </section>
  );
};

// Composant principal combinant les deux sections
const PrestationsProductionPage = ({ prestationsData, productionData }) => {
  return (
    <div>
      <PrestationsSection data={prestationsData} />
      <ProductionSection data={productionData} />
    </div>
  );
};
export default PrestationsProductionPage