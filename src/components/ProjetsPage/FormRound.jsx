import React from 'react'
import p2 from '../../assets/p2.svg'
import p3 from '../../assets/p3.svg'
import rail from '../../assets/rail.svg'
import { useTranslation } from 'react-i18next'
import { color } from 'framer-motion'
import { MY_COLORS } from '../../utils/colors'
import { motion } from 'framer-motion'




const FormRound = () => {
    const {t}  = useTranslation();
  return (
    <div className='items-center w-full md:w-screen h-screen lg:h-[100px] md:h-[60px] relative overflow-visible flex justify-center'>
        <div className="absolute lg:bottom-95 lg:left-119 md:left-20 md:bottom-70 z-30">
          <motion.img 
            src={rail} 
            alt="engrenage" 
            className="w-30 h-30"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 6, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />
        </div>
        <div className="absolute lg:bottom-100 lg:left-320 z-30 md:left-190 md:bottom-70">
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
        <div className='relative overflow-hidden'>
            <img src={p2} alt="fond arrondie" className='w-280' />
           

        </div>
    <div className='absolute lg:bottom-85 md:bottom-70 bottom-0 z-20'>
        <h1 style={{color: MY_COLORS.white}} className='font-bold text-4xl' >{t('recruitment.titleRound')} ? </h1>

     
    </div>
    <div className='absolute items-center justify-center flex lg:bottom-50 md:bottom-50 z-20'>
         <p style={{color: MY_COLORS.white}} className='font-medium '>
            {t('projets.subtitleRound')} 
        </p>
    </div>
        <div className='absolute bottom-40 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-230 md:w-180 opacity-40'/>

        </div>

        <div className='absolute md:bottom-20 lg:bottom-10 bottom-0 z-20'>
                     {/* Boutons d'action */}
                          <div className="flex items-center justify-center gap-4 sm:gap-6">
                            {/* Bouton Livre blanc */}
                            <div className="flex items-center gap-3">
                              <button 
                                className="px-8 py-3 sm:px-12 sm:py-4 border-2 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300"
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
                                {t('projets.buttonRound')}
                              </button>
                              
                             
                            </div>
                          </div>
        </div>
    </div>
  )
}

export default FormRound