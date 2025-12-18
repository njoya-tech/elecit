import React from 'react'
import p2 from '../../assets/p2.svg'
import p3 from '../../assets/p3.svg'
import rail from '../../assets/rail.svg'
import { useTranslation } from 'react-i18next'
import { color } from 'framer-motion'
import { MY_COLORS } from '../../utils/colors'
import { motion } from 'framer-motion'




const Ground = () => {
    const {t}  = useTranslation();
  return (
    <div className='items-center w-screen md:w-[80%] lg:h-[30px] lg:w-[59.6%] md:left-20 lg:ml-75 sm:mr-50 md:h-[20px] sm:h-[20px] relative overflow-visible flex justify-center mb-0'>
        <div className="absolute lg:bottom-95 lg:left-2 md:left-20 md:bottom-60 sm:left-10 sm:bottom-55 left-5 bottom-50 z-30">
          <motion.img 
            src={rail} 
            alt="engrenage" 
            className="lg:w-30 lg:h-30 md:w-25 md:h-25 sm:w-20 sm:h-20 w-15 h-15"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 6, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />
        </div>
        <div className="absolute lg:bottom-100 lg:left-220 md:left-140 md:bottom-50 sm:left-100 sm:bottom-45 left-70 bottom-40 z-30">
          <motion.img 
            src={rail} 
            alt="engrenage" 
            className="lg:w-70 lg:h-45 md:w-50 md:h-35 sm:w-40 sm:h-30 w-30 h-30"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 6, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />
        </div>
        <div className='relative overflow-hidden'>
            <img src={p2} alt="fond arrondie" className='w-screen' />
           

        </div>
    <div className='absolute lg:bottom-95 md:bottom-70 sm:bottom-75 bottom-70 z-20'>
        <h1 style={{color: MY_COLORS.white}} className='font-bold lg:text-6xl md:text-4xl sm:text-3xl text-2xl' >{t('gpsT.titleRound')} </h1>

     
    </div>
    <div className='absolute items-center justify-center flex lg:bottom-80 md:bottom-55 sm:bottom-60 bottom-55 z-20'>
         <p style={{color: MY_COLORS.secondaryGreen}} className='font-bold lg:text-6xl md:text-4xl sm:text-3xl text-2xl'>
            {t('gpsT.titleRound2')} 
        </p>
    </div>





<div 
    className='absolute 
                left-1/2 transform -translate-x-1/2 
                lg:bottom-40 md:bottom-35 sm:bottom-38 bottom-35
                z-20 
                w-full max-w-sm px-4'
> 

    <p 
        style={{color: MY_COLORS.white}} 
        className='font-medium text-center lg:text-4xl md:text-2xl sm:text-xl text-md whitespace-normal'
    >
        {t('gpsT.descriptionRound')} 
    </p>

 


</div>





        <div className='absolute lg:bottom-40 md:bottom-30 sm:bottom-35 bottom-60 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-230 md:w-180 sm:w-110 w-90 opacity-40'/>

        </div>

        <div className='absolute md:bottom-20 lg:bottom-10 sm:bottom-19 bottom-15 z-20'>
                     {/* Boutons d'action */}
                          <div className="flex items-center justify-center gap-4 sm:gap-6">
                            {/* Bouton Livre blanc */}
                            <div className="flex items-center gap-3">
                              <button 
                                className="px-8 py-2 sm:px-12 sm:py-4 border-2 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300"
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
        </div>
    </div>
  )
}

export default Ground