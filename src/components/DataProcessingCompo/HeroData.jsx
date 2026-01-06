import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";
import { MY_COLORS } from "../../constants/colors.js";
import { useTranslation } from "react-i18next";

const HeroData = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "75vh" }}
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <img
        src={HERO.dataProcessing}
        alt="Data Processing"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
      />

      {/* ================= DARK GRADIENT OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* ================= ANGLED MASK ================= */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="
          absolute bottom-0 left-0 w-full 
          max-h-[220px] sm:max-h-[280px] md:max-h-[340px] lg:max-h-[420px]
          object-cover pointer-events-none
        "
      />

      {/* ================= TECH PATTERN (SavHero logic) ================= */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="
          hidden sm:block absolute inset-0 m-auto
          w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%]
          max-w-[1400px]
          opacity-10
          pointer-events-none
          z-10
        "
        style={{ top: "10%" }}
      />

      {/* ================= CENTERED CONTENT ================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        
        <h1
          className="
            font-extrabold 
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
            leading-tight mb-3 sm:mb-4 md:mb-6
          "
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          {t("dataProcessing.hero.title")}
        </h1>

        <p
          className="
            text-white 
            text-sm sm:text-base md:text-lg lg:text-xl 
            leading-relaxed
            mb-6 sm:mb-8 md:mb-10
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl
          "
        >
          {t("dataProcessing.hero.description")}
        </p>

        <CTAButton onClick={() => alert("Video clicked!")}>
          {t("dataProcessing.hero.button")}
        </CTAButton>
      </div>
    </section>
  );
};

export default HeroData;