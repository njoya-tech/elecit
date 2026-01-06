import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton.jsx";
import { MY_COLORS } from "../../constants/colors.js";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">

      {/* BACKGROUND IMAGE (your style) */}
      <img
        src={HERO.entreprise}
        alt=""
        className="w-full h-[75vh] md:h-[85vh] object-cover"
      />

      {/* DARK GRADIENT OVERLAY (fixes readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* ANGLED BLACK PNG MASK (correct height control) */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full max-h-[420px] object-cover pointer-events-none"
        style={{ objectFit: "cover" }}
      />

      {/* TECH PATTERN - FULL WIDTH + BEHIND TEXT (corrected) */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 m-auto 
          w-[120%] max-w-[1400px] 
          opacity-20 
          pointer-events-none 
          -z-10
        "
        style={{
          top: "10%",
        }}
      />

      {/* CENTERED TEXT CONTENT */}
      <div
        className="
          absolute inset-0 flex flex-col items-center justify-center
          px-6 md:px-12 text-center
        "
       >
        {/* MAIN TITLE */}
        <h1
          className="
            text-white font-extrabold 
            text-4xl md:text-5xl lg:text-6xl 
            leading-tight
            mb-4
          "
        >
          Que faut-il savoir sur{" "}
          <span style={{ color: MY_COLORS.green }}>ELECIT?</span>
        </h1>

        {/* SUBTITLE */}
        <h2
          className="
            text-white 
            text-sm md:text-base lg:text-lg 
            tracking-wide uppercase 
            font-semibold
            mb-4
          "
        >
          Africa 1st High Tech Company
        </h2>

        {/* QUOTE */}
        <p
          className="
            max-w-3xl 
            text-white/90 
            text-base md:text-lg 
            leading-relaxed 
            mb-8
          "
        >
          “Parce qu’au-delà du marché camerounais, nous souhaitons développer
          toute l’Afrique à travers nos services.”
        </p>

        {/* CTA BUTTON */}
        <CTAButton onClick={() => alert("Video clicked!")}>
          Regarder la vidéo
        </CTAButton>
      </div>

      
    </section>
  );
};

export default Hero;
