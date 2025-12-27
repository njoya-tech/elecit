import React from "react";
import { HERO } from "../../asset/assets";
import { ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";
import { MY_COLORS } from "../../constants/colors.js";

const HeroContact = ({height = "75vh"}) => {
  return (
    <section 
      className="relative w-full overflow-hidden min-h-[500px]" 
      style={{height}}
    >
      {/* Background Image */}
      <img
        src={HERO.contact}
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
        style={{
          top: "10%",
        }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <h1
          className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-3 sm:mb-4 md:mb-6"
          style={{
            color: MY_COLORS.primaryBlue,
          }}
        >
          Contactez-Nous.
        </h1>

        <h2
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide uppercase font-bold mb-4 sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
        >
          Notre équipe d'experts vous apporte une solution !
        </h2>

        <button
          className="relative z-20 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 rounded-full border-2 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 mt-6 sm:mt-8 md:mt-10 lg:mt-12"
          style={{
            borderColor: MY_COLORS.primaryBlue,
            color: MY_COLORS.primaryBlue,
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue;
            e.currentTarget.style.color = MY_COLORS.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = MY_COLORS.primaryBlue;
          }}
        >
          Plus de Contenus
        </button>
      </div>
    </section>
  );
};

export default HeroContact;