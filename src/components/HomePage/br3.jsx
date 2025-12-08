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

// Composant pour les images flottantes
const FloatingImage = ({ src, alt, delay = 0, duration = 4, xOffset = 0, yOffset = 0, zIndex = 1, scale = 1, mobileScale = 1, mobileXOffset = 0, mobileYOffset = 0 }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="absolute"
      style={{
        zIndex,
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
      {/* Zone gauche - marges latérales */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white"></div>

      {/* Contenu principal */}
      <div className="col-span-1 md:col-span-10 lg:col-span-10">
        <section 
          className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[700px] lg:min-h-[750px] overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-12 md:py-16 lg:py-20">
              
              {/* Partie Gauche - Texte et Bouton */}
              <div className="relative z-10 space-y-6 md:space-y-8 text-center lg:text-left order-1 lg:order-1">
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4 sm:px-0"
                  style={{ color: MY_COLORS.white }}
                >
                  {title}
                </h2>
                
                <div className="flex justify-center lg:justify-start">
                  <motion.button
                    className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl"
                    style={{
                      backgroundColor: 'transparent',
                      color: MY_COLORS.green,
                      border: `3px solid ${MY_COLORS.green}`,
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
              </div>

              {/* Partie Droite - Images Flottantes Superposées */}
              <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] order-2 lg:order-2">
                {/* Container avec positioning responsive */}
                <div className="absolute inset-0">
                  
                  {/* Image arrière-plan gauche - loc1 (pin de localisation) */}
                  <div className="absolute top-[5%] right-[5%] sm:top-[2%] sm:right-[8%] md:right-[10%] lg:top-[2%] lg:right-[15%] w-16 sm:w-20 md:w-24 lg:w-28">
                    <FloatingImage
                      src={images.loc1}
                      alt="Location Pin 1"
                      delay={0}
                      duration={5}
                      zIndex={1}
                      scale={0.7}
                    />
                  </div>

                  {/* Image arrière - ordi1 (ordinateur) - élément principal */}
                  <div className="absolute top-[8%] left-[50%] -translate-x-1/2 sm:top-[5%] md:top-[3%] lg:top-0 lg:left-[10%] lg:translate-x-0 w-[85%] sm:w-[80%] md:w-[75%] lg:w-[90%] max-w-[500px]">
                    <FloatingImage
                      src={images.ordi1}
                      alt="Ordinateur Dashboard"
                      delay={0.5}
                      duration={4.5}
                      zIndex={2}
                      scale={1.6}
                    />
                  </div>

                  {/* Image avant - phonegps (smartphone) */}
                  <div className="absolute bottom-[15%] right-[8%] sm:bottom-[12%] sm:right-[10%] md:bottom-[15%] md:right-[12%] lg:bottom-[18%] lg:right-[15%] w-20 sm:w-24 md:w-28 lg:w-32">
                    <FloatingImage
                      src={images.phonegps}
                      alt="Smartphone GPS"
                      delay={1}
                      duration={4}
                      zIndex={4}
                      scale={5}
                    />
                  </div>

                  {/* Image avant gauche - loc2 (pin de localisation bleu) */}
                  <div className="absolute bottom-[8%] left-[5%] sm:bottom-[10%] sm:left-[8%] md:left-[5%] lg:bottom-[15%] lg:left-[3%] w-20 sm:w-24 md:w-28 lg:w-32">
                    <FloatingImage
                      src={images.loc2}
                      alt="Location Pin 2"
                      delay={1.5}
                      duration={4.2}
                      zIndex={3}
                      scale={0.9}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Zone droite - marges latérales */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white"></div>
    </div>
  );
};


export default TrackingPlatformSection