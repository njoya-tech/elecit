import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import p3 from '../../assets/p3.svg'

const GpThero = ({ title1,  subtitle, bgImage, subtitle2, buttonText }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div 
      className="relative w-screen mx-auto h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] flex items-center justify-center md:w-[800px] lg:w-[1800px]"
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
      <div className="relative z-10 text-center px-4 sm:px-6 w-full sm:w-[80%] md:w-[70%] lg:w-[60%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6">
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t(title1)}
          </span>
        </h1>
        
        <div className='text-center'>
          <p 
            className="text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2"
            style={{ color: MY_COLORS.white }}
          >
            {t(subtitle)}
          </p>
        </div>

        <p 
          className="text-sm sm:text-base md:text-lg italic leading-relaxed mb-6 sm:mb-8 md:mb-10 px-2"
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle2)}
        </p>
        
        {/* Boutons d'action */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
          {/* Bouton Livre blanc */}
          <div className="flex items-center gap-3">
            <button 
              className="px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3 lg:px-12 lg:py-4 border-2 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full transition-all duration-300"
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
      
      <div className='absolute bottom-5 z-10'>
        <img src={p3} alt="form technologie" className='w-screen opacity-10'/>
      </div>
    </div>
  );
};

export default GpThero