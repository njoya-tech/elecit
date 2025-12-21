import React from "react";
import { ICONS, HERO } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";
import CTAButton from "../CTA/CTAButton.jsx";

const SavHero = () => {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <img
        src={HERO.sav}
        alt="Service Après-Vente"
        className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ANGLED BLACK MASK */}
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
        className="absolute inset-0 m-auto w-[120%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-3xl">
        <h1
          style={{ color: MY_COLORS.secondaryGreen }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
        >
          SERVICE APRES-VENTE
        </h1>

        <p className="text-white text-base sm:text-lg md:text-lg leading-relaxed mb-8">
          Nous assurons la satisfaction du client, garantissons la longévité des équipements et renforçons la confiance client.
        </p>

        {/* CTA BUTTON */}
        <div className="flex justify-center">
          <CTAButton onClick={() => alert("Video clicked!")}>
            Publireportage
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default SavHero;
