/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import { motion } from "framer-motion";

const BureauCards = () => {
  const { t } = useTranslation();

  const cards = t("bureau.cards.items", { returnObjects: true });

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
    <section
      className="w-full py-8 md:py-12 lg:py-16"
      style={{ backgroundColor: MY_COLORS.white }}
      aria-labelledby="services-heading"
    >
      {/* TOP SECTION - Helmet + Title + Description */}
      <motion.div
        className="max-w-[1200px] mx-auto lg:mr-36 px-4 sm:px-6 mb-8 md:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideDown}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Helmet Icon */}
          <div className="shrink-0">
            <motion.img
              src={ICONS.Casque}
              alt="Casque de chantier"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 -scale-x-100"
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

          {/* Title and Description */}
          <div className="flex-1 w-full">
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 md:-mt-10 text-center"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t("bureau.cards.heading")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-900 leading-relaxed text-center max-w-3xl mx-auto px-2">
              {t("bureau.cards.description")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* BANNER IMAGE */}
      <motion.div
        className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-12 md:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideDown}
      >
        <div
          className="w-full h-[180px] sm:h-[200px] md:h-[280px] relative 
        overflow-hidden rounded-xl md:rounded-2xl shadow-xl"
        >
          <img
            src={IMAGES.IMG8}
            alt="Vue d'ensemble d'un chantier de construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* CARDS SECTION */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        {/* Decorative Gear - Bottom Right (Desktop only) */}
        <img
          src={ICONS.Engrenage_plan}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -right-5 top-68 
          z-0 w-32 opacity-100 pointer-events-none"
          style={{
            animation: "spin 8s linear infinite reverse",
            willChange: "transform",
          }}
        />

        {/* Cards Grid - Overlapping Banner */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-32 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3
           gap-6 md:gap-8 lg:gap-10 justify-items-center">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative flex justify-center w-full max-w-xs"
              >
                {/* Number Badge */}
                <motion.div
                  className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={badgeVariants}
                >
                  <div
                    className="w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16
                     rounded-full flex items-center justify-center shadow-lg 
                     transition-transform hover:scale-110 duration-300"

                    style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                    aria-hidden="true"
                  >
                    <span className="text-white text-2xl sm:text-3xl
                     md:text-3xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                </motion.div>

                {/* Card */}
                <motion.article
                  className="mt-4 md:mt-0 bg-white rounded-xl md:rounded-2xl shadow-lg w-full 
                p-5 sm:p-6 md:p-8 pt-9 sm:pt-10 md:pt-12 text-center hover:shadow-xl 
                transition-all duration-300 hover:-translate-y-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={textVariants}
                  >
                    <header className="mb-3 md:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                        {card.title}
                      </h3>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {card.subtitle}
                      </h4>
                    </header>
                    <p className="text-xs sm:text-sm text-slate-900 leading-relaxed text-center">
                      {card.description}
                    </p>
                  </motion.div>
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT SHOWCASE SECTION */}
      <motion.div
        className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-16 md:mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideDown}
      >
        <div className="relative h-[250px] sm:h-[350px] md:h-[380px] 
        rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">

          {/* Background Image */}
          <img
            src={IMAGES.IMG0}
            alt="Chantier de construction d'un hangar"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div
            className="relative z-10 h-full flex flex-col 
          justify-center px-6 sm:px-8 md:px-16 max-w-3xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl 
            lg:text-4xl font-bold mb-4 
            sm:mb-6 md:mb-8 lg:-mt-5 text-start">

              <span style={{ color: MY_COLORS.secondaryGreen }}>
                {t("bureau.cards.project.title")}
              </span>{" "}
              <span className="text-white">
                {t("bureau.cards.project.subtitle")}
              </span>
            </h2>

            <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-2xl">
              {t("bureau.cards.project.description")}
            </p>

            <div>
              <button
                className="bg-white text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    MY_COLORS.secondaryGreen;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#0f172a";
                }}
                onClick={() => alert("Navigate to projects")}
              >
                {t("bureau.cards.project.button")}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BureauCards;