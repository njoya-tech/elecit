import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Simuler useTranslation
const useTranslation = () => {
  const translations = {
    interfaceCommande: {
      title: "Interfaces de commande",
      featureTitle: "Le pilotage centralisé",
      featureDescription: "Pilotez vos éclairages, volets, climatisation, caméras et appareils de sonorisation depuis chez vous ou à distance.",
      buttonText: "Visitez la boutique",
      slides: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200',
        'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200'
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

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
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

const InterfaceCommandeCarousel = () => {
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
      <div className="relative w-full bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-center gap-16">
            {/* Left Content Section */}
            <div className="flex-1 relative z-10">
              {/* Decorative Gear Left */}
              <div 
                className="absolute -left-20 top-0 w-32 h-32 opacity-40"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="35" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="20" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                      y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                      stroke={MY_COLORS.secondaryGreen}
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-white">
                {t('interfaceCommande.title')}
              </h2>

              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                {t('interfaceCommande.featureTitle')}
              </h3>

              <p className="text-white leading-relaxed mb-8 max-w-md">
                {t('interfaceCommande.featureDescription')}
              </p>

              <button 
                className="px-8 py-3 rounded-full border-2 font-medium transition-all hover:bg-white"
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
            <div className="flex-1 relative">
              {/* Navigation Arrow Left */}
              <button
                onClick={() => changeSlide('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition-all -translate-x-6"
                style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              >
                <ChevronLeft size={28} style={{ color: MY_COLORS.black }} />
              </button>

              {/* Carousel Container with Floating Animation */}
              <div className="relative floating">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide && fadeIn ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={slide}
                        alt={`Interface ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={() => changeSlide('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition-all translate-x-6"
                style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              >
                <ChevronRight size={28} style={{ color: MY_COLORS.black }} />
              </button>

              {/* Decorative Gears Right */}
              <div 
                className="absolute -right-16 top-20 w-24 h-24 opacity-30"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="35" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="20" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                      y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                      stroke={MY_COLORS.secondaryGreen}
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>
              
              <div 
                className="absolute -right-8 bottom-16 w-16 h-16 opacity-30"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="35" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="20" 
                    fill="none" 
                    stroke={MY_COLORS.secondaryGreen} 
                    strokeWidth="3"
                  />
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                      y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                      stroke={MY_COLORS.secondaryGreen}
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterfaceCommandeCarousel


