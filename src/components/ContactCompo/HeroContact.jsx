import React from "react";
import { HERO } from "../../asset/assets";
import { ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";
import { MY_COLORS } from "../../constants/colors.js";

const HeroContact = ({height = "75vh"}) => {
  return (
    <section className="relative w-full overflow-hidden" style={{height}}>
      {/* Background Image */}
      <img
        src={HERO.contact}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* ANGLED BLACK PNG MASK */}
      {/* <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[420px] pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "bottom" }}
      /> */}

      {/* TECH PATTERN */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{
          top: "10%",
        }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center z-20">
        <h1
          className="font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-3 sm:mb-4 md:mb-5"
          style={{
            color: MY_COLORS.primaryBlue,
          }}
        >
          Contactez-Nous.
        </h1>

        <h2
          className="text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-wide uppercase font-bold mb-3 sm:mb-4 px-4 max-w-4xl"
        >
          Notre équipe d'experts vous apporte une solution !
        </h2>

        <button
          className="relative z-20 px-5 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full border-2 transition-all duration-300 font-semibold text-sm xs:text-base sm:text-lg hover:scale-105 active:scale-95 mt-6 xs:mt-8 sm:mt-10 md:mt-12 lg:mt-14"
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