import React from "react";
import { ICONS, HERO } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const BlogHero = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <img
        src={HERO.security} // <-- put the hero image here
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
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1
          style={{ color: MY_COLORS.secondaryGreen, lineHeight: "1.5em" }}
          className="text-3xl md:text-5xl font-extrabold  mb-6"
        >
          Inside ElecIT <br />
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-5">
          <span style={{ color: MY_COLORS.white }}>
            Innovation, Expertise & Vie d’Entreprise
          </span>
        </h2>

        <p 
        style={{
            
        }}
        className="text-white text-2xl md:text-lg leading-relaxed mb-8 ">
          Une fenêtre ouverte sur notre savoir-faire et notre culture.<br/> Explorez
          nos projets, nos innovations et notre vision de l’ingénierie moderne.<br/>
          Plongez dans le quotidien d’ElecIT, là où la technique rencontre
          l’humain.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
