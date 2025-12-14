import React from "react";
import { HERO } from "../../asset/assets";
import { ICONS } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";
import { MY_COLORS } from "../../constants/colors.js";

const HeroContact = ({height = "75vh"}) => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
      style={{height}}
        src={HERO.contact}
        alt="Hero Background"
       className="w-full object-cover object-top"
      />

      {/* DARK GRADIENT OVERLAY (fixes readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

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

      {/*CENTERED TEXT CONTENT*/}

      <div
        className="
          absolute inset-0 flex flex-col items-center justify-center
          px-6 md:px-12 text-center
         "
      >
        <h1
          className="font-extrabold text-4xl md:text-4xl lg:text-5xl
            leading-tight mb-4"
          style={{
            color: MY_COLORS.primaryBlue,
            fontSize: "58px",
          }}
        >
          Contactez-Nous.
        </h1>

        <h2
          style={{ fontSize: "28px" }}
          className="  text-white 
            text-sm md:text-base lg:text-lg 
            tracking-wide uppercase 
            font-bold
            mb-4"
        >
          Notre équipe d'experts vous apporte une solution !
        </h2>

        <button
          className={`relative z-20 px-8 py-3 rounded-full border-2 
                  transition-all duration-300 font-semibold text-lg hover:scale-105 active:scale-95 `}
          style={{
            borderColor: MY_COLORS.primaryBlue,
            color: MY_COLORS.primaryBlue,
            backgroundColor: "transparent",
            top: "50px",
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
