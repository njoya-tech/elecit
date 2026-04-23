/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projet1, fi } from '../../assets';
import { MY_COLORS } from '../../utils/colors';
import { motion } from 'framer-motion';
import { getFileUrl } from '../../services/api/directus';

const HeroSection = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.5 }
    }
  };

  const handleOpenAndDownload = async () => {
    const fileId = '7b508958-b13a-4f90-bae2-896bf3842c77';
    const pdfUrl = getFileUrl(fileId);

    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
    } catch (error) {
      console.error('Erreur lors du chargement du PDF:', error);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "65vh" }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${projet1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* Dark Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* Centered Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">

        {/* Titre */}
        <motion.h1
          className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
          style={{ color: MY_COLORS.secondaryGreen }}
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          {t('projet.title')}
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide font-medium leading-relaxed mb-4 sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t('projet.subtitle')}
        </motion.p>

        {/* Bouton + Flèche */}
        <motion.div
          className="flex items-center gap-4 lg:mt-10"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <button
            className="relative z-20 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-full border-2 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 mt-6 whitespace-nowrap lg:mt-0"
            style={{
              borderColor: MY_COLORS.secondaryGreen,
              color: MY_COLORS.secondaryGreen,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
              e.currentTarget.style.color = MY_COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = MY_COLORS.secondaryGreen;
            }}
            onClick={handleOpenAndDownload}
          >
            {t('projet.buttonText')}
          </button>

          <motion.img
            src={fi}
            alt="Fleche"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain brightness-0 invert"
            animate={{
              x: [0, -12, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.3
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;