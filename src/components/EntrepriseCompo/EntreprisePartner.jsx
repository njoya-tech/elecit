import React, { useState, useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors";
import { PARTNERS, ICONS } from "../../asset/assets.js";
import CTAButton from "../CTA/CTAButton.jsx";

// ============================================================================
// CONSTANTS - Extract all magic numbers
// ============================================================================
const ANIMATION_CONFIG = {
  exitDuration: 600, // ms - must match CSS animation
  autoPlayInterval: 4000, // ms
  staggerDelay: 120, // ms per item
};

const CAROUSEL_CONFIG = {
  logosPerView: 3,
  logosPerViewMobile: 1,
};

// ============================================================================
// CSS ANIMATIONS
// ============================================================================
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

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-slide-out-right {
    animation: slideOutRight ${
      ANIMATION_CONFIG.exitDuration
    }ms ease-in-out forwards;
  }

  .animate-slide-in-bottom {
    animation: slideInBottom 0.6s ease-out forwards;
  }

  .logo-item-0 { animation-delay: 0ms; }
  .logo-item-1 { animation-delay: ${ANIMATION_CONFIG.staggerDelay}ms; }
  .logo-item-2 { animation-delay: ${ANIMATION_CONFIG.staggerDelay * 2}ms; }
`;

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================
const ArrowButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === "left";
  const arrowPath = isLeft ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`${isLeft ? "Previous" : "Next"} slide`}
      className={`
        absolute ${isLeft ? "left-0 md:left-8" : "right-0 md:right-8"} 
        z-10 p-2 rounded-full 
        hover:bg-gray-200 active:bg-gray-300
        transition-all text-black 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-[#7AB82E] focus:ring-offset-2
      `}
    >
      <svg
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d={arrowPath} />
      </svg>
    </button>
  );
};

const DotIndicator = ({ total, current, onSelect, disabled }) => (
  <div
    className="flex justify-center gap-2 mt-12"
    role="tablist"
    aria-label="Carousel navigation"
  >
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        disabled={disabled}
        role="tab"
        aria-selected={current === index}
        aria-label={`Go to slide ${index + 1}`}
        className={`
          w-2.5 h-2.5 rounded-full transition-all
          focus:outline-none focus:ring-2 focus:ring-[#7AB82E] focus:ring-offset-2
          disabled:cursor-not-allowed
          ${
            current === index
              ? "bg-[#7AB82E] scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }
        `}
      />
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const EnterprisePartners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Partner data with better alt text
  const partners = [
    { id: 1, logo: PARTNERS.partner1, alt: "Partner company logo 1" },
    { id: 2, logo: PARTNERS.partner2, alt: "Partner company logo 2" },
    { id: 3, logo: PARTNERS.partner3, alt: "Partner company logo 3" },
    { id: 4, logo: PARTNERS.partner4, alt: "Partner company logo 4" },
    { id: 5, logo: PARTNERS.partner5, alt: "Partner company logo 5" },
    { id: 6, logo: PARTNERS.partner6, alt: "Partner company logo 6" },
    { id: 7, logo: PARTNERS.partner7, alt: "Partner company logo 7" },
    { id: 8, logo: PARTNERS.partner8, alt: "Partner company logo 8" },
    { id: 9, logo: PARTNERS.partner9, alt: "Partner company logo 9" },
  ];

  const totalSlides = Math.ceil(partners.length / CAROUSEL_CONFIG.logosPerView);

  // Transition handler with proper cleanup
  const performTransition = (nextIndex) => {
    if (isExiting) return;

    setIsExiting(true);

    // Clear any existing timeout to prevent memory leaks
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayIndex(nextIndex);
      setCurrentIndex(nextIndex);
      setIsExiting(false);
    }, ANIMATION_CONFIG.exitDuration);
  };

  // Auto-cycle with pause functionality
  useEffect(() => {
    if (isPaused || isExiting) return;

    const interval = setInterval(() => {
      const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      performTransition(nextIndex);
    }, ANIMATION_CONFIG.autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isExiting, isPaused]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startIndex = displayIndex * CAROUSEL_CONFIG.logosPerView;
  const currentLogos = partners.slice(
    startIndex,
    startIndex + CAROUSEL_CONFIG.logosPerView
  );

  const handlePrevious = () => {
    performTransition(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    performTransition(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  return (
    <>
      <style>{animationStyles}</style>

      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* SECTION TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#7AB82E]">
            Nos partenaires
          </h2>

          {/* CAROUSEL */}
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Partner logos carousel"
            role="region"
          >
            {/* LEFT ARROW */}
            <ArrowButton
              direction="left"
              onClick={handlePrevious}
              disabled={isExiting}
            />

            {/* LOGO LIST */}
            <div className="flex items-center justify-center w-full max-w-5xl px-16 md:px-24 overflow-hidden relative min-h-[100px]">
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
                      !isExiting
                        ? `animate-slide-in-bottom logo-item-${index}`
                        : ""
                    }`}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="w-full h-auto max-w-[200px] max-h-[80px] object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ARROW */}
            <ArrowButton
              direction="right"
              onClick={handleNext}
              disabled={isExiting}
            />
          </div>

          {/* DOTS INDICATOR */}
          <DotIndicator
            total={totalSlides}
            current={currentIndex}
            onSelect={performTransition}
            disabled={isExiting}
          />

          {/* CTA SECTION - PURE TAILWIND */}
          {/* CTA SECTION - PNG background + real content */}
          <div className="relative mt-32 lg:mt-40 mx-auto w-[90%] lg:w-4/5 max-w-6xl">
            {/* BLACK BLOCK PNG - Background layer */}
            <img
              src={ICONS.formePlan}
              alt=""
              aria-hidden="true"
              className="w-full "
              style={{
                height:"50%",
                width:"100%",
                objectFit:"cover",
                

              }}
            />

            {/* CONTENT OVERLAY - Positioned absolutely on top of PNG */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
              {/* TECH PATTERN - Behind text */}
              <img
              style={{
                top:"12em",
                width:"85%"
              }}
                src={ICONS.formTech}
                alt=""
                aria-hidden="true"
                className="absolute z-0 pointer-events-none opacity-30 
             top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em]  // Use Tailwind transform
             w-[150%] md:w-[100%] lg:w-[180%] h-auto"
              />

              {/* TEXT */}
              <h3
                className="relative z-20 text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8 md:mb-12"
                style={{ color: MY_COLORS.white,
                  top:"-25%"
                 }}
              >
                Vous avez une idée ?<br />
                Nous avons les{" "}
                <span style={{ color: MY_COLORS.green }}>solutions</span>.
              </h3>

              {/* BUTTON */}
              <CTAButton
              className=" absolute -top-40 "
               onClick={() => alert("Video clicked!")}>
              Contactez Nous
             </CTAButton>
            </div>

            {/* ROTATING GEAR - Top priority overlay */}
            <div
              className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-50"
              style={{
                animation: "rotateClockwise 8s linear infinite",
                top: "40%",
                right: "1%",

              }}
              aria-hidden="true"
             >
              <img
                src={ICONS.Engrenage_plan}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div
              className="absolute w-24 h-24 md:w-16 md:h-16 lg:w-32 lg:h-32 z-40"
              style={{
                animation: "rotateClockwise 20s linear infinite",
                top: "7%",
                left: "7%",
              }}
              aria-hidden="true"
             >
              <img
                src={ICONS.Engrenage_plan}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterprisePartners;
