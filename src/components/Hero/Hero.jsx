import React from 'react';
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton.jsx";
// 🚀 IMPORTANT: Ensure the import path below is correct for your file structure!
import { MY_COLORS } from "../../constants/colors.js"; 

const Hero = () => {
  return (
    // 1. Adjusted outer padding for consistent width control.
    <section className="relative w-full h-[300px] md:h-[420px] lg:min-h-[650px] overflow-hidden">
      {/* Background image */}
      <img
        src={HERO.security}
        alt="ELECIT technology and innovation workspace"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Overlay - Form pattern */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-15"
        style={{ backgroundImage: `url(${ICONS.formTech})` }}
        aria-hidden="true"
      />

      {/* Overlay - Dark gradient */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Centered content */}
      {/* 2. Container centered with max-width for better desktop control */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center mx-auto px-4 md:px-12 lg:px-32 max-w-7xl">
        {/* Main heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 max-w-4xl leading-tight">
          Que faut-il savoir sur{" "}
          {/* Using MY_COLORS.secondaryGreen via inline style */}
          <span style={{ color: MY_COLORS.secondaryGreen }} className="font-extrabold">ELECIT</span>? 
        </h1>

        {/* Subheading */}
        <p 
          className="text-sm sm:text-base md:text-lg font-bold tracking-widest mb-6 md:mb-8 uppercase"
          style={{ color: MY_COLORS.secondaryGreen }} // Using MY_COLORS.secondaryGreen
        >
          Africa 1st High Tech Company
        </p>

        {/* Main quote */}
        <p className="max-w-2xl lg:max-w-3xl text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed px-4 italic">
          "Parce qu'au-delà du marché camerounais, nous souhaitons
          développer toute l'Afrique à travers nos services."
        </p>

        {/* CTA Button */}
        <CTAButton onClick={() => alert("Video clicked!")}>
          Regarder la vidéo
        </CTAButton>
      </div>

      {/* Decorative gradient bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-60"
        // Applying gradient with MY_COLORS.secondaryGreen
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${MY_COLORS.secondaryGreen}, transparent)` }}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;