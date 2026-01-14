import React from "react";
import { useTranslation } from "react-i18next";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton.jsx";

const SavGreenCards = () => {
  const { t } = useTranslation();

  const services = t('sav.greenCards.services', { returnObjects: true });

  return (
    <>
      <section className="w-full bg-white pt-0 pb-16 px-2 overflow-hidden">
        {/* ============================================ */}
        {/* HEADER SECTION                              */}
        {/* ============================================ */}
        <div
          className="relative w-full mb-8 overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <h2
            className="relative text-lg sm:text-2xl md:text-4xl lg:text-5xl 
          font-bold px-4 sm:px-8 py-6 md:py-8 text-right z-10"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            {t('sav.greenCards.heading')}
          </h2>
          <div
            className="absolute -top-1 -left-20 w-3/4 sm:w-1/5
           md:w-3/4  md:-left-50 md:scale-125 lg:scale-130 lg:w-2/3 h-full opacity-100"
          >
            <img
              src={ICONS.formTech}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* SUBTITLE WITH DECORATIVE GEAR               */}
        {/* ============================================ */}
        <div className="relative text-center mb-12 md:mb-20 px-4">
          {/* DECORATIVE GEAR - Top left (Desktop only) */}
          <div className="absolute left-0 top-0 hidden xl:block pointer-events-none">
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className="w-32 h-32 xl:w-40 xl:h-40 opacity-100 animate-spin"
              style={{
                animationDuration: "5s",
                animationTimingFunction: "linear",
              }}
            />
          </div>

          {/* SUBTITLE TEXT */}
          <p
            style={{ color: MY_COLORS.black }}
            className="text-slate-900 text-base 
            md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {t('sav.greenCards.subtitle')}
          </p>
        </div>

        {/* ============================================ */}
        {/* SERVICES GRID WITH DOTTED LINES             */}
        {/* ============================================ */}
        <div className="relative px-4 lg:px-8">
          {/* HORIZONTAL DOTTED LINE - Between rows (Desktop only) */}
          <div
            className="absolute left-0 right-0 hidden lg:block pointer-events-none"
            style={{
              top: "calc(52.5% + 2rem)",
              borderTop: "2px dashed #8CC63F",
              zIndex: 0,
            }}
          />

          {/* VERTICAL DOTTED LINES - Between columns (Desktop only) */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: "33.333%",
              borderLeft: "2px dashed #8CC63F",
              zIndex: 0,
            }}
          />
          <div
            className="hidden lg:block absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: "66.666%",
              borderLeft: "2px dashed #8CC63F",
              zIndex: 0,
            }}
          />

          {/* ============================================ */}
          {/* ALL 6 CARDS IN ONE GRID                    */}
          {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols */}
          {/* ============================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {/* CARD 1 - IMAGE */}
            <div className="flex justify-center items-center p-4">
              <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-sm">
                <img
                  src={IMAGES.IMG5}
                  alt="IT Services Illustration"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>

            {/* CARD 2 - White background */}
            <div className="relative pt-16 md:pt-20 p-6 rounded-xl 
            shadow-xl bg-white hover:shadow-2xl transition-shadow 
            duration-300 border border-gray-200">
              <div className="absolute -top-10 md:-top-12 left-1/2 
              transform -translate-x-1/2">
                <img
                  src={ICONS.laptop}
                  alt=""
                  className="w-20 h-20 md:w-24 md:h-24"
                />
              </div>

              <h3
                className="text-lg md:text-xl font-bold mb-3 text-center"
                style={{ color: MY_COLORS.black }}
              >
                {services[0].title}
              </h3>
              <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed">
                {services[0].description}
              </p>
            </div>

            {/* CARD 3 - Green background */}
            <div className="relative pt-16 md:pt-20 p-6 rounded-xl shadow-lg bg-[#7FA946] hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={ICONS.stockage}
                  alt=""
                  className="w-20 h-20 md:w-24 md:h-24"
                  style={{ filter: "brightness(0)" }}
                />
              </div>

              <h3
                className="text-lg md:text-xl font-bold mb-3 text-center"
                style={{ color: MY_COLORS.black }}
              >
                {services[1].title}
              </h3>
              <p className="text-black text-center text-sm md:text-base leading-relaxed">
                {services[1].description}
              </p>
            </div>

            {/* CARDS 4, 5, 6 - From services array */}
            {services.slice(2).map((service, index) => (
              <div
                key={index}
                className={`
                  relative pt-16 md:pt-20 p-6 rounded-xl shadow-lg lg:top-5
                  hover:shadow-xl transition-shadow duration-300 border border-gray-100
                  ${index === 1 ? "bg-[#7FA946]" : "bg-white"}
                `}
              >
                <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.badge}
                    alt=""
                    className={`
                      w-20 h-20 md:w-24 md:h-24
                      ${index === 1 ? "brightness-0" : ""}
                    `}
                  />
                </div>

                <h3
                  className="text-lg md:text-xl font-bold mb-3 text-center"
                  style={{ color: MY_COLORS.black }}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-center text-sm md:text-base leading-relaxed ${
                    index === 1 ? "text-black" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION WITH BACKGROUND                 */}
      {/* ============================================ */}
      <section className="hidden lg:block">
        <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0 md:top-10">
          <div className="w-full overflow-hidden" style={{ height: "440px" }}>
            <img
              src={ICONS.formePlan}
              className="w-full object-cover block"
              alt=""
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
            <img
              style={{
                top: "12em",
                width: "85%",
              }}
              src={ICONS.formTech}
              alt=""
              aria-hidden="true"
              className="absolute z-0 pointer-events-none opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em] w-[150%] md:w-full lg:w-[180%] h-auto"
            />

            <h3
              className="relative z-20 text-center text-2xl md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
              style={{ color: MY_COLORS.white, top: "24%" }}
            >
              {t('sav.greenCards.cta.title')} <br />
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                {t('sav.greenCards.cta.titleHighlight')}
              </span>
            </h3>

            <p className="text-center md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mt-15">
              {t('sav.greenCards.cta.subtitle')}
            </p>

            <CTAButton
              className="absolute top-10 md:top-2 md:w-70"
              onClick={() => alert("Video clicked!")}
            >
              {t('sav.greenCards.cta.button')}
            </CTAButton>
          </div>

          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40 animate-spin"
            style={{
              animationDuration:"4s",
              top: "65%",
              right: "1%",
            }}
            aria-hidden="true"
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="absolute w-24 h-24 md:w-16 md:h-16 lg:w-16 lg:h-16 z-40"
            style={{
              animation: "rotateClockwise 20s linear infinite",
              top: "23%",
              left: "10%",
            }}
            aria-hidden="true"
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SavGreenCards;