// RecruitmentHero.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import p3 from '../../assets/p3.svg'

const RecruitmentHero = ({ title1, title2, subtitle, bgImage }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className="relative w-full  h-[300px] md:h-[600px] lg:h-[650px] flex items-center justify-center lg:translate-x-15 md:translate-x-15 md:w-[800px] lg:w-[1800px] "
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
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t(title1)}
          </span>
          <br />
          <span style={{ color: MY_COLORS.white }}>
            {t(title2)}
          </span>
        </h1>
        <p 
          className="text-base md:text-lg font-medium leading-relaxed"
          style={{ color: MY_COLORS.white }}
        >
          {t(subtitle)}
        </p>
      </div>
              <div className='absolute bottom-5 z-10'>
            <img src={p3} alt="form technologie" className='lg:w-screen md:w-screen opacity-10'/>

        </div>
    </div>
  );
};

export default RecruitmentHero

