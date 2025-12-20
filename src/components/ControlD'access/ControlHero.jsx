import React from 'react'
import { HERO,ICONS } from '../../asset/assets';
import { MY_COLORS } from '../../utils/colors';
import CTAButton from '../CTA/CTAButton';


const ControlHero = () => {
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
          style={{color:MY_COLORS.secondaryGreen}}
          className="text-3xl md:text-5xl font-extrabold  mb-6">
            IT & DATA PROCESSING
          </h1>
  
          <p className="text-white text-base md:text-lg leading-relaxed mb-8">
            Nous aidons les entreprises à gérer efficacement leurs systèmes
            informatiques et à tirer le meilleur parti de leurs données.
          </p>
  
          {/* CTA BUTTON */}
          <CTAButton onClick={() => alert("Video clicked!")}>
            Publireportage 
          </CTAButton>
        </div>
      </section>
    );
}

export default ControlHero
