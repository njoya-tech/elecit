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

// Simuler useTranslation
const useTranslation = () => {
  const translations = {
    interfaceCommande: {
      title: "Interfaces de commande",
      featureTitle: "Le pilotage centralisé",
      featureDescription: "Pilotez vos éclairages, volets, climatisation, caméras et appareils de sonorisation depuis chez vous ou à distance.",
      buttonText: "Visitez la boutique",
      slides: [
       sma,
       st1,
       st2
      ]
    }
  };

  return {
    t: (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value[k];
        if (!value) return key;
      }
      return value;
    }
  };
};



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

const SmartBander = () => {
     const { t } = useTranslation();
      const [currentSlide, setCurrentSlide] = useState(0);
      const [fadeIn, setFadeIn] = useState(true);
    
      const slides = t('interfaceCommande.slides') || [];
    
      useEffect(() => {
        const timer = setInterval(() => {
          setFadeIn(false);
          setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setFadeIn(true);
          }, 500);
        }, 4000);
    
        return () => clearInterval(timer);
      }, [slides.length]);
    
      const changeSlide = (direction) => {
        setFadeIn(false);
        setTimeout(() => {
          if (direction === 'next') {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          } else {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          }
          setFadeIn(true);
        }, 500);
      };
    
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
                  {/* Decorative Gear Left */}
                  <div className="absolute md:-left-20 -left-4 md:top-0 -top-6 md:w-32 md:h-32 w-16 h-16">
                    <motion.img 
                      src={casq} 
                      alt="engrenage" 
                      className="md:w-30 md:h-30 w-16 h-16"
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

                  <h2 className="md:text-4xl text-2xl font-bold md:mb-4 mb-3 text-white">
                    {t('interfaceCommande.title')}
                  </h2>

                  <h3 
                    className="md:text-1xl text-lg font-bold md:mt-5 mt-3"
                    style={{ color: MY_COLORS.white }}
                  >
                    {t('interfaceCommande.featureTitle')}
                  </h3>

                  <p className="text-white md:mb-8 mb-4 text-sm md:max-w-md">
                    {t('interfaceCommande.featureDescription')}
                  </p>

                  <button 
                    className="md:px-8 px-6 py-2 text-sm md:mb-15 mb-6 rounded-full md:border-2 border-2 font-medium transition-all hover:bg-white"
                    style={{ 
                      borderColor: MY_COLORS.secondaryGreen,
                      color: MY_COLORS.secondaryGreen
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = MY_COLORS.secondaryGreen;
                      e.target.style.color = MY_COLORS.white;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = MY_COLORS.secondaryGreen;
                    }}
                  >
                    {t('interfaceCommande.buttonText')}
                  </button>
                </div>

                {/* Right Carousel Section */}
                <div className="flex-1 relative w-full md:px-0 px-8">
                  {/* Navigation Arrow Left */}
                  <button
                    onClick={() => changeSlide('prev')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 md:p-3 p-1 transition-all md:-translate-x-6 -translate-x-2"
                  >
                    <ChevronLeft className="md:w-[35px] md:h-[35px] w-[25px] h-[25px]" />
                  </button>

                  {/* Carousel Container with Floating Animation */}
                  <div className="relative floating">
                    <div className="relative md:h-96 h-48 rounded-lg overflow-hidden">
                      {slides.map((slide, index) => (
                        <div
                          key={index}
                          className={`absolute flex items-center justify-center inset-0 transition-opacity duration-500 ${
                            index === currentSlide && fadeIn ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img
                            src={slide}
                            alt={`Interface ${index + 1}`}
                            className="md:w-80 w-full md:h-60 h-40 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrow Right */}
                  <button
                    onClick={() => changeSlide('next')}
                    className="absolute text-gray-400 right-0 top-1/2 -translate-y-1/2 z-20 md:p-3 p-1 transition-all md:translate-x-0 translate-x-2"
                  >
                    <ChevronRight className="md:w-[35px] md:h-[35px] w-[25px] h-[25px]" />
                  </button>
                </div>
              </div>
            </div>
    </div>
    </>
  )
}

export default SmartBander