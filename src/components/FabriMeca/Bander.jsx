import React from 'react'
import sma from '../../assets/sma.png'
import smart1 from '../../assets/smart1.jpg'
import eng from '../../assets/eng.jpg'
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
    },
    fm : {
      "title": "Explorez du contenu intéressant",
      "subtitle": "L'atelier mécanique",
      "description": "Plongez vous au coeur de l'ingenieurie mécanique et métallique",
      "buttonText":"Visitez MATOA"
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

    <div className='bg-gray-400/20 w-screen items-center justify-center flex p-10'>
            <div className='  relative w-[1000px] h-[400px] '   style={{
          backgroundImage:  ` linear-gradient(rgba(36, 38, 39, 0.7), rgba(58, 61, 63, 0.7)), url(${eng})`,
        backgroundSize: 'cover',
            backgroundPosition: 'center',
            
        }}>          
<div className="flex items-center gap-10 pl-4">
            {/* Left Content Section */}
            <div className="flex-1 relative z-10">
              {/* Decorative Gear Left */}
              <div 
                className="absolute -left-20 top-0 w-32 h-32  "
              >
                 <motion.img 
                   src={casq} 
                   alt="engrenage" 
                   className="w-30 h-30"
                  // Animation: Uniquement le mouvement vertical (flottement)
  animate={{ 
    y: [0, -15, 0], // Commence à 0, monte à -15px, revient à 0
  }}
  
  // Transition: Rend le flottement doux et répétitif
  transition={{ 
    // On cible explicitement la propriété 'y'
    y: {
      duration: 2, // Le cycle de flottement dure 2 secondes (montée et descente)
      ease: "easeInOut", // Pour un mouvement doux au sommet et au fond
      repeat: Infinity, // Répète sans fin
      repeatType: "reverse", // Essentiel : inverse le mouvement (monte puis redescend)
    }
  }}
                /> 
              </div>

              <h2 className="md:text-4xl text-2xl font-bold md:mb-2 text-white">
                {t('fm.title')}
              </h2>

              <h3 
                className="text-1xl font-bold mb-4"
                style={{ color: MY_COLORS.white }}
              >
                {t('fm.subtitle')}
              </h3>

              <p className="text-white  md:mb-8 mb-4 text-sm max-w-md">
                {t('fm.description')}
              </p>

              <button 
                className="md:px-8 py-2 px-2 text-sm mb-15 rounded-full md:border-2 border-1 font-medium transition-all hover:bg-white"
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
                {t('fm.buttonText')}
              </button>
            </div>

            {/* Right Carousel Section */}
            <div className="flex-1 relative ">
              {/* Navigation Arrow Left */}
              <button
                onClick={() => changeSlide('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-gray-400 p-3  transition-all -translate-x-6"
              
              >
                <ChevronLeft size={35}  />
              </button>

              {/* Carousel Container with Floating Animation */}
              <div className="relative floating ">
                <div className="relative md:h-96  h-40 rounded-lg overflow-hidden ">
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
                        className="w-80 md:h-60 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={() => changeSlide('next')}
                className="absolute text-gray-400 right-0 top-1/2 -translate-y-1/2 z-20 p-3 transition-all translate-x-6"
              
              >
                <ChevronRight size={35}  />
              </button>

            
              
            
            </div>
          </div>
            </div>

    </div>
    </>
  )
}

export default SmartBander