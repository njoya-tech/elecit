import React from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors";

const SavCards = () => {
  const { t } = useTranslation();

  const cards = t("sav.cards.items", { returnObjects: true });

  return (
    <section
      className="w-full py-16"
      style={{ backgroundColor: MY_COLORS.white }}
      aria-labelledby="services-heading"
    >
      {/* TOP SECTION */}
      <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {/* Helmet Icon */}
          <div className="shrink-0">
            <motion.img
              src={ICONS.Casque}
              alt="Casque de chantier"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </div>

          {/* Title & Description */}
          <div className="flex-1 text-center md:text-left">
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl sm:text-center md:text-4xl
               lg:text-5xl font-bold mb-4 lg:mr-50"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t("sav.cards.heading")}
            </h2>
            <p
              className="text-sm sm:text-center md:text-lg
             text-gray-900 leading-relaxed max-w-3xl mx-auto md:mx-0"
            >
              {t("sav.cards.description")}
            </p>
          </div>
        </div>
      </div>

      {/* BANNER IMAGE */}
      <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 mb-16">
        <div
          className="w-full h-[180px] sm:h-[200px] md:h-[280px] 
        relative overflow-hidden rounded-2xl shadow-xl"
        >
          <img
            src={IMAGES.IMG8}
            alt="Vue d'ensemble d'un chantier de construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        {/* Decorative Gears */}
        <img
          src={ICONS.Engrenage_plan}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -right-12 bottom-2 z-0 w-32 lg:w-48 opacity-100 pointer-events-none"
          style={{
            animation: "spin 8s linear infinite reverse",
            willChange: "transform",
          }}
        />
        <img
          src={ICONS.Engrenage_plan}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-5 -bottom-12 z-0 w-20 lg:w-24 opacity-100 pointer-events-none"
          style={{
            animation: "spin 8s linear infinite reverse",
            willChange: "transform",
          }}
        />

        {/* Cards Grid */}
        <div className="relative -mt-10 sm:-mt-24 md:-mt-22 z-10">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 
    sm:gap-4 lg:gap-12 gap-y-16 sm:gap-y-20 md:gap-y-24"
          >
            {cards.map((card, index) => (
              <div key={index} className="relative flex justify-center">
                {/* Icon Badge */}
                <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 
              md:w-16 md:h-16 rounded-full flex items-center 
              justify-center shadow-lg transition-transform 
              hover:scale-110 duration-300"
                    style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                    aria-hidden="true"
                  >
                    <img
                      src={ICONS.laptop}
                      alt=""
                      className="w-6 h-6 sm:w-8 
                sm:h-8 md:w-10 
                md:h-10 brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Card - Reduced size */}
                <article
                  className="mt-4 md:mt-0 bg-white rounded-2xl shadow-2xl w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] p-4 sm:p-5 md:p-6 pt-8 md:pt-10 text-center transition-all duration-300 hover:-translate-y-2"
                  style={{
                    boxShadow:
                      "0 20px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)", // Enhanced default shadow
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 30px 60px rgba(0, 0, 0, 0.25), 0 15px 30px rgba(0, 0, 0, 0.15)"; // Stronger hover shadow
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)"; // Back to default
                  }}
                >
                  <header className="mb-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {card.title}
                    </h3>
                    <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900">
                      {card.subtitle}
                    </h4>
                  </header>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center">
                    {card.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavCards;
