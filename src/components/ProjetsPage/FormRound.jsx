import React from 'react'
import p2 from '../../assets/p2.svg'
import p3 from '../../assets/p3.svg'
import rail from '../../assets/rail.svg'
import { useTranslation } from 'react-i18next'
import { MY_COLORS } from '../../utils/colors'
import { motion } from 'framer-motion'

const FormRound = () => {


    const {t} = useTranslation();
    
    return (
      <div className='relative w-full flex items-center justify-center '>
        {/* Engrenages animés */}
        <motion.img 
          src={rail} 
          alt="engrenage" 
          className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 left-4 top-8 md:left-12 md:top-12 lg:left-12 lg:top-8 z-30"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 6, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
        
        <motion.img 
          src={rail} 
          alt="engrenage" 
          className="absolute w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 right-8 top-12 md:right-16 md:top-16 lg:right-12 lg:top-8 z-30"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 6, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />

        {/* Image de fond */}
        <div className='relative w-full max-w-6xl h-[500px]'>
          <img src={p2} alt="fond arrondie" className='w-full   ' />
          
          {/* Contenu centré */}
          <div className='absolute inset-0 flex flex-col items-center justify-center px-4 z-20 space-y-4 md:space-y-6'>
            {/* Titre */}
            <h1 
              style={{color: MY_COLORS.white}} 
              className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center'
            >
              {t('projets.titleRound1')}{' '}
              <span style={{color: MY_COLORS.green}}>
                {t('projets.titleRound3')}
              </span>{' '}
              {t('projets.titleRound2')} ?
            </h1>

            {/* Sous-titre */}
            <p 
              style={{color: MY_COLORS.white}} 
              className='font-medium text-sm md:text-base text-center max-w-2xl'
            >
              {t('projets.subtitleRound')} 
            </p>

            {/* Image tech en arrière-plan */}
            <img 
              src={p3} 
              alt="form technologie" 
              className='absolute inset-0 w-full lg:max-w-4xl lg:ml-40 sm:max-w-4xl h-full object-contain opacity-30 z-[-1]'
            />

            {/* Bouton */}
            <button 
              className="px-6 py-2 md:px-10 md:py-3 lg:px-12 lg:py-4 border-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 mt-4"
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
    )
}

export default FormRound