import React, { useState, useEffect } from "react";
import { IMAGES, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton";

const BureauCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Step 3: Carousel Data - Array of hydraulic projects
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

  // Calculate how many slides we have (groups of 3)
  const slidesCount = Math.ceil(projects.length / 3);
  const cardsPerSlide = 3;

  // Step 2: Auto-play carousel (infinite loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slidesCount]);

  // Step 5: Carousel Logic - Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      // Step 1: Section Container - Gray background with padding on sides
      <section
        className="w-screen py-20 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
        style={{
          backgroundColor: MY_COLORS.gray,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Step 2: Title Component - Changed to h3 */}
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            Types d'ouvrages hydrauliques
            <br />
            pris en charge
          </h3>

          {/* Step 3-5: Carousel Container with Navigation */}
          <div className="relative">
            {/* Step 6: Arrow Navigation - Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 bg-white rounded-full p-3 shadow-lg transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-gray-700"
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

            {/* Step 4: Cards Grid - Swipe right to left with bottom-to-top reveal */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Render all slides */}
                {Array.from({ length: slidesCount }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                  >
                    {projects
                      .slice(
                        slideIndex * cardsPerSlide,
                        slideIndex * cardsPerSlide + cardsPerSlide
                      )
                      .map((project, cardIndex) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={cardIndex}
                          isActive={slideIndex === currentSlide}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 6: Arrow Navigation - Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 
            translate-x-4 md:translate-x-12 z-20 bg-white rounded-full
             p-3 shadow-lg transition-all duration-300"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-gray-700"
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

          {/* Step 7: Pagination Dots */}
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
          {/* BLACK BLOCK PNG - Background layer */}
          <div
            className="w-full overflow-hidden"
            style={{
              height: "440px",
            }}
          >
            <img
              src={ICONS.formePlan}
              className="w-full object-cover block"
              alt=""
            />
          </div>

          {/* CONTENT OVERLAY - Positioned absolutely on top of PNG */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
            {/* TECH PATTERN - Behind text */}
            <img
              style={{
                top: "12em",
                width: "85%",
              }}
              src={ICONS.formTech}
              alt=""
              aria-hidden="true"
              className="absolute z-0 pointer-events-none opacity-30 
             top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em]  // Use Tailwind transform
             w-[150%] md:w-full lg:w-[180%] h-auto"
            />

            {/* TEXT */}
            <h3
              className="relative z-20 text-center text-2xl 
            md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
              style={{ color: MY_COLORS.white, top: "24%" }}
            >
              Sécurisez vos bâtiments <br />
              avec nos{" "}
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                solutions certifiées.
              </span>
            </h3>

            {/* Subtitle/Description */}
            <p
              className="text-center md:text-lg lg:text-xl text-white/90 
           max-w-2xl mx-auto mt-15"
            >
              Protégez efficacement vos locaux et contrôlez les accès avec des
              solutions de sécurité performantes !
            </p>

            {/* BUTTON */}
            <CTAButton
              className=" absolute top-10 "
              onClick={() => alert("Video clicked!")}
            >
              Contactez Nous
            </CTAButton>
          </div>

          {/* ROTATING GEAR - Top priority overlay */}
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
    </>
  );
};

// Step 4: Card Component - Bottom-to-top reveal animation with staggered delays
const ProjectCard = ({ project, index, isActive }) => {
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  return (
    <>
      <section className={`
      relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg
      ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      transition-all duration-700 ease-out delay-[${index * 200}ms]
    `}>
        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Project Title */}
        <div className="absolute bottom-6 left-6 z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {project.title}
          </h3>
        </div>
      </section>
    </>
  );
};

export default BureauCarousel;
