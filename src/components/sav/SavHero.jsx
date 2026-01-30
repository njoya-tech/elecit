/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { ICONS, HERO } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";
import CTAButton from "../CTA/CTAButton.jsx";
import { motion } from "framer-motion";

const SavHero = () => {
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
      className="relative w-full overflow-hidden min-h-[500px] "
      style={{ height: "65vh" }}
    >
      {/* Background Image */}
      <motion.img
        src={HERO.sav}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* DARK GRADIENT OVERLAY */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* TECH PATTERN - Hidden on mobile for performance */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{
          top: "10%",
        }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <motion.h1
          className="font-extrabold text-2xl 
          sm:text-3xl md:text-4xl lg:text-4xl
           xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
          style={{
            color: MY_COLORS.secondaryGreen,
          }}
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          {t("sav.hero.title")}
        </motion.h1>

        <motion.h2
          className="text-white text-sm sm:text-base 
          md:text-lg lg:text-lg xl:text-xl tracking-wide 
          lowercase font-bold mb-4 sm:mb-6 lg:mb-0 px-4 max-w-xs
           sm:max-w-md md:max-w-2xl lg:max-w-4xl "
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t("sav.hero.subtitle")}
        </motion.h2>

        {/* CTA + Arrow */}
        <motion.div
          className="flex items-center gap-4 p-0 mt-10 lg:mt-10 
        ml-14 md:ml-10 lg:ml-20"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <CTAButton
            onClick={() => {
              const newWindow = window.open(
                "https://www.linkedin.com/feed/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BhAVhkhC6QtqbEDkj4wBM1g%3D%3D",
                "_blank",
              );
              if (newWindow) newWindow.opener = null;
            }}
          >
            {t("sav.hero.button")}
          </CTAButton>

          <motion.img
            src={ICONS.flech_icon}
            alt="Arrow"
            className="w-10 sm:w-22 opacity-100 origin-top"
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

export default SavHero;