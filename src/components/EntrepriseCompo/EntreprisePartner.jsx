import React, { useState, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors";
import { PARTNERS } from "../../asset/assets.js";

// Add CSS animations in a style tag
const animationStyles = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInBottom {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-in-out;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-in-out;
  }

  .animate-slide-in-bottom {
    animation: slideInBottom 0.8s ease-in-out;
  }

  .logo-item-0 {
    animation-delay: 0ms;
  }

  .logo-item-1 {
    animation-delay: 150ms;
  }

  .logo-item-2 {
    animation-delay: 300ms;
  }
`;

const EntreprisePartner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  // Partner logos array - Using PARTNERS object
  const partners = [
    { id: 1, logo: PARTNERS.partner1, alt: "Partner 1" },
    { id: 2, logo: PARTNERS.partner2, alt: "Partner 2" },
    { id: 3, logo: PARTNERS.partner3, alt: "Partner 3" },
    { id: 4, logo: PARTNERS.partner4, alt: "Partner 4" },
    { id: 5, logo: PARTNERS.partner5, alt: "Partner 5" },
    { id: 6, logo: PARTNERS.partner6, alt: "Partner 6" },
    { id: 7, logo: PARTNERS.partner7, alt: "Partner 7" },
    { id: 8, logo: PARTNERS.partner8, alt: "Partner 8" },
    { id: 9, logo: PARTNERS.partner9, alt: "Partner 9" },
  ];

  // Number of logos to show at once
  const logosPerView = 3;
  const totalSlides = Math.ceil(partners.length / logosPerView);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('left');
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      
      // After left slide, change direction to bottom for next transition
      setTimeout(() => {
        setDirection('bottom');
      }, 600);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Navigate to previous slide
  const handlePrevious = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Navigate to next slide
  const handleNext = () => {
    setDirection('bottom');
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Get current logos to display
  const startIndex = currentIndex * logosPerView;
  const currentLogos = partners.slice(startIndex, startIndex + logosPerView);

  return (
    <>
      <style>{animationStyles}</style>
      <section className="w-full h-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#7AB82E]">
            Nos partenaires
          </h2>

          {/* Carousel Container */}
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 md:left-8 z-10 p-2 rounded-full hover:bg-gray-200 transition-all text-black"
              aria-label="Previous partners"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Logos Container */}
            <div className="flex items-center justify-center gap-8 md:gap-16 w-full max-w-5xl px-16 md:px-24 overflow-hidden">
              <div 
                className="flex items-center justify-center gap-8 md:gap-16 w-full"
                key={currentIndex}
              >
                {currentLogos.map((partner, index) => (
                  <div
                    key={partner.id}
                    className={`flex-1 flex items-center justify-center ${
                      direction === 'left' 
                        ? `animate-slide-in-left logo-item-${index}` 
                        : direction === 'bottom' 
                        ? `animate-slide-in-bottom logo-item-${index}` 
                        : `animate-slide-in-right logo-item-${index}`
                    }`}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="w-full h-auto max-w-[200px] max-h-[80px] object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 md:right-8 z-10 p-2 rounded-full hover:bg-gray-200 transition-all text-black"
              aria-label="Next partners"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index ? 'bg-[#7AB82E]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EntreprisePartner;