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
const FloatingImage = ({ src, alt, delay = 0, duration = 4, xOffset = 0, yOffset = 0, zIndex = 1, scale = 1 }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className="absolute"
      style={{
        zIndex,
        width: `${scale * 100}%`,
        maxWidth: `${scale * 300}px`,
      }}
      initial={{ x: xOffset, y: yOffset }}
      animate={{
        y: [yOffset, yOffset - 20, yOffset],
        x: [xOffset, xOffset + 10, xOffset],
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
      {/* Zone gauche - 2 colonnes sur md, 3 colonnes sur lg */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white">
      </div>

        <div className="col-span-1 md:col-span-10 lg:col-span-10">
        
    <section 
      className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden "
      style={{ backgroundColor: MY_COLORS.black }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 items-center flex justify-center mt-20">
          
          {/* Partie Gauche - Texte et Bouton */}
          <div className="relative z-10 space-y-8">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: MY_COLORS.white }}
            >
              {title}
            </h2>
            
            <motion.button
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl"
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

          {/* Partie Droite - Images Flottantes Superposées */}
          <div className="relative h-96 lg:h-[500px]">
            {/* Image arrière-plan gauche - loc1 (pin de localisation) */}
            <FloatingImage
              src={images.loc1}
              alt="Location Pin 1"
              delay={0}
              duration={5}
              xOffset={400}
              yOffset={10}
              zIndex={1}
              scale={0.7}
            />

            {/* Image arrière - ordi1 (ordinateur) */}
            <FloatingImage
              src={images.ordi1}
              alt="Ordinateur Dashboard"
              delay={0.5}
              duration={4.5}
              xOffset={60}
              yOffset={-20}
              zIndex={2}
              scale={1.6}
            />

            {/* Image avant - phonegps (smartphone) */}
            <FloatingImage
              src={images.phonegps}
              alt="Smartphone GPS"
              delay={1}
              duration={4}
              xOffset={260}
              yOffset={80}
              zIndex={4}
              scale={0.8}
            />

            {/* Image avant gauche - loc2 (pin de localisation bleu) */}
            <FloatingImage
              src={images.loc2}
              alt="Location Pin 2"
              delay={1.5}
              duration={4.2}
              xOffset={15}
              yOffset={145}
              zIndex={3}
              scale={0.9}
            />
          </div>
        </div>
      </div>

      {/* Effet de dégradé subtil en bas */}
      {/* <div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${MY_COLORS.primaryBlue}15, transparent)`
        }}
      /> */}
    </section>
      </div>

      {/* Zone droite - 2 colonnes sur md, 3 colonnes sur lg */}
      <div className="hidden md:block md:col-span-1 lg:col-span-1 bg-white">
      </div>

    </div>

  );
};

export default TrackingPlatformSection