import React from "react";
import { ICONS, HERO } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton";

const BureauHero = () => {
  return (
    <section
      className="
        relative w-full overflow-hidden
        min-h-[500px]
      "
      style={{ height: "75vh" }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={HERO.bureauEtude}
        alt="Bureau d’étude et ingénierie"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* ANGLED BLACK PNG MASK */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="
          absolute bottom-0 left-0 w-full
          max-h-[320px] sm:max-h-[360px] md:max-h-[420px]
          object-cover pointer-events-none
          z-10
        "
      />

      {/* TECH PATTERN – hidden on mobile */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="
          hidden sm:block
          absolute inset-0 m-auto
          w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%]
          max-w-[1400px]
          opacity-10
          pointer-events-none
          z-10
        "
        style={{ top: "10%" }}
      />

      {/* CONTENT */}
      <div
        className="
          absolute inset-0 z-20
          flex flex-col items-center justify-center
          px-4 sm:px-6 md:px-12 lg:px-16
          text-center
        "
      >
        {/* TITLE */}
        <h1
          className="
            font-extrabold
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            leading-tight
            mb-4 sm:mb-6
          "
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          INGÉNIERIE BÂTIMENT
          <br />
          & TRAVAUX PUBLICS
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            text-white
            text-sm sm:text-base md:text-lg
            leading-relaxed
            mb-8 sm:mb-10
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl
          "
        >
          Nous proposons une offre complète pour la construction de
          bâtiments publics et privés,
          <br className="hidden md:block" />
          des ouvrages hydrauliques.
        </p>

        {/* CTA */}
        <CTAButton onClick={() => alert("Video clicked!")}>
          Publireportage
        </CTAButton>
      </div>
    </section>
  );
};

export default BureauHero;
