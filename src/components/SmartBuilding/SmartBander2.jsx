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
    },
      smartVilla: {
    "title1": "PROJET:",
    "title2": "VILLA 2 YASSA",
    "subtitle": "installation système domotique pour le contrôle centralisé de l'ensemble des équipements de l'habitat." ,
    "buttonText": "Plus de projets"
  },
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

const SmartBander2 = () => {
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
            <div className='  relative w-[1000px] '   style={{
          backgroundImage:  ` linear-gradient(rgba(36, 38, 39, 0.7), rgba(58, 61, 63, 0.7)), url(${smart1})`,
        backgroundSize: 'cover',
            backgroundPosition: 'center',
            
        }}>          
<div className="flex items-center gap-10 pl-4">
            {/* Left Content Section */}
            <div className="flex-1 relative z-10">
              {/* Decorative Gear Left */}
              <div 
                className="absolute -left-30 top-3 w-35 h-40  "
              >
<motion.img 
    src={casq} 
    alt="engrenage" 
    // AJOUT DE LA CLASSE DE SYMETRIE HORIZONTALE
    className="w-30 h-30 scale-x-[-1]" 
    // Animation: Uniquement le mouvement vertical (flottement)
    animate={{ 
      y: [0, -15, 0], // Commence à 0, monte à -15px, revient à 0
    }}
    
    // Transition: Rend le flottement doux et répétitif
    transition={{ 
      // On cible explicitement la propriété 'y'
      y: {
        duration: 2, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "reverse", 
      }
    }}
/>
              </div>

              <h1 className='text-4xl font-bold mt-8 text-white'> <span style={{color: MY_COLORS.secondaryGreen}}>{t('smartVilla.title1')} </span>{t('smartVilla.title2')}</h1>


              <p className="text-white leading-relaxed mt-8 max-w-md mb-10">
                {t('smartVilla.subtitle')}
              </p>

              <button 
                className="px-8 py-3 rounded-full font-bold transition-all hover:bg-white mt-10 mb-20"
              
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.secondaryGreen;
                  e.target.style.color = MY_COLORS.white;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.white;
                  e.target.style.color = MY_COLORS.black;
                }}
              >
                {t('smartVilla.buttonText')}
              </button>
            </div>

          
          </div>
            </div>

    </div>
    </>
  )
}

export default SmartBander2