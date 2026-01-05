/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ICONS, OBJECTS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";

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

  const cards = t('control.cards.items', { returnObjects: true });

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
          {t('control.cards.heading')}
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
        {t('control.cards.subtitle')}
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
              {/* Green Card with Carousel */}
              <div
                className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 
                shadow-lg mb-4 sm:mb-5 md:mb-6 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${MY_COLORS.secondaryGreen} 0%, ${MY_COLORS.green} 100%)`,
                }}
              >
                <div
                  className="w-[160px] sm:w-[180px] md:w-[200px] 
                  lg:w-[220px] xl:w-[250px] h-[160px] sm:h-[180px] md:h-[200px] 
                  lg:h-[220px] xl:h-[250px] flex items-center justify-center
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
                {t('control.cards.featured.title')}
              </h3>

              {/* Black Button */}
              <button
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full
                font-semibold text-sm sm:text-base transition-opacity 
                hover:opacity-90 flex items-center justify-center mx-auto gap-2"
                style={{
                  backgroundColor: MY_COLORS.black,
                  color: MY_COLORS.white,
                }}
              >
                {t('control.cards.featured.button')}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
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

              {cards.map((card, index) => {
                const isTopRow = index < 2;

                return (
                  <div
                    key={index}
                    className="relative rounded-lg 
                    sm:rounded-xl p-4 
                    sm:p-5 md:p-6 pt-10
                    sm:pt-12 shadow-lg hover:shadow-xl
                     transition-shadow z-10"
                    style={{
                      backgroundColor: MY_COLORS.white,
                      border: `1px solid #e5e7eb`,
                      transform:
                        window.innerWidth >= 1024
                          ? isTopRow
                            ? "translateY(-10px)"
                            : "translateY(10px)"
                          : "none",
                    }}
                  >
                    {/* Badge Icon */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-24 
                      sm:w-28 h-16 sm:h-20 flex items-center justify-center"
                      style={{
                        top: "-38px",
                      }}
                    >
                      <img
                        src={[ICONS.badge, ICONS.stockage, ICONS.securite_icon, ICONS.decision_icon][index]}
                        alt={card.title}
                        className="w-14 h-20 sm:w-16 sm:h-24 object-contain"
                        style={{
                          filter: `brightness(0) saturate(100%) invert(56%) sepia(18%) saturate(1367%) hue-rotate(34deg) brightness(91%) contrast(87%)`,
                        }}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col items-center text-center">
                      <h3
                        className="text-base sm:text-lg md:text-xl font-bold 
                        mb-3 sm:mb-4 md:mb-4 leading-snug"
                        style={{ color: MY_COLORS.black }}
                      >
                        {card.title}
                      </h3>
                      <div
                        className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm 
                        md:text-base text-slate-950"
                        style={{ color: "#6b7280" }}
                      >
                        {card.features.map((feature, idx) => (
                          <p key={idx} className="leading-relaxed">
                            {feature}
                            {idx < card.features.length - 1 && "/"}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative Helmet Icon (Desktop Only) */}
            <div
              className="hidden xl:block absolute -right-54 top-1/2 
            -translate-y-1/2 z-0"
            >
              <img
                src={ICONS.Casque}
                alt="Helmet decoration"
                className="w-36 h-36 opacity-100 animate-bounce"
                style={{
                  animationDuration: "4s",
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