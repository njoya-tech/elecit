/* eslint-disable no-unused-vars */
import React from "react";
import { ICONS, IMAGES } from "../../assets/assets";
import { MY_COLORS } from "../../constants/colors.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CardInfo = () => {
  const { t } = useTranslation();
  const services = t("dataProcessing.services.items", { returnObjects: true });

  // Define icon mapping for each service (in order)
  const serviceIcons = [
    ICONS.Gestion_IT_icon,
    ICONS.business_intel_icon,
    ICONS.badge,
    ICONS.Virtualisation_icon,
    ICONS.Developement_icon,
  ];

  // Combine all cards including the image to make 6 cards
  const allCards = [{ type: "image", src: IMAGES.IMG35 }, ...services];

  // Animation variants
  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // All cards animate together
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0,
      }
    }
  };

  // All badges animate together after cards
  const badgeVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4,
      }
    }
  };

  // All text animates together after badges
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.7,
      }
    }
  };

  return (
    <div className="w-full bg-white pt-0 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <motion.div
          className="relative text-center mb-12 sm:mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideDown}
        >
          {/* DECORATIVE GEARS - Desktop Only */}
          <div className="absolute right-0 top-0 hidden lg:block">
            {/* Large Gear */}
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className="relative w-32 h-32 xl:w-40 xl:h-40 opacity-100"
              style={{
                top: "-30px",
                left: "30px",
                animation: "rotateClockwise 5s linear infinite",
              }}
            />
            {/* Small Gear */}
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className="relative w-20 h-20 xl:w-24 xl:h-24 opacity-100"
              style={{
                top: "-100px",
                left: "-20px",
                animation: "rotateClockwise 5s linear infinite",
              }}
            />
          </div>

          {/* TITLE */}
          <h2
            style={{ color: MY_COLORS.secondaryGreen }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 px-2"
          >
            {t("dataProcessing.services.title")}
          </h2>

          {/* SUBTITLE */}
          <p
            style={{ color: MY_COLORS.black }}
            className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2"
          >
            {t("dataProcessing.services.description")}
          </p>
        </motion.div>

        {/* CARDS GRID */}
        <div className="relative">
          {/* HORIZONTAL DOTTED LINE */}
          <div
            className="absolute left-0 right-0 hidden lg:block"
            style={{ top: "48%", borderTop: "2px dashed #8CC63F" }}
          />

          {/* VERTICAL DOTTED LINES */}
          <div
            className="hidden lg:block absolute top-0 bottom-0"
            style={{ left: "33.333%", borderLeft: "2px dashed #8CC63F" }}
          />
          <div
            className="hidden lg:block absolute top-0 bottom-0"
            style={{ left: "66.666%", borderLeft: "2px dashed #8CC63F" }}
          />

          {/* GRID: 2 columns for tablet, 1 for mobile, 3 for desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-2 lg:grid-cols-3 gap-6 
          sm:gap-8 mb-6 sm:mb-8 relative z-10">
            {allCards.map((card, index) => {
              if (card.type === "image") {
                return (
                  <motion.div
                    key={index}
                    className={`relative rounded-lg sm:rounded-xl shadow-lg
                       bg-white border border-gray-100 overflow-hidden h-64 md:h-72 ${
                      index >= 3 ? "mt-8 sm:mt-12 md:mt-16 lg:mt-20" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    <img
                      src={card.src}
                      alt="Illustration"
                      className="w-full h-full object-cover object-bottom"
                    />
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={index}
                    className={`relative pt-8 sm:pt-10 p-5 sm:p-6 rounded-lg sm:rounded-xl 
                      shadow-lg bg-white hover:shadow-xl 
                    transition-shadow duration-300 border border-gray-100 h-64 md:h-72 ${
                      index >= 3 ? "mt-8 sm:mt-12 md:mt-16 lg:mt-10" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    {/* BADGE - Separate animation */}
                    <motion.div
                      className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={badgeVariants}
                    >
                      <img
                        src={serviceIcons[index - 1] || ICONS.Gestion_IT_icon}
                        alt={`${card.title} icon`}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                      />
                    </motion.div>

                    {/* TEXT CONTENT - Separate animation */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={textVariants}
                    >
                      <h3
                        className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center mt-4"
                        style={{ color: MY_COLORS.black }}
                      >
                        {card.title}
                      </h3>

                      <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* ROTATION ANIMATION */}
      <style>{`
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CardInfo;