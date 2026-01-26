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
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

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
  
  @media (max-width: 768px) {
    .floating {
      animation: none;
    }
  }
`;

const SmartBander2 = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <>
      <style>{floatingAnimation}</style>

      <div className='bg-gray-400/20 w-full items-center justify-center flex md:p-10 p-4'>
        <div className='relative md:w-[70%] w-full md:h-[400px] h-auto'   
          style={{
            backgroundImage: `linear-gradient(rgba(36, 38, 39, 0.7), rgba(58, 61, 63, 0.7)), url(${smart1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >          
          <div className="flex md:flex-row flex-col items-center gap-5 md:py-0 py-8">
            {/* Left Content Section */}
            <div className="flex-1 md:pl-10 pl-4 pr-4 relative z-10">
              {/* Decorative Gear Left - Symétrie horizontale */}
              <div className="absolute md:-left-20 -left-4 md:top-0 -top-6 md:w-32 md:h-32 w-16 h-16">
                <motion.img 
                  src={casq} 
                  alt="engrenage" 
                  className="md:w-30 md:h-30 w-16 h-16 scale-x-[-1]"
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

              <h1 className='md:text-4xl text-2xl font-bold md:mb-4 mb-3 text-white'>
                {t('smartV.title1')} <br /> {t('smartV.title2')}
              </h1>

              <p className="text-white md:mb-8 mb-4 md:text-xl text-sm md:max-w-md mt-5">
                {t('smartV.subtitle')}
              </p>

              <button 
                className="md:px-8 px-6 py-2 text-sm md:mb-15 mb-6 rounded-full font-bold transition-all bg-white"
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
                onClick={() => navigate('/projets')}
              >
                {t('smartV.buttonText')}
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