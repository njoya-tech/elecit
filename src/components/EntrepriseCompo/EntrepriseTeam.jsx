import React, { useState, useEffect } from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton.jsx";
import { useTranslation } from 'react-i18next';

const EntrepriseTeam = () => {
  const { t } = useTranslation();
  const members = t('entreprise.entrepriseTeam.members', { returnObjects: true });

  const carouselSlides = [
    { image: IMAGES.IMG21, title: members[0].title },
    { image: IMAGES.IMG2, title: members[1].title },
    { image: IMAGES.IMG20, title: members[2].title },
    { image: IMAGES.IMG22, title: members[3].title },
    { image: IMAGES.IMG18, title: members[4].title },
    { image: IMAGES.IMG23, title: members[5].title },
    { image: IMAGES.IMG12, title: members[6].title },
    { image: IMAGES.IMG25, title: members[7].title },
    { image: IMAGES.IMG26, title: members[8].title },
    { image: IMAGES.IMG24, title: members[9].title },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="w-full py-8 sm:py-12 md:py-16"
      style={{ backgroundColor: MY_COLORS.white }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 items-center">
          {/* LEFT SIDE - Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-5 md:space-y-6 w-full">
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold"
              style={{ color: MY_COLORS.green }}
            >
              {t('entreprise.entrepriseTeam.title')}
            </h3>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: MY_COLORS.black }}
            >
              {t('entreprise.entrepriseTeam.subtitle')}
            </h2>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: MY_COLORS.black }}>
              {t('entreprise.entrepriseTeam.description')}
            </p>

            <ul
              className="space-y-1.5 sm:space-y-2 text-sm sm:text-base"
              style={{ color: MY_COLORS.black }}
            >
              {members.map((member, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{member.title}</span>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <CTAButton onClick={() => alert("Video clicked!")}>
                {t('entreprise.entrepriseTeam.button')}
              </CTAButton>
            </div>
          </div>

          {/* RIGHT SIDE - Carousel */}
          <div className="flex-1 relative px-4 sm:px-6 md:px-8 w-full">
            {/* TOP-RIGHT GEAR */}
            <div className="absolute -top-4 sm:-top-6 md:-top-8 -right-4 sm:-right-8 md:-right-16 lg:-right-20 xl:-right-25 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-[220px] xl:h-[220px] z-0 opacity-100">
              <img
                src={ICONS.Engrenage_plan}
                alt="gear decoration"
                className="w-full h-full"
                style={{
                  animation: "spin 5s linear infinite",
                }}
              />
            </div>

            {/* GREEN ROUNDED BLOCK (background) */}
            <div
              className="absolute top-4 sm:top-5 md:top-6 right-0 w-[70%] sm:w-[72%] h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-3xl sm:rounded-[35px] md:rounded-[40px]"
              style={{ backgroundColor: MY_COLORS.green }}
            ></div>

            {/* WHITE CARD WITH IMAGE */}
            <div className="relative w-[90%] sm:w-[92%] h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-3xl sm:rounded-[35px] md:rounded-[40px] shadow-xl overflow-hidden z-10 bg-white">
              {/* The carousel images */}
              <div className="relative w-full h-full">
                {carouselSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "translate-x-0"
                        : index < currentSlide
                        ? " -translate-x-full"
                        : "translate-x-full"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Text caption bar */}
                    <div
                      className="absolute top-4 sm:top-6 md:top-9 left-0 right-0 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
                    >
                      <h3
                        className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-all duration-700 ease-out ${
                          index === currentSlide
                            ? "translate-y-0 opacity-100 delay-700"
                            : "-translate-y-full opacity-0"
                        }`}
                        style={{ color: MY_COLORS.black }}
                      >
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM-LEFT GEAR */}
            <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 md:-left-3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] z-0 opacity-100">
              <img
                src={ICONS.Engrenage_plan}
                alt="gear decoration"
                className="w-full h-full"
                style={{
                  animation: "spin 8s linear infinite",
                }}
              />
            </div>

            {/* DOTS NAVIGATION */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 md:mt-8 relative z-10">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all hover:scale-125 cursor-pointer"
                  style={{
                    backgroundColor:
                      currentSlide === index ? MY_COLORS.green : "#D1D5DB",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE BUTTON - Shows only on mobile/tablet */}
        <div className="lg:hidden mt-8 flex justify-center">
          <CTAButton onClick={() => alert("Video clicked!")}>
            {t('entreprise.entrepriseTeam.button')}
          </CTAButton>
        </div>
      </div>

      {/* GREEN DASHED LINE SEPARATOR */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 mt-12 sm:mt-16 md:mt-20 lg:mt-26 lg:pt-1">
        <div
          className="w-full h-0.5"
          style={{
            backgroundImage: `repeating-linear-gradient(
        to right,
        ${MY_COLORS.green} 5px,
        ${MY_COLORS.green} 9px,
        transparent 1px,
        transparent 12px
            )`,
          }}
        />
      </div>
    </section>
  );
};

export default EntrepriseTeam;