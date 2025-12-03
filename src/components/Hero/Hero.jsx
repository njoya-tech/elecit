import React from 'react'
import { HERO, ICONS } from "../../asset/assets.js";
import CTAButton from "../CTA/CTAButton.jsx";

const Hero = () => {
  
   return (
    <section className="relative w-full h-[300px] md:h-[420px] lg:min-h-[650px] overflow-hidden md:px-16 lg:px-64">
  {/* Background image */}
  <img
    src={HERO.security}
    alt="ELECIT technology and innovation workspace"
    className="absolute inset-0 w-full h-full object-cover object-top"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20"
       style={{ backgroundImage: `url(${ICONS.formTech})` }} aria-hidden="true" />
  <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

  {/* Centered content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center mx-auto px-4 md:px-12 lg:px-32">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 md:mb-4 max-w-4xl">
      Que faut-il savoir sur <span className="text-lime-400">ELECIT</span>?
    </h1>
    <p className="text-xs sm:text-sm md:text-base text-lime-400 font-semibold tracking-wider mb-3 md:mb-4 uppercase">
      Africa 1st High Tech Company
    </p>
    <p className="max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed px-4">
      "Parce qu'au-delà du marché camerounais, nous souhaitons développer toute l'Afrique à travers nos services."
    </p>
    <CTAButton onClick={() => alert("Video clicked!")}>Regarder la vidéo</CTAButton>
  </div>

  {/* Decorative gradient bar */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-50" />
</section>

  );
  
}

export default Hero
