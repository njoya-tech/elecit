import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../utils/colors";
import CTAButton from "../CTA/CTAButton";
import { useTranslation } from "react-i18next";

const ControlHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <img
        src={HERO.security}
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
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 text-white">
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t("control.hero.title")}
          </span>
        </h1>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 max-w-3xl">
          {t("control.hero.description")}
        </p>

        <CTAButton onClick={() => alert("Video clicked!")}>
          {t("control.hero.button")}
        </CTAButton>

      </div>
    </section>
  );
};

export default ControlHero;
