import React, { useState, useEffect, useRef } from "react";
import { MY_COLORS } from "../../constants/colors";
import { PARTNERS, ICONS } from "../../asset/assets.js";
import CTAButton from "../CTA/CTAButton.jsx";
import { useTranslation } from 'react-i18next';

// ============================================================================
// CONSTANTS
// ============================================================================
const ANIMATION_CONFIG = {
  exitDuration: 600,
  autoPlayInterval: 4000,
  staggerDelay: 120,
};

const CAROUSEL_CONFIG = {
  logosPerView: 3,
  logosPerViewMobile: 1,
};

// ============================================================================
// CSS ANIMATIONS
// ============================================================================
const animationStyles = `
  @keyframes slideOutLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  @keyframes slideUpReveal {
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

  .animate-slide-out-left {
    animation: slideOutLeft ${
      ANIMATION_CONFIG.exitDuration
    }ms ease-in-out forwards;
  }

  .animate-slide-up-reveal {
    opacity: 0;
    animation: slideUpReveal 0.6s ease-out forwards;
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
        absolute ${
          isLeft
            ? "left-0 sm:left-2 md:left-4 lg:left-8"
            : "right-0 sm:right-2 md:right-4 lg:right-8"
        } 
        z-10 p-1.5 sm:p-2 rounded-full 
        hover:bg-gray-200 active:bg-gray-300
        transition-all text-black 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-[#7AB82E] focus:ring-offset-2
      `}
    >
      <svg
        width="24"
        height="24"
        className="sm:w-8 sm:h-8"
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
    className="flex justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-10 md:mt-12"
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
          w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all
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
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

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

  const performTransition = (targetIndex) => {
    if (isExiting) return;

    setIsExiting(true);
    setNextIndex(targetIndex);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsExiting(false);
    }, ANIMATION_CONFIG.exitDuration);
  };

  useEffect(() => {
    if (isPaused || isExiting) return;

    const interval = setInterval(() => {
      const nextIdx = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
      performTransition(nextIdx);
    }, ANIMATION_CONFIG.autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isExiting, isPaused]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const currentStartIndex = currentIndex * CAROUSEL_CONFIG.logosPerView;
  const currentLogos = partners.slice(
    currentStartIndex,
    currentStartIndex + CAROUSEL_CONFIG.logosPerView
  );

  const nextStartIndex = nextIndex * CAROUSEL_CONFIG.logosPerView;
  const nextLogos = partners.slice(
    nextStartIndex,
    nextStartIndex + CAROUSEL_CONFIG.logosPerView
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

      <section className="w-full bg-white p-0 m-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* SECTION TITLE */}
          <h2
            style={{
              color: MY_COLORS.secondaryGreen,
              marginTop: "20px",
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16"
          >
            {t('entreprise.entreprisePartner.title')}
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
            <div className="flex items-center justify-center w-full max-w-5xl px-8 sm:px-12 md:px-16 lg:px-24 overflow-hidden relative min-h-[80px] sm:min-h-[100px]">
              {/* CURRENT SLIDE */}
              <div
                className={`flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 w-full ${
                  isExiting ? "animate-slide-out-left" : ""
                }`}
              >
                {currentLogos.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex-1 flex items-center justify-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.alt}
                      className="w-full h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] max-h-[60px] sm:max-h-[70px] md:max-h-[80px] object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* NEXT SLIDE */}
              {isExiting && (
                <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 w-full">
                  {nextLogos.map((partner, idx) => (
                    <div
                      key={partner.id}
                      className="flex-1 flex items-center justify-center"
                      style={{
                        animation: `slideUpReveal 0.6s ease-out forwards`,
                        animationDelay: `${
                          idx * ANIMATION_CONFIG.staggerDelay
                        }ms`,
                        opacity: 0,
                      }}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.alt}
                        className="w-full h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px] max-h-[60px] sm:max-h-[70px] md:max-h-[80px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
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

          {/* ============================================ */}
          {/* CTA SECTION WITH BACKGROUND                 */}
          {/* ============================================ */}
          <section className="hidden lg:block">
            <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0 top-20">
              <div
                className="w-full overflow-hidden"
                style={{ height: "440px" }}
              >
                <img
                  src={ICONS.formePlan}
                  className="w-full object-cover block"
                  alt=""
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
                <img
                  style={{
                    top: "12em",
                    width: "85%",
                  }}
                  src={ICONS.formTech}
                  alt=""
                  aria-hidden="true"
                  className="absolute z-0 pointer-events-none opacity-30
                   top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em] 
                   w-[150%] md:w-full lg:w-[180%] h-auto"
                />

                <h3
                  className="relative z-20 text-center text-2xl
                   md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
                  style={{ color: MY_COLORS.white, top: "24%" }}
                >
                  {t('entreprise.entreprisePartner.ctaTitle')} <br /> 
                  {t('entreprise.entreprisePartner.ctaTitle2')}{" "}
                  <span style={{ color: MY_COLORS.secondaryGreen }}>
                    {t('entreprise.entreprisePartner.ctaHighlight')}
                  </span>
                  .
                </h3>

                <CTAButton
                  className="absolute top-10 md:top-15 md:w-60"
                  onClick={() => alert("Video clicked!")}
                >
                  {t('entreprise.entreprisePartner.ctaButton')}
                </CTAButton>
              </div>

              <div
                className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40 animate-spin"
                style={{
                  animationDuration: "4s",
                  top: "65%",
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
                className="absolute w-24 h-24 md:w-16 md:h-16 lg:w-16 lg:h-16 z-40"
                style={{
                  animation: "rotateClockwise 20s linear infinite",
                  top: "23%",
                  left: "10%",
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
          </section>
        </div>
      </section>
    </>
  );
};

export default EnterprisePartners;