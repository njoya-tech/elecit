import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors";
import { ICONS, IMAGES } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";

const ControlCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: IMAGES.IMG1 },
    { image: IMAGES.IMG2 },
    { image: IMAGES.IMG3 },
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* MAIN CAROUSEL SECTION */}
      <section
        className="w-screen py-12 sm:py-16 md:py-20 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
        style={{ backgroundColor: MY_COLORS.gray }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
          {/* Animated Gear Icons - Desktop Only */}
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -left-25 -top-35 z-0 w-40 opacity-100 animate-spin"
            style={{ animationDuration: "8s" }}
          />

          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 z-0 w-40 opacity-100 animate-spin"
            style={{ animationDuration: "10s" }}
          />

          {/* White Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT SIDE: Text */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex items-center justify-center order-2 lg:order-1">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                    “{t("control.carousel.quote")}”
                  </h2>
                </div>
              </div>

              {/* RIGHT SIDE: Carousel */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden order-1 lg:order-2">
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full">
                      <img
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white w-6 sm:w-8 h-2.5 sm:h-3"
                          : "bg-white/50 hover:bg-white/75 w-2.5 sm:w-3 h-2.5 sm:h-3"
                      }`}
                      aria-label={`${t("control.carousel.navigation.goToSlide")} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="hidden lg:block">
        <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0 md:top-20">
          <div className="w-full overflow-hidden" style={{ height: "440px" }}>
            <img
              src={ICONS.formePlan}
              className="w-full object-cover block"
              alt=""
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
            <img
              src={ICONS.formTech}
              alt=""
              aria-hidden="true"
              className="absolute z-0 pointer-events-none opacity-30 
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em] w-[150%] md:w-full lg:w-[80%]"
            />

            <h3
              className="relative z-20 text-center text-2xl 
              md:text-4xl lg:text-2xl xl:text-3xl 
              font-bold leading-tight mb-8 md:mb-10"
              style={{ color: MY_COLORS.white, top: "20%" }}
            >
              {t("control.carousel.cta.title")}{" "}
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                {t("control.carousel.cta.titleHighlight")}
              </span>
            </h3>

            <p className="text-center md:text-lg lg:text-xl
             text-white/90 max-w-2xl mx-auto mt-10">
              {t("control.carousel.cta.subtitle")}
            </p>

            <CTAButton
              className="absolute top-10 md:top-2 md:w-60"
              onClick={() => alert("Video clicked!")}
            >
              {t("control.carousel.cta.button")}
            </CTAButton>
          </div>

          {/* Decorative gears */}
          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40 animate-spin"
            style={{ animationDuration: "4s", top: "65%", right: "1%" }}
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
            style={{ animation: "rotateClockwise 20s linear infinite", top: "23%", left: "10%" }}
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

export default ControlCarousel;
