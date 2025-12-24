import React from 'react'
import sma from '../../assets/sma.png'
import smart1 from '../../assets/smart1.jpg'

import casq from '../../assets/casq.svg'
import st1 from '../../assets/st1.png'
import st2 from '../../assets/st2.png'
import { MY_COLORS } from '../../utils/colors'
import { useState , useEffect} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion'
import rail from '../../assets/rail.svg'



// Simuler useTranslation
const useTranslation = () => {
  const translations = {
    smartVilla: {
      title1: "PROJET:",
      title2: "VILLA 2 YASSA",
      subtitle: "installation système domotique pour le contrôle centralisé de l'ensemble des équipements de l'habitat.",
      buttonText: "Plus de projets"
    }
  };

  return {
    t: (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value[k];
        if (!value) return key;
      }
      return value;
    }
  };
};

// Animation flottante keyframes
const floatingAnimation = `
  @keyframes floating {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .floating {
    animation: floating 3s ease-in-out infinite;
  }
`;

const SmartBander2 = () => {
  const { t } = useTranslation();

  return (
    <>
      <style>{floatingAnimation}</style>

      <div className='bg-gray-400/20 w-full items-center justify-center flex p-10'>
        <div className='relative w-[70%] h-[400px]' style={{
          backgroundImage: `linear-gradient(rgba(36, 38, 39, 0.7), rgba(58, 61, 63, 0.7)), url(${smart1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="flex items-center ">
            {/* Left Content Section */}
            <div className="flex-1 pl-30 pt-20 relative z-10">
              {/* Decorative Gear Left - Symétrie horizontale */}
              <div className="absolute -left-20 top-0 w-32 h-32">
                <motion.img 
                  src={casq} 
                  alt="engrenage" 
                  className="w-30 h-30 scale-x-[-1]"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    y: {
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
                  }}
                /> 
              </div>

              <h1 className='md:text-4xl text-2xl font-bold md:mb-4 text-white'>
                <span style={{color: MY_COLORS.secondaryGreen}}>
                  {t('smartVilla.title1')}
                </span> {t('smartVilla.title2')}
              </h1>

              <p className="text-white md:mb-8 mb-4 text-xl   max-w-md mt-5">
                {t('smartVilla.subtitle')}
              </p>

              <button 
                className="md:px-8 py-3 text-sm mb-15 rounded-full font-bold transition-all bg-white"
                style={{ 
                  color: MY_COLORS.black
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.secondaryGreen;
                  e.target.style.color = MY_COLORS.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.white;
                  e.target.style.color = MY_COLORS.black;
                }}
              >
                {t('smartVilla.buttonText')}
              </button>
            </div>

            {/* Right Section - Empty for layout consistency */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartBander2;