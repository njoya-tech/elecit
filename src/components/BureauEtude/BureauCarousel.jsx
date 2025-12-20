import React, { useState, useEffect } from "react";
import { IMAGES, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton";

const BureauCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const projects = [
    {
      id: 1,
      title: "Tunnel",
      image: IMAGES.IMG1,
    },
    {
      id: 2,
      title: "Barrage",
      image: IMAGES.IMG2,
    },
    {
      id: 3,
      title: "Forage",
      image: IMAGES.IMG3,
    },
    {
      id: 4,
      title: "Canal",
      image: IMAGES.IMG4,
    },
    {
      id: 5,
      title: "Pompage",
      image: IMAGES.IMG5,
    },
    {
      id: 6,
      title: "Drainage",
      image: IMAGES.IMG6,
    },
  ];

  const slidesCount = Math.ceil(projects.length / 3);
  const cardsPerSlide = 3;

  // Create extended slides array (duplicate first slide at end)
  const extendedSlidesCount = slidesCount + 1;

  const nextSlide = () => {
    if (isTransitioning) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle seamless infinite loop
  useEffect(() => {
    if (currentSlide === slidesCount) {
      // Wait for transition to complete
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setCurrentSlide(0); // Jump to real first slide instantly
        // Re-enable transition after jump
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentSlide, slidesCount]);

 

  const prevSlide = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(slidesCount);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(slidesCount - 1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  return (
    <>
      <section
        className="w-screen py-20 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
        style={{
          backgroundColor: MY_COLORS.gray,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            Types d'ouvrages hydrauliques
            <br />
            pris en charge
          </h3>

          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-16 z-20 transition-all duration-300 hover:scale-125"
              aria-label="Previous slide"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-gray-700 hover:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Render all original slides + duplicate first slide at end */}
                {Array.from({ length: extendedSlidesCount }).map((_, slideIndex) => {
                  // For the last slide, show first slide content (duplicate)
                  const actualSlideIndex = slideIndex === slidesCount ? 0 : slideIndex;
                  
                  return (
                    <div
                      key={slideIndex}
                      className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                      {projects
                        .slice(
                          actualSlideIndex * cardsPerSlide,
                          actualSlideIndex * cardsPerSlide + cardsPerSlide
                        )
                        .map((project, cardIndex) => (
                          <ProjectCard
                            key={`${slideIndex}-${project.id}`}
                            project={project}
                            index={cardIndex}
                            isActive={slideIndex === currentSlide}
                          />
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-16 z-20 transition-all duration-300 hover:scale-125"
              aria-label="Next slide"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-gray-700 hover:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: slidesCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-3 h-3" : "w-2.5 h-2.5"
                }`}
                style={{
                  backgroundColor:
                    currentSlide === index
                      ? MY_COLORS.secondaryGreen
                      : "#9ca3af",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0">
          <div className="w-full overflow-hidden" style={{ height: "440px" }}>
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
              className="absolute z-0 pointer-events-none opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em] w-[150%] md:w-full lg:w-[180%] h-auto"
            />

            <h3
              className="relative z-20 text-center text-2xl md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
              style={{ color: MY_COLORS.white, top: "24%" }}
            >
              Sécurisez vos bâtiments <br />
              avec nos{" "}
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                solutions certifiées.
              </span>
            </h3>

            <p className="text-center md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mt-15">
              Protégez efficacement vos locaux et contrôlez les accès avec des
              solutions de sécurité performantes !
            </p>

            <CTAButton
              className="absolute top-10"
              onClick={() => alert("Video clicked!")}
            >
              Contactez Nous
            </CTAButton>
          </div>

          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40"
            style={{
              animation: "rotateClockwise 8s linear infinite",
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

      <style jsx>{`
        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

const ProjectCard = ({ project, index, isActive }) => {
  // Use derived value instead of state + effect
  const shouldAnimate = isActive;

  return (
    <article
      className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
      style={{
        opacity: shouldAnimate ? 1 : 0,
        transform: shouldAnimate ? 'translateY(0)' : 'translateY(48px)',
        transition: `all 0.7s ease-out ${index * 200}ms`,
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300"></div>

      <div className="absolute bottom-6 left-6 z-10">
        <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
          {project.title}
        </h4>
      </div>
    </article>
  );
};


export default BureauCarousel;