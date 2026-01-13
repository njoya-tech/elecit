import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../utils/colors";
import CTAButton from "../CTA/CTAButton";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const ControlHero = () => {
  const { t } = useTranslation();
  const[showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative w-full h-[65vh] 
    sm:h-[70vh] md:h-[75vh] lg:h-[55vh] 
    flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <img
        src={HERO.control}
        alt={t("control.hero.title")}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Angled Black PNG Mask */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full max-h-[420px] object-cover pointer-events-none"
      />

      {/* TECH PATTERN */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[120%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6
       md:px-12 lg:px-16 flex flex-col 
       items-center justify-center">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl 
        lg:text-6xl xl:text-5xl
         font-extrabold mb-10 mt-30 text-white">


          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t("control.hero.title")}
          </span>
        </h1>

        <p className="text-white text-sm
         sm:text-base md:text-lg lg:text-lg xl:text-xl 
         leading-relaxed mb-6 max-w-3xl">
          {t("control.hero.description")}
        </p>

         {/* CTA + Arrow */}
        <div className="flex items-center gap-4 lg:mt-0 ml-20">
          <CTAButton onClick={() => setShowVideo(true)}>
            {t("entreprise.hero.button")}
          </CTAButton>

          {showVideo && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setShowVideo(false)} // Click outside closes the video
            >
              {/* Video Container */}
              <div
                className="relative w-[90%] max-w-3xl aspect-video
                 bg-black rounded-xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-2 right-2 text-white text-3xl z-10"
                >
                  &times;
                </button>

                <iframe
               src="https://www.youtube.com/embed/geUNzc0cVuY?autoplay=1" 
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
        </div>

      </div>
    </section>
  );
};

export default ControlHero;
