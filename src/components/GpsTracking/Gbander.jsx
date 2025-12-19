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

// Composant pour les images flottantes - VERSION RESPONSIVE
const FloatingImage = ({ 
  src, 
  alt, 
  delay = 0, 
  duration = 4, 
  className = "",
  scale = 1 
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute ${className}`}
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

const Gbander = ({ images, casqIcon, t }) => {
  // Fonction de traduction par défaut
  const translate = t || ((key) => {
    const translations = {
      'gpsT.BanderTitle': "Plus d'informations sur notre chaîne",
      'gpsT.BanderTitle2': "Youtube",
      'gpsT.BanderDescription': "Plateforme de suivi de véhicule en temps réel avec géolocalisation avancée",
      'gpsT.BanderButton': "En savoir plus"
    };
    return translations[key] || key;
  });

  // Images par défaut
  const defaultImages = {
    loc1: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=300&h=300&fit=crop",
    ordi1: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop",
    loc2: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=300&h=300&fit=crop",
    phonegps: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop"
  };

  const bannerImages = images || defaultImages;
 
  return (
    <div className='w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 flex items-center justify-center'>
      <div 
        style={{ backgroundColor: '#40414F' }} 
        className='rounded-xl  sm:rounded-2xl relative w-full max-w-7xl overflow-hidden'
      >
        {/* Container responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 relative">
          
          {/* Section Contenu Texte */}
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 lg:col-span-1">
            
            {/* Engrenage décoratif - Responsive positioning */}
            <div className="absolute -left-4 sm:-left-8 md:-left-12 lg:-left-16 top-4 sm:top-6 md:top-8 z-10">
              <motion.img 
                src={casqIcon}
                alt="engrenage" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 scale-x-[-1]" 
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

            {/* Titre */}
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight'>
              <span style={{color: MY_COLORS.secondaryGreen}}>
                {translate('gpsT.BanderTitle')}
              </span>
              <br className="hidden sm:block" />
              {' '}{translate('gpsT.BanderTitle2')}
            </h1>

            {/* Description */}
            <p className="text-white text-sm sm:text-base leading-relaxed mt-4 sm:mt-6 md:mt-8 max-w-md">
              {translate('gpsT.BanderDescription')}
            </p>

            {/* Bouton CTA */}
            <motion.button 
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white rounded-full font-bold transition-all mt-6 sm:mt-8 md:mt-10 self-start text-sm sm:text-base"
              style={{ color: MY_COLORS.black }}
              whileHover={{
                backgroundColor: MY_COLORS.secondaryGreen,
                color: MY_COLORS.white,
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              {translate('gpsT.BanderButton')}
            </motion.button>
          </div>

          {/* Section Images Flottantes - Responsive */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] lg:col-span-2 overflow-visible px-4 py-8 lg:px-0 lg:py-0">
            
            {/* Layout responsive des images */}
            <div className="relative w-full h-full">
              
              {/* Pin de localisation 1 - Arrière-plan droite */}
              {bannerImages?.loc1 && (
                <FloatingImage
                  src={bannerImages.loc1}
                  alt="Location Pin 1"
                  delay={0}
                  duration={5.5}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32
                             right-[5%] sm:right-[8%] md:right-[10%] lg:right-[15%]
                             top-[5%] sm:top-[8%] md:top-[10%]
                             z-10"
                />
              )}

              {/* Ordinateur - Élément central principal */}
              {bannerImages?.ordi1 && (
                <FloatingImage
                  src={bannerImages.ordi1}
                  alt="Ordinateur Dashboard"
                  delay={0.3}
                  duration={4.8}
                  className="w-48 h-32 sm:w-56 sm:h-40 md:w-72 md:h-48 lg:w-96 lg:h-64
                             left-[10%] sm:left-[12%] md:left-[15%] lg:left-[18%]
                             top-[15%] sm:top-[18%] md:top-[20%]
                             z-20 object-contain"
                />
              )}

              {/* Pin de localisation 2 - Bas gauche */}
              {bannerImages?.loc2 && (
                <FloatingImage
                  src={bannerImages.loc2}
                  alt="Location Pin 2"
                  delay={0.9}
                  duration={4.3}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36
                             left-[8%] sm:left-[10%] md:left-[12%] lg:left-[15%]
                             bottom-[10%] sm:bottom-[12%] md:bottom-[15%]
                             z-30"
                />
              )}

              {/* Smartphone GPS - Premier plan droite */}
              {bannerImages?.phonegps && (
                <FloatingImage
                  src={bannerImages.phonegps}
                  alt="Smartphone GPS"
                  delay={0.6}
                  duration={4.0}
                  className="w-20 h-32 sm:w-24 sm:h-40 md:w-28 md:h-48 lg:w-32 lg:h-56
                             right-[15%] sm:right-[18%] md:right-[20%] lg:right-[22%]
                             bottom-[15%] sm:bottom-[18%] md:bottom-[20%]
                             z-40 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Gbander;