/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ICONS, OBJECTS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ControlCards = () => {
  const { t } = useTranslation();

  const carouselImages = [
    OBJECTS.obj_1,
    OBJECTS.obj_4,
    OBJECTS.obj_6,
    OBJECTS.obj_3,
  ];

  const slides = [carouselImages[carouselImages.length - 1], ...carouselImages];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const carouselRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev - 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(carouselImages.length);
      }, 500);
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex, carouselImages.length]);

  const cards = t("control.cards.items", { returnObjects: true });

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      {/* Section Header */}
      <div
        className="relative w-full mb-6 sm:mb-8 overflow-hidden"
        style={{ backgroundColor: MY_COLORS.black }}
      >
        <div
          className="absolute -top-6 
        sm:-top-8 md:-top-1 right-0 w-1/3 
        sm:w-1/4 h-full opacity-100 scale-110 
        sm:scale-125 md:scale-200"
        >
          <img
            src={ICONS.formTech}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h2
          className="relative text-2xl sm:text-3xl 
          md:text-4xl lg:text-5xl font-bold px-4
           sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 lg:py-8"
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          {t("control.cards.heading")}
        </h2>
      </div>

      {/* Subtitle */}
      <p
        className="text-center text-sm
        sm:text-base md:text-lg lg:text-xl mb-8
         sm:mb-10 md:mb-12 lg:mb-16 px-4 
         sm:px-6 max-w-4xl mx-auto leading-relaxed"
        style={{ color: MY_COLORS.black }}
      >
        {t("control.cards.subtitle")}
      </p>

      {/* Main Grid Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
          {/* Vertical Dotted Line Between Columns (Desktop Only) */}
          <div
            className="hidden lg:block absolute left-1/3 top-0 bottom-0 
            w-px border-l-2 border-dotted -translate-x-1/2 z-0"
            style={{
              borderColor: MY_COLORS.secondaryGreen,
            }}
          ></div>

          {/* Left Featured Card */}
          <div className="lg:col-span-1">
            <div
              className="h-full flex flex-col justify-between min-h-[400px] 
            sm:min-h-[450px] md:min-h-[500px]"
            >
              {/* Green Card with Carousel - UPDATED PADDING */}
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-8 lg:p-12 
                shadow-lg mb-4 sm:mb-5 md:mb-6 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${MY_COLORS.secondaryGreen} 0%, ${MY_COLORS.green} 100%)`,
                }}
              >
                <div
                  className="w-[140px] sm:w-40 md:w-[180px] 
                  lg:w-[200px] xl:w-[220px] h-[140px] sm:h-40 md:h-[180px] 
                  lg:h-[200px] xl:h-[220px] flex items-center justify-center
                   overflow-hidden relative"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full flex"
                    ref={carouselRef}
                    style={{
                      transition: transitionEnabled
                        ? "transform 0.5s ease-in-out"
                        : "none",
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {slides.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx}`}
                        className="w-full h-full object-cover shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Title Text */}
              <h3
                className="text-center font-bold text-base sm:text-lg 
                md:text-xl mb-3 sm:mb-4 px-2 sm:px-4 leading-snug"
                style={{ color: MY_COLORS.green }}
              >
                {t("control.cards.featured.title")}
              </h3>

              {/* Black Button */}
              <div className="relative mt-4 sm:mt-6 flex items-center justify-center gap-4 left-10">
                <button
                  className="px-6 sm:px-8 py-2 sm:py-3 rounded-full 
    text-sm sm:text-base font-semibold transition-all duration-300
    border-2"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = MY_COLORS.secondaryGreen;
                    e.currentTarget.style.borderColor =
                      MY_COLORS.secondaryGreen;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "black";
                  }}
                >
                  {t("control.cards.featured.button")}
                </button>

                <motion.img
                  src={ICONS.flech_icon}
                  alt="Arrow"
                  className="w-10 sm:w-22 opacity-100 origin-top"
                  style={{
                    position: "relative",
                    top: "28px",
                    right: "20px",
                  }}
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
          </div>

          {/* Right Cards Grid (2x2) */}
          <div className="lg:col-span-2 relative">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 
            sm:gap-5 md:gap-6 relative"
            >
              {/* Vertical Dotted Line (Tablet & Desktop) */}
              <div
                className="hidden sm:block absolute left-1/2 top-0 
                bottom-0 w-px border-l-2 border-dotted -translate-x-1/2 z-0"
                style={{ borderColor: MY_COLORS.secondaryGreen }}
              ></div>

              {/* Horizontal Dotted Line (Desktop Only) */}
              <div
                className="hidden lg:block absolute left-0 right-0 
                top-1/2 h-px border-t-2 border-dotted -translate-y-1/2 z-0"
                style={{ borderColor: MY_COLORS.secondaryGreen }}
              ></div>

              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`relative pt-8 sm:pt-10 p-4 sm:p-5 md:p-8 lg:p-12 
                  rounded-lg sm:rounded-xl shadow-lg 
                  bg-white hover:shadow-xl transition-shadow duration-300 
                  border border-gray-100 z-10 ${
                    index >= 2 ? "mt-8 sm:mt-12 md:mt-16 lg:mt-20" : ""
                  }`}
                >
                  {/* Badge Icon - UPDATED POSITIONING */}
                  <div className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={
                        [
                          ICONS.badge,
                          ICONS.stockage,
                          ICONS.securite_icon,
                          ICONS.decision_icon,
                        ][index]
                      }
                      alt={card.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col items-center text-center">
                    <h3
                      className="text-base sm:text-lg md:text-xl font-bold 
                      mb-2 sm:mb-3 text-center mt-4"
                      style={{ color: MY_COLORS.black }}
                    >
                      {card.title}
                    </h3>
                    <div className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                      {card.features.map((feature, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {feature}
                          {idx < card.features.length - 1 && " / "}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Helmet Icon (Desktop Only) - FIXED CLASS */}
            <div
              className="hidden xl:block absolute top-1/2 
            -translate-y-1/2 z-0"
              style={{ right: "-216px" }}
            >
              <motion.img
                src={ICONS.Casque}
                alt="Helmet decoration"
                className="w-36 h-36 opacity-100"
                animate={{
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCards;
