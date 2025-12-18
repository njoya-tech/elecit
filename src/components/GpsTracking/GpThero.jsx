
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import p3 from '../../assets/p3.svg'

const GpThero = ({ title1,  subtitle, bgImage, subtitle2, buttonText }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
 
  return (
    <div 
      className="relative w-screen mx-auto  h-[300px] md:h-[600px] lg:h-[650px] flex items-center justify-center  md:w-[800px] lg:w-[1800px] "
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
      <div className="relative z-10 text-center px-4 w-full -pb-10 ">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t(title1)}
          </span>
         
        </h1>
        <div className='text-center'>
                       <p 
          className="text-base md:text-lg font-medium leading-relaxed mb-10"
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle)}
        </p>
        </div>
    

        <p 
          className="text-base italic  md:text-lg leading-relaxed mb-10"
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle2)}
        </p>
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
                        {t(buttonText)}
                      </button>
                      
                     
                    </div>
                  </div>
      </div>
              <div className='absolute bottom-5 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-screen md:w-screen opacity-10'/>

        </div>
    </div>
  );
};

export default GpThero
