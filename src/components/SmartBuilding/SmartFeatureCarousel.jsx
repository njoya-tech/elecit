import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const SmartFeatureCarousel = ({ activeTab = 'smartHome' }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images définies localement (ne changent pas avec la langue)
  const slideImages = {
    smartHome: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    smartHotel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    smartOffice: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
    ],
    smartCommercial: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      'https://images.unsplash.com/photo-1491336238524-c990bd671778?w=800'
    ],
    smartEvents: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    ]
  };

  const slides = slideImages[activeTab] || [];

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length, activeTab]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
        {/* Carousel Section */}
        <div className="w-full lg:flex-1 relative">
          {/* Decorative Gear - Hidden on mobile */}
          <div className="hidden md:block absolute -left-8 lg:-left-16 -top-4 lg:-top-8 w-16 lg:w-24 h-16 lg:h-24">
            <motion.div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, ${MY_COLORS.secondaryGreen} 0%, transparent 70%)`,
                opacity: 0.3
              }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
          </div>

          {/* Background offset decoration */}
          <div 
            className="hidden sm:block absolute bg-green-600 rounded-3xl w-full h-full translate-y-4 sm:translate-y-6 lg:translate-y-8 -z-10" 
            style={{backgroundColor: MY_COLORS.secondaryGreen, opacity: 0.2}}
          />

          {/* Image Container with rounded border */}
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 sm:border-6 lg:border-8"
            style={{ borderColor: MY_COLORS.secondaryGreen }}
          >
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`${activeTab} slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1.5 sm:p-2 hover:bg-opacity-80 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1.5 sm:p-2 hover:bg-opacity-80 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-6 sm:w-8' : 'w-1.5 sm:w-2'
                  }`}
                  style={{
                    backgroundColor: index === currentSlide ? MY_COLORS.white : 'rgba(255,255,255,0.5)'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:flex-1 relative mt-6 lg:mt-0">
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left" 
            style={{ color: MY_COLORS.black }}
          >
            {t(`${activeTab}.title`)}
          </h2>

          <h3 
            className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center lg:text-left" 
            style={{ color: MY_COLORS.black }}
          >
            {t(`${activeTab}.featureTitle`)}
          </h3>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
            {t(`${activeTab}.featureDescription`)}
          </p>

          <div className="flex justify-center lg:justify-start">
            <button 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium hover:opacity-90 transition-all"
              style={{ backgroundColor: MY_COLORS.black }}
            >
              {t(`${activeTab}.buttonText`)}
            </button>
          </div>

          {/* Decorative Gears - Hidden on mobile, adjusted for tablet and desktop */}
          <div className="hidden md:block absolute right-0 lg:-right-12 xl:-right-20 top-32 lg:top-20 xl:top-24 w-20 lg:w-28 xl:w-32 h-20 lg:h-28 xl:h-32">
            <motion.div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, ${MY_COLORS.secondaryGreen} 0%, transparent 70%)`,
                opacity: 0.3
              }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
          </div>
          <div className="hidden md:block absolute right-8 lg:right-16 xl:right-20 bottom-4 lg:bottom-8 xl:bottom-10 w-16 lg:w-20 h-16 lg:h-20">
            <motion.div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, ${MY_COLORS.secondaryGreen} 0%, transparent 70%)`,
                opacity: 0.3
              }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartFeatureCarousel;