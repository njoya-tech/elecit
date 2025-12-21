import React from 'react';
import { motion } from 'framer-motion';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Fonction de traduction simulée
const t = (key) => {
  const translations = {
    "trackingPlatform": {
      "title": "Plateforme de Tracking disponible sur Web & Smartphone",
      "buttonText": "Regardez la vidéo"
    }
  };
  
  const keys = key.split('.');
  let result = translations;
  for (let k of keys) {
    result = result[k];
  }
  return result;
};

// Composant pour les images flottantes avec responsive
const FloatingImage = ({ src, alt, delay = 0, duration = 4, positions, zIndex = 1 }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="absolute"
      style={{
        zIndex,
        left: positions.left,
        top: positions.top,
        width: positions.width,
        maxWidth: positions.maxWidth,
      }}
      initial={{ x: 0, y: 0 }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      onError={(e) => {
        e.target.src = `https://placehold.co/300x300/CCCCCC/000000?text=${alt}`;
      }}
    />
  );
};

const TrackingPlatformSection = ({ title, buttonText, images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
      {/* Zone gauche - 1 colonne sur md et lg */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white">
      </div>

      <div className="col-span-1 md:col-span-10 lg:col-span-10">
        
        <section 
          className="relative w-full h-[500px] sm:h-[540px] md:h-[600px] lg:h-[650px] overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
              
              {/* Partie Gauche - Texte et Bouton */}
              <div className="relative z-10 space-y-6 sm:space-y-8 pt-12 md:pt-0">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                  style={{ color: MY_COLORS.white }}
                >
                  {title}
                </h2>
                
                <motion.button
                  className="group flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-xl"
                  style={{
                    backgroundColor: 'transparent',
                    color: MY_COLORS.green,
                    border: `2px solid ${MY_COLORS.green}`,
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                  whileHover={{
                    backgroundColor: MY_COLORS.green,
                    color: MY_COLORS.white,
                    scale: 1.04,
                  }}
                >
                  {buttonText}
                </motion.button>
              </div>

              {/* Partie Droite - Images Flottantes Superposées */}
              <div className="relative h-80 sm:h-96 md:h-96 lg:h-[500px] w-full -translate-y-10 sm:-translate-y-0 md:-translate-y-0 lg:-translate-y-0">
                {/* Image arrière-plan gauche - loc1 (pin de localisation) */}
                <FloatingImage
                  src={images.loc1}
                  alt="Location Pin 1"
                  delay={0}
                  duration={5}
                  positions={{
                    left: '65%',
                    top: '9%',
                    width: '40%',
                    maxWidth: '80px'
                  }}
                  zIndex={1}
                />

                {/* Image arrière - ordi1 (ordinateur) */}
                <FloatingImage
                  src={images.ordi1}
                  alt="Ordinateur Dashboard"
                  delay={0.5}
                  duration={4.5}
                  positions={{
                    left: '5%',
                    top: '8%',
                    width: '80%',
                    maxWidth: '400px'
                  }}
                  zIndex={2}
                />

                {/* Image avant - phonegps (smartphone) */}
                <FloatingImage
                  src={images.phonegps}
                  alt="Smartphone GPS"
                  delay={1}
                  duration={4}
                  positions={{
                    left: '50%',
                    top: '35%',
                    width: '35%',
                    maxWidth: '180px'
                  }}
                  zIndex={4}
                />

                {/* Image avant gauche - loc2 (pin de localisation bleu) */}
                <FloatingImage
                  src={images.loc2}
                  alt="Location Pin 2"
                  delay={1.5}
                  duration={4.2}
                  positions={{
                    left: '2%',
                    top: '55%',
                    width: '30%',
                    maxWidth: '500px'
                  }}
                  zIndex={3}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Zone droite - 1 colonne sur md et lg */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white">
      </div>

    </div>
  );
};

export default TrackingPlatformSection;