import React from 'react'
import p2 from '../../assets/p2.svg'
import p3 from '../../assets/p3.svg'
import rail from '../../assets/rail.svg'
import { useTranslation } from 'react-i18next'
import { color } from 'framer-motion'
import { MY_COLORS } from '../../utils/colors'
import { motion } from 'framer-motion'




const FoRound = () => {
    const {t}  = useTranslation();
  return (
    <div className='items-center w-screen md:w-[80%] lg:h-[30px] lg:w-[59.6%] md:left-20 lg:ml-75 sm:mr-50 md:h-[20px]  relative overflow-visible flex justify-center mb-0'>
        
        <div className="absolute  lg:-top-120 lg:-left-10 md:left-20 md:bottom-60 lg:-top-10  md:-top-10 sm:left-100 sm:-top-5 left-50 -top-5 z-30">
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
    <div className='absolute lg:bottom-85 md:bottom-70 sm:bottom-75 bottom-70 z-20'>
        <h1 style={{color: MY_COLORS.white}} className='font-bold lg:text-4xl md:text-3xl sm:text-3xl text-xl' >{t('fab.titleRound')} ? </h1>

     
    </div>
      <div className='absolute lg:bottom-70 md:bottom-55 sm:bottom-60 bottom-55 z-19'>
        <h1 style={{color: MY_COLORS.white}} className='font-bold lg:text-4xl md:text-3xl sm:text-2xl text-lg' >{t('fab.titleRound2')}  <span className='' style={{ color: MY_COLORS.green}}>  {t('fab.sub')} ? </span> </h1>

     
    </div>
    <div className='absolute items-center justify-center text-center w-80 flex lg:bottom-50 md:bottom-40 sm:bottom-45 bottom-40 z-20'>
         <p style={{color: MY_COLORS.white}} className='font-medium lg:text-base md:text-sm sm:text-sm text-xs'>
            {t('fab.subtitleRound')} 
        </p>
    </div>
        <div className='absolute lg:bottom-40 md:bottom-90 sm:bottom-90 bottom-60 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-230 md:w-180 sm:w-150 w-90 opacity-40'/>

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
                                {t('fab.buttonRound')}
                              </button>
                              
                             
                            </div>
                          </div>
        </div>
    </div>
  )
}

export default FoRound