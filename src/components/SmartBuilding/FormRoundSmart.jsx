import React from 'react'
import p2 from '../../assets/p2.svg'
import p3 from '../../assets/p3.svg'
import rail from '../../assets/rail.svg'
import { useTranslation } from 'react-i18next'
import { MY_COLORS } from '../../utils/colors'
import { motion } from 'framer-motion'
import { HERO, ICONS, IMAGES } from "../../asset/assets.js";


const FormRoundSmart = () => {
  const { t } = useTranslation();
  
  return (
    <div className='relative w-full flex items-center justify-center'>
      {/* Image de fond */}
    <div className='relative w-full max-w-6xl h-[350px] lg:h-[480px] md:h-[480px] sm:h-[480px]'>
          <img src={p2} alt="fond arrondie" className='w-full   ' />
          
        {/* Contenu centré */}
        <div className='absolute inset-0 flex flex-col items-center justify-center px-4 z-20 space-y-10 md:space-y-6'>
          {/* Titre */}
       <h1 
              style={{color: MY_COLORS.white}} 
              className='font-bold text-xl  sm:text-2xl md:text-3xl lg:text-6xl lg:pt-30 mt-15 -mb-1 text-center'
            >
            {t('smartVilla.titleRound')} 
          </h1>

          {/* Sous-titre en vert */}
          <span
            style={{color: MY_COLORS.secondaryGreen}} 
            className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl  text-center max-w-2xl'
          >
            {t('smartVilla.titleRound2')} 
          </span>

          {/* Description */}
          <p 
            style={{color: MY_COLORS.white}} 
            className='font-medium text-xl md:text-base lg:text-xl   text-center max-w-2xl w-[80%]'
          >
            {t('smartVilla.descriptionRound')} 
          </p>

          {/* Image tech en arrière-plan */}
          <img 
            src={p3} 
            alt="form technologie" 
            className='absolute inset-0 w-full lg:max-w-4xl lg:left-30 lg:-bottom-100 sm:max-w-4xl h-full object-contain opacity-40 z-[-1]'
          />

          {/* Bouton */}
          <button 
            className="lg:-translate-y-1 -translate-y-10 px-6 py-2 md:px-10 md:py-3 lg:px-12 lg:py-4 border-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 mt-4"
            style={{
              borderColor: MY_COLORS.secondaryGreen,
              color: MY_COLORS.secondaryGreen
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
              e.currentTarget.style.color = MY_COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = MY_COLORS.secondaryGreen;
            }}
          >
            {t('smartVilla.buttonRound')}
          </button>
        </div>
      </div>

       {/* Engrenages animés */}
       <div className=" absolute lg:bottom-70 lg:left-125 md:left-20 md:bottom-60 sm:left-20 sm:bottom-60 z-30 -left-5 bottom-50">
                 <motion.img 
                   src={rail} 
                   alt="engrenage" 
                   className="w-20 h-20"
                   animate={{ rotate: 360 }}
                   transition={{ 
                     duration: 6, 
                     ease: "linear", 
                     repeat: Infinity 
                   }}
                 />
               </div>
        
       <div className=" absolute lg:bottom-70 lg:left-320 z-30 md:left-140 md:bottom-50 left-80 bottom-50">
                <motion.img 
                  src={rail} 
                  alt="engrenage" 
                  className="w-70 h-45"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 6, 
                    ease: "linear", 
                    repeat: Infinity 
                  }}
                />
              </div>
    </div>
  );
};

export default FormRoundSmart;