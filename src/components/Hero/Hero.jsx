import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton.jsx";
import { MY_COLORS } from "../../constants/colors.js";

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <img
        src={HERO.entreprise} // <-- put the hero image here
        alt="Data Processing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ANGLED BLACK PNG MASK (correct height control) */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full max-h-[420px]
                 object-cover pointer-events-none"
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
                            opacity-10 
                            pointer-events-none 
                            z-10
                          "
        style={{
          top: "10%",
          color: "gray",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white whitespace-nowrap">
          Que faut-il savoir sur{" "}
          <span style={{ color: MY_COLORS.secondaryGreen }}>ELECIT?</span>
        </h1>

        <h3
          style={{
            color: MY_COLORS.secondaryGreen,
          }}
          className="text-3xl font-extrabold mb-6"
        >
          AFRICA 1ST HIGH TECH COMPANY
        </h3>

        <p className="text-white text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
          "Parce qu'au-delà du marché camerounais, nous souhaitons <br />{" "}
          développer toute l'Afrique à travers nos services. "
        </p>

        {/* CTA BUTTON */}
        <CTAButton onClick={() => alert("Video clicked!")}>
          Publireportage
        </CTAButton>
      </div>
    </section>
  );
};

export default Hero;
