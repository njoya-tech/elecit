
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import p3 from '../../assets/p3.svg'
import fi from '../../assets/fi.svg'
import { motion } from 'framer-motion'

const FabriMecaHero = ({ title1,  subtitle, bgImage, subtitle2, buttonText }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div 
      className="relative w-full bg-cover bg-center sm:w-full md:w-[800px] lg:w-[1800px] translate-x-0 sm:translate-x-0 md:translate-x-15 lg:translate-x-15 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[650px]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Contenu */}
      <div className="absolute mb-5 inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 md:mt-10 text-center ">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold  ">
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t(title1)}
          </span>
         
        </h1>
        <div className='text-center mt-5'>
                       <p 
          className=" md:text-lg font-medium leading-relaxed "
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle)}
        </p>
        </div>
    

        <p 
          className="lg:mt-15  text-base italic  md:text-lg leading-relaxed mt-3 "
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle2)}
        </p>

              <div className='flex flex-row lg:-translate-x-10 lg:translate-y-5 gap-2'>
                <motion.div 
                  className="flex-shrink-0"
                  animate={{
                    x: [0, -12, 0], // Position normale → Gauche → Position normale
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.3
                  }}
                >
                  <img 
                    src={fi} 
                    alt="Fleche"
                    className="w-8 h-8 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-15 xl:h-15 object-contain scale-x-[-1]"
                  />
                </motion.div>
                
                       {/* Boutons d'action */}
                  <div className="flex items-center justify-center gap-4 lg:mt-4 sm:gap-6">
                    {/* Bouton Livre blanc */}
                    <div className="flex items-center gap-3">
                      <button 
                        className="px-8 py-3 sm:px-12 sm:py-4 border-2 text-white text-sm sm:text-base md:font-semibold lg:font-semibold font-medium rounded-full transition-all duration-300"
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
                        {t(buttonText)}
                      </button>
                      
                     
                    </div>
                  </div>
              </div>


               
      </div>
              <div className='absolute bottom-5 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-screen md:w-screen opacity-10'/>

        </div>
    </div>
  );
};

export default FabriMecaHero
