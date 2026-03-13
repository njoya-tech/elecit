import React from "react";
import { useTranslation } from 'react-i18next';
import { ICONS, HERO } from "../../assets/assets.js";
import { MY_COLORS } from "../../constants/colors.js";
import { motion } from "framer-motion";


const BlogHero = () => {
  const { t } = useTranslation();

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
  
  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "65vh" }}
    >
      {/* Background Image */}
      <img
        src={HERO.blog}
        alt="Blog Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
      />
      
      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
      
      {/* TECH PATTERN - Hidden on mobile for performance */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center
       justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <motion.h1
          className="font-extrabold text-3xl sm:text-4xl
           md:text-5xl lg:text-6xl xl:text-5xl 
           leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
           
          style={{ color: MY_COLORS.white }}
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t('blogPage.hero.title')}
          </span>
        </motion.h1>

        <motion.h3
          style={{ color: MY_COLORS.white }}
          className="text-white text-sm sm:text-base md:text-lg 
          lg:text-lg xl:text-2xl tracking-wide uppercase font-extrabold mb-4 
          sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t('blogPage.hero.subtitle')}
        </motion.h3>

        <p className="text-white text-sm sm:text-base
         md:text-lg leading-relaxed mb-6 max-w-xs 
         sm:max-w-md md:max-w-2xl lg:max-w-4xl">
          {t('blogPage.hero.description1')} {t('blogPage.hero.description2')} {t('blogPage.hero.description3')}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;