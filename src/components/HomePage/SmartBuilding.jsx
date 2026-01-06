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

// Composant image flottante — IDENTIQUE à Tracking
const FloatingImage = ({
  src,
  alt,
  delay = 0,
  duration = 4,
  className = '',
  zIndex = 1
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={`absolute ${className}`}
    style={{ zIndex }}
    animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const SmartBuilding = ({ title, buttonText, images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      
      {/* Colonne gauche */}
      <div className="hidden md:block md:col-span-1 bg-white" />

      {/* Contenu principal */}
      <div className="col-span-1 md:col-span-10">
        <section
          className="relative w-full min-h-[300px] sm:min-h-[480px] md:min-h-[480px] lg:min-h-[480px] overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-80 lg:items-center h-full">
              
              {/* TEXTE */}
              <div className="relative z-10 space-y-6 sm:space-y-8 pt-5 md:pt-0">
                <h2
                  className="
                    max-w-8xl
                    md:w-[190%]
                    lg:w-[140%]
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                    font-bold leading-tight
                  "
                  style={{ color: MY_COLORS.white }}
                >
                  {title}
                </h2>

                <motion.button
                  className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg border-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: MY_COLORS.green,
                    borderColor: MY_COLORS.green,
                  }}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 0.96, 1.06, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  whileHover={{
                    backgroundColor: MY_COLORS.green,
                    color: MY_COLORS.white,
                    scale: [1, 0.96, 1.06, 1],
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {buttonText}
                </motion.button>
              </div>

              {/* VISUELS */}
              <div className="relative h-80 sm:h-96 md:h-96 lg:h-[500px] w-full flex justify-center md:justify-end items-center">
                <div className="relative w-full h-full md:max-w-none lg:max-w-[640px] xl:max-w-[720px]">
                  
                  <FloatingImage
                    src={images.ordi1}
                    alt="Dashboard"
                    className="left-[5%] top-[8%] w-[90%] max-w-[800px]"
                    zIndex={3}
                  />

                  <FloatingImage
                    src={images.phonegps}
                    alt="Smartphone"
                    delay={0.8}
                    className="left-[40%] top-[45%] w-[65%] max-w-[790px]"
                    zIndex={4}
                  />

            
                  <FloatingImage
                    src={images.loc2}
                    alt="Pin Blue"
                    delay={1.6}
                    className="left-[2%] top-[35%] w-[80%] max-w-[900px]"
                    zIndex={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Colonne droite */}
      <div className="hidden md:block md:col-span-1 bg-white" />
    </div>
  );
};

export default SmartBuilding;
