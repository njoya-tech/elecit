import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton.jsx";
import { MY_COLORS } from "../../constants/colors.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

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
        src={HERO.entreprise}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full
         object-cover object-center md:object-top"
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
        style={{ top: "10%" }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div
        className="absolute inset-0 flex flex-col items-center 
      justify-center px-4 sm:px-6 md:px-12 
      lg:px-16 text-center z-20"
      >
        <motion.h1
          className="font-extrabold text-3xl 
  sm:text-4xl md:text-4xl lg:text-5xl
   xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
          style={{ color: MY_COLORS.white }}
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          {t("entreprise.hero.title")}{" "}
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t("entreprise.hero.titleHighlight")}
          </span>{" "}
          ?
        </motion.h1>

        <motion.h3
          style={{ color: MY_COLORS.secondaryGreen }}
          className="text-white text-sm sm:text-base md:text-lg 
          lg:text-xl xl:text-2xl tracking-wide uppercase font-bold mb-4 sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl
           lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideDown}
          transition={{ delay: 0.1 }}
        >
          {t("entreprise.hero.subtitle")}
        </motion.h3>

        <motion.p
          className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t("entreprise.hero.descriptionLine1")}
          <br />
          {t("entreprise.hero.descriptionLine2")}
        </motion.p>

        {/* CTA + Arrow */}
        <motion.div
          className="flex items-center gap-4 ml-18 sm:ml-4 md:ml-8 lg:ml-22"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <CTAButton onClick={() => setShowVideo(true)}>
            {t("entreprise.hero.button")}
          </CTAButton>

          {showVideo && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setShowVideo(false)}
            >
              {/* Video Container */}
              <div
                className="relative w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
               >
                {/* Close Button */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-2 right-2 text-white text-3xl z-10"
                 >
                  &times;
                </button>

                <iframe
                  src="https://www.youtube.com/embed/z757oh3KTYM?autoplay=1"
                  title="YouTube video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          <motion.img
            src={ICONS.flech_icon}
            alt="Arrow"
            className="w-10 sm:w-12 opacity-100 origin-top"
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

export default Hero;