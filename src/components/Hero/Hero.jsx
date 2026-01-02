import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton.jsx";
import { MY_COLORS } from "../../constants/colors.js";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "70vh" }}
    >
      {/* Background Image */}
      <img
        src={HERO.entreprise}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* TECH PATTERN - Hidden on mobile for performance */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <h1
          className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl
           xl:text-7xl leading-tight mb-3 sm:mb-4 md:mb-6"
          style={{ color: MY_COLORS.white }}
        >
          {t('entreprise.hero.title')} <br className="hidden md:block" />
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t('entreprise.hero.titleHighlight')}
          </span>
        </h1>

        <h3
          style={{ color: MY_COLORS.secondaryGreen }}
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide uppercase font-bold mb-4 sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
        >
          {t('entreprise.hero.subtitle')}
        </h3>

        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl">
          {t('entreprise.hero.description')}
        </p>

        <CTAButton onClick={() => alert("Video clicked!")}>
          {t('entreprise.hero.button')}
        </CTAButton>
      </div>
    </section>
  );
};

export default Hero;