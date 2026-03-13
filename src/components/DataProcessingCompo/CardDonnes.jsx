/* eslint-disable no-unused-vars */
import React from "react";
import { ICONS, IMAGES } from "../../assets/assets";
import { MY_COLORS } from "../../constants/colors";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ControlCards = () => {
  const { t } = useTranslation();
  const services = t("controlAccess.services.items", { returnObjects: true });

  // Define icon mapping for each service (in order)
  const serviceIcons = [
    ICONS.collect_et_nettoyage_icon,
    ICONS.StorageDB_icon,
    ICONS.Donnes_icon,
    ICONS.business_intel_icon,
    ICONS.Datascience_icon,
  ];

  // Check if services is loaded
  if (!services || !Array.isArray(services) || services.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-gray-600">Loading services...</p>
      </div>
    );
  }

  // Combine all cards including the image at position 3 (after first 2 services)
  const allCards = [
    ...services.slice(0, 2),
    { type: "image", src: IMAGES.IMG27 },
    ...services.slice(2),
  ];

  // Animation variants
  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
    <>
      {/* HEADER WITH BLACK BACKGROUND + formTech */}
      <motion.header
        className="w-full bg-slate-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideDown}
      >
        <div
          className="relative w-full mb-8 overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <h2
            className="relative text-2xl sm:text-3xl md:text-2xl lg:text-3xl 
                  font-bold px-4 sm:px-6 md:px-8 py-6 md:py-8 text-center sm:text-right"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            {t("controlAccess.header.title")}
          </h2>
          <div className="absolute -top-10 left-0 w-1/3 h-full opacity-100 scale-125 hidden sm:block">
            <img src={ICONS.formTech} alt="" aria-hidden="true" />
          </div>
        </div>
      </motion.header>

      {/* MAIN WHITE SECTION */}
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
            {/* HELMET TOP-LEFT */}
            <div className="absolute -left-20 top-0 hidden lg:block">
              <motion.img
                src={ICONS.Casque}
                alt=""
                aria-hidden="true"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
                style={{
                  top: "-20px",
                  left: "10px",
                }}
                animate={{
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Description */}
            <p
              style={{ color: MY_COLORS.black }}
              className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-8 px-2"
            >
              {t("controlAccess.services.description")}
            </p>
          </motion.div>

          {/* GRID + DOTTED LINES */}
          <div className="relative">
            {/* HORIZONTAL DOTTED LINE */}
            <div
              className="absolute left-0 right-0 hidden lg:block"
              style={{
                top: "48%",
                borderTop: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />

            {/* VERTICAL DOTTED LINES */}
            <div
              className="hidden lg:block absolute top-0 bottom-0"
              style={{
                left: "33.333%",
                borderLeft: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />
            <div
              className="hidden lg:block absolute top-0 bottom-0"
              style={{
                left: "66.666%",
                borderLeft: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />

            {/* UNIFIED GRID FOR ALL CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 relative z-10">
              {allCards.map((card, index) => {
                // Handle image card
                if (card.type === "image") {
                  return (
                    <motion.div
                      key={`image-${index}`}
                      className="relative rounded-lg sm:rounded-xl shadow-lg bg-white border border-gray-100 overflow-hidden h-64 md:h-72"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                    >
                      <img
                        src={card.src}
                        alt="Contrôle & sécurité"
                        className="w-full h-full object-cover object-bottom"
                      />
                    </motion.div>
                  );
                }

                // Calculate service index (accounting for image card)
                const serviceIndex = index < 2 ? index : index - 1;

                // Handle service cards
                return (
                  <motion.div
                    key={`service-${index}`}
                    className={`relative pt-8 sm:pt-10 p-5 sm:p-6 rounded-lg sm:rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-64 md:h-72 ${
                      index >= 3 ? "mt-8 sm:mt-12 md:mt-16 lg:mt-10" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                  >
                    {/* BADGE */}
                    <motion.div
                      className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={badgeVariants}
                    >
                      <img
                        src={serviceIcons[serviceIndex] || ICONS.badge}
                        alt={`${card.title} icon`}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                      />
                    </motion.div>

                    {/* TEXT CONTENT */}
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
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes rotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ControlCards;