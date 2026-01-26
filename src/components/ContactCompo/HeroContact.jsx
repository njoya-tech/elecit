/* eslint-disable no-unused-vars */
import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HeroContact = () => {
  const { t } = useTranslation();

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

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "65vh" }}
    >
      {/* Background Image */}
      <motion.img
        src={HERO.contact}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* DARK GRADIENT OVERLAY */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b
       from-black/70 via-black/50 to-black/80"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* TECH PATTERN */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <motion.h1
          className="font-extrabold text-2xl sm:text-3xl md:text-4xl 
            lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
          style={{ color: MY_COLORS.primaryBlue }}
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          {t("contact.hero.title")}
        </motion.h1>

        <motion.h2
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl 
          xl:text-2xl tracking-wide uppercase font-bold mb-4 sm:mb-6 
          px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t("contact.hero.subtitle")}
        </motion.h2>

        <motion.div
          className="flex items-center gap-4 lg:mt-10 ml-30"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <button
            className="relative z-20 px-6 sm:px-8 md:px-10 
          py-2.5 sm:py-3 md:py-3.5 rounded-full 
          border-2 transition-all duration-300 font-semibold 
          text-sm sm:text-base md:text-lg hover:scale-105 
          active:scale-95 mt-6 whitespace-nowrap lg:mt-0 -ml-10 md:ml-10 lg:ml-20"
            style={{
              borderColor: MY_COLORS.primaryBlue,
              color: MY_COLORS.primaryBlue,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue;
              e.currentTarget.style.color = MY_COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = MY_COLORS.primaryBlue;
            }}
          >
            {t("contact.hero.button")}
          </button>

          <motion.img
            src={ICONS.flech_icon}
            alt="Arrow"
            className="w-10 sm:w-22 opacity-100 origin-top brightness-0 invert"  
            animate={{
              rotate: [-15, 15, -15],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroContact;