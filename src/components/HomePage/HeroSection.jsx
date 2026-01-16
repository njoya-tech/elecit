import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import fond_sombre from '../../assets/fond_sombre.png';
import design_x from '../../assets/design_x.png';
import vid from '../../assets/vid.png';
import { motion } from 'framer-motion';
import { MY_COLORS } from '../../utils/colors';
import fi from '../../assets/fi.svg';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ slides }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // ✅ Cleanup du setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // ✅ Mémoiser la slide courante
  const currentSlideData = useMemo(() => slides[currentSlide], [slides, currentSlide]);

  // ✅ Mémoiser les traductions
  const subtitle = useMemo(() => t(currentSlideData.subtitle), [t, currentSlideData.subtitle]);
  const title = useMemo(() => t(currentSlideData.title), [t, currentSlideData.title]);
  const highlighted = useMemo(() => t(currentSlideData.highlighted), [t, currentSlideData.highlighted]);
  const title2 = useMemo(() => t(currentSlideData.title2), [t, currentSlideData.title2]);
  const highlighted2 = useMemo(() => t(currentSlideData.highlighted2), [t, currentSlideData.highlighted2]);
  const title3 = useMemo(() => t(currentSlideData.title3), [t, currentSlideData.title3]);
  const title4 = useMemo(() => currentSlideData.title4 ? t(currentSlideData.title4) : '', [t, currentSlideData.title4]);
  const submitProjectText = useMemo(() => t('hero.submitProject'), [t]);

  const handleProjectClick = useCallback(() => {
    navigate('/contacts');
  }, [navigate]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[650px] overflow-hidden">
      <div className="absolute inset-0 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>

        <div 
          className="absolute inset-y-0 -left-10 w-full sm:w-[75%] md:w-[80%] lg:w-[70%]"
          style={{ 
            backgroundImage: `url(${fond_sombre})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8 
          }}
        />

        <div className="absolute inset-y-0 right-0 w-1/2 sm:w-2/5 md:w-1/2 flex items-center justify-end transform -translate-x-2 md:-translate-x-18 lg:-translate-x-153">
          <img
            src={design_x}
            alt="Design X"
            className="w-auto max-h-full sm:max-h-full md:max-h-[120%] lg:max-h-[100%] object-contain"
          />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="w-[60%] sm:w-1/2 md:w-[48%] lg:w-[35%] py-8 md:py-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M13 5L20 12L13 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 5L13 12L6 19" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-xs sm:text-sm md:text-base tracking-wider" style={{color: MY_COLORS.secondaryGreen}}>
                {subtitle}
              </span>
            </div>

            <div className="transition-all duration-700 ease-in-out min-h-[110px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[180px]"> 
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight md:leading-snug mb-4 sm:mb-5 md:mb-3 lg:mb-3">
                {title}{' '}
                <span style={{ color: MY_COLORS.secondaryGreen }}>{highlighted}</span>{' '}
                {title2}{' '}
                <span style={{ color: MY_COLORS.secondaryGreen }}>{highlighted2}</span>{' '}
                {title3}{' '}
              </h1>
              {title4 && (
                <p className="text-xs font-bold sm:text-sm md:text-sm lg:text-base text-white max-w-prose mb-4">
                  {title4}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <motion.button
                className="relative group flex-shrink-0"
                aria-label="Play video"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.92, 1.08, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center overflow-hidden border-2 transition-colors duration-300 group-hover:bg-transparent"
                  style={{
                    backgroundColor: MY_COLORS.secondaryGreen,
                    borderColor: MY_COLORS.secondaryGreen,
                  }}
                >
                  <img 
                    src={vid}
                    alt="Video Icon"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:scale-125"
                  />
                </div>
              </motion.button>

              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <button 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 border-2 text-white text-xs sm:text-sm md:text-base font-semibold rounded-full transition-all duration-300 whitespace-nowrap"
                  style={{ borderColor: MY_COLORS.secondaryGreen }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={handleProjectClick}
                >
                  {submitProjectText}
                </button>
                
                <motion.div 
                  className="flex-shrink-0 translate-y-5"
                  animate={{ x: [0, -12, 0] }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
                >
                  <img 
                    src={fi} 
                    alt="Fleche"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-20 lg:h-20 xl:w-15 xl:h-15 object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{ background: currentSlide === index ? MY_COLORS.secondaryGreen : 'white' }}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}     
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(HeroSection);