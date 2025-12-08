import React, { useState, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors";
import { PARTNERS } from "../../asset/assets.js";

// Add CSS animations in a style tag
const animationStyles = `
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes slideInBottom {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-out-right {
    animation: slideOutRight 0.6s ease-in-out forwards;
  }

  .animate-slide-in-bottom {
    animation: slideInBottom 0.6s ease-out forwards;
  }

  .logo-item-0 { animation-delay: 0ms; }
  .logo-item-1 { animation-delay: 120ms; }
  .logo-item-2 { animation-delay: 240ms; }
`;

const EntreprisePartner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const partners = [
    { id: 1, logo: PARTNERS.partner1, alt: "Partner 1" },
    { id: 2, logo: PARTNERS.partner2, alt: "Partner 2" },
    { id: 3, logo: PARTNERS.partner3, alt: "Partner 3" },
    { id: 4, logo: PARTNERS.partner4, alt: "Partner 4" },
    { id: 5, logo: PARTNERS.partner5, alt: "Partner 5" },
    { id: 6, logo: PARTNERS.partner6, alt: "Partner 6" },
    { id: 7, logo: PARTNERS.partner7, alt: "Partner 7" },
    { id: 8, logo: PARTNERS.partner8, alt: "Partner 8" },
    { id: 9, logo: PARTNERS.partner9, alt: "Partner 9" }
  ];

  const logosPerView = 3;
  const totalSlides = Math.ceil(partners.length / logosPerView);

  const performTransition = (nextIndex) => {
    if (isExiting) return;

    setIsExiting(true);

    setTimeout(() => {
      setDisplayIndex(nextIndex);
      setCurrentIndex(nextIndex);
      setIsExiting(false);
    }, 600);
  };

  // Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      performTransition(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isExiting]);

  const startIndex = displayIndex * logosPerView;
  const currentLogos = partners.slice(startIndex, startIndex + logosPerView);

  return (
    <>
      <style>{animationStyles}</style>

      <section className="w-full h-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#7AB82E]">
            Nos partenaires
          </h2>

          <div className="relative flex items-center justify-center">

            {/* LEFT ARROW */}
            <button
              onClick={() => performTransition(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1)}
              disabled={isExiting}
              className="absolute left-0 md:left-8 z-10 p-2 rounded-full hover:bg-gray-200 transition-all text-black disabled:opacity-50"
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* LOGO LIST */}
            <div className="flex items-center justify-center w-full max-w-5xl px-16 md:px-24 overflow-hidden relative"
              style={{ minHeight: "100px" }}
            >
              <div
                className={`flex items-center justify-center gap-8 md:gap-16 w-full ${
                  isExiting ? "animate-slide-out-right" : ""
                }`}
                key={displayIndex}
              >
                {currentLogos.map((partner, index) => (
                  <div
                    key={partner.id}
                    className={`flex-1 flex items-center justify-center ${
                      !isExiting ? `animate-slide-in-bottom logo-item-${index}` : ""
                    }`}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="w-full h-auto max-w-[200px] max-h-[80px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={() => performTransition(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1)}
              disabled={isExiting}
              className="absolute right-0 md:right-8 z-10 p-2 rounded-full hover:bg-gray-200 transition-all text-black disabled:opacity-50"
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => performTransition(index)}
                disabled={isExiting}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index ? "bg-[#7AB82E]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EntreprisePartner;
