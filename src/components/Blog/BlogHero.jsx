import React from "react";
import { ICONS, HERO } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const BlogHero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={HERO.blog}
        alt="Data Processing"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* ANGLED BLACK PNG MASK */}
      {/* <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] xl:h-[420px]
                 object-cover pointer-events-none"
      /> */}

      {/* TECH PATTERN */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto 
                   w-[140%] sm:w-[130%] md:w-[120%] lg:w-[110%] xl:w-[120%]
                   max-w-[1400px] 
                   opacity-10 
                   pointer-events-none 
                   z-10"
        style={{
          top: "10%",
          color: "gray",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 w-full flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                       font-extrabold mb-3 sm:mb-4 md:mb-5 lg:mb-6 
                       text-white 
                       whitespace-normal sm:whitespace-normal md:whitespace-nowrap
                       lg:-mt-10">
          <span style={{ color: MY_COLORS.secondaryGreen }}>Inside ElecIT</span>
        </h1>

        <h3
          style={{
            color: MY_COLORS.white,
          }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl 
                     font-extrabold 
                     mb-6 sm:mb-8 md:mb-10 lg:mb-16
                     px-2"
        >
          Innovation, Expertise & Vie d'Entreprise
        </h3>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl 
                      leading-relaxed 
                      mb-4 sm:mb-5 md:mb-6 
                      max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl
                      px-2">
          Une fenêtre ouverte sur notre savoir-faire et notre culture.{" "}
          <span className="hidden sm:inline"><br/></span>
          <span className="sm:hidden"> </span>
          Explorez nos projets, nos innovations et notre vision de l'ingénierie moderne.{" "}
          <span className="hidden md:inline"><br/></span>
          <span className="md:hidden"> </span>
          Plongez dans le quotidien d'ElecIT, là où la technique rencontre l'humain.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;