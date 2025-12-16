
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
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
        width: `${scale * 100}px`,
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

// Simuler useTranslation
const useTranslation = () => {
  const translations = {
    gpsT: {
      "BanderTitle": "Autres d'informations sur notre chaîne",
      "BanderTitle2": "Youtube",
      "BanderDescription": "Plateforme de suivi de véhicule en temps réel",
      "BanderButton": "Poursuivre"
    }
  };

  return {
    t: (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value[k];
        if (!value) return key;
      }
      return value;
    }
  };
};

// CORRECTION: Destructurer les props correctement avec { images }
const Gbander = ({ images, casqIcon }) => {
  const { t } = useTranslation();

  return (
    <div className='w-screen items-center justify-center flex p-10'>
      <div style={{ backgroundColor: '#40414F' }} className='rounded-2xl relative w-[1000px] grid grid-cols-3 gap-0'>          
        <div className="flex items-center gap-5 pl-4">
          {/* Left Content Section */}
          <div className="flex-1 relative z-10">
            {/* Decorative Gear Left */}
            <div className="absolute -left-30 top-3 w-35 h-40">
              <motion.img 
                src={casqIcon || "https://placehold.co/100x100/7DA837/FFFFFF?text=Gear"}
                alt="engrenage" 
                className="w-45 h-45 scale-x-[-1]" 
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  y: {
                    duration: 2, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                  }
                }}
              />
            </div>

            <h1 className='text-4xl font-bold  text-white'>
              <span style={{color: MY_COLORS.secondaryGreen}}>{t('gpsT.BanderTitle')} </span>
              {t('gpsT.BanderTitle2')}
            </h1>

            <p className="text-white leading-relaxed mt-8 max-w-md mb-10">
              {t('gpsT.BanderDescription')}
            </p>

            <button 
              className="px-8 py-3 bg-white rounded-full font-bold transition-all hover:bg-white mt-10 mb-20"
              style={{ color: MY_COLORS.black }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = MY_COLORS.secondaryGreen;
                e.target.style.color = MY_COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = MY_COLORS.white;
                e.target.style.color = MY_COLORS.black;
              }}
            >
              {t('gpsT.BanderButton')}
            </button>
          </div>

          {/* Partie Droite - Images Flottantes Superposées */}
          <div className="relative h-96 lg:h-[500px] mt-20 col-span-2 overflow-visible">
            {/* Couche 1 (Fond) - loc1 (pin arrière-plan droite) */}
            {images?.loc1 && (
              <FloatingImage
                src={images.loc1}
                alt="Location Pin 1"
                delay={0}
                duration={5.5}
                xOffset={420}
                yOffset={20}
                zIndex={1}
                scale={1.5}
              />
            )}

            {/* Couche 2 (Base centrale) - ordi1 (ordinateur - élément principal) */}
            {images?.ordi1 && (
              <FloatingImage
                src={images.ordi1}
                alt="Ordinateur Dashboard"
                delay={0.3}
                duration={4.8}
                xOffset={175}
                yOffset={10}
                zIndex={2}
                scale={3.5}
              />
            )}

            {/* Couche 3 (Accent bas) - loc2 (pin de localisation bas gauche) */}
            {images?.loc2 && (
              <FloatingImage
                src={images.loc2}
                alt="Location Pin 2"
                delay={0.9}
                duration={4.3}
                xOffset={150}
                yOffset={160}
                zIndex={3}
                scale={2}
              />
            )}

            {/* Couche 4 (Premier plan) - phonegps (smartphone avant droite) */}
            {images?.phonegps && (
              <FloatingImage
                src={images.phonegps}
                alt="Smartphone GPS"
                delay={0.6}
                duration={4.0}
                xOffset={300}
                yOffset={140}
                zIndex={4}
                scale={2}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gbander