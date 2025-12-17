import React, { useState, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors";
import { ICONS, IMAGES } from "../../asset/assets";
import CTAButton from "../CTA/CTAButton";

const ControlCarousel = () => {
  // STEP 6: Carousel state and logic
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: IMAGES.IMG1 },
    { image: IMAGES.IMG2 },
    { image: IMAGES.IMG3 },
  ];

  // Auto-play carousel - changes slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    // STEP 1: Outer Section - Full width, gray background
    <>
      <section
        className="w-screen py-20 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
        style={{
          backgroundColor: MY_COLORS.gray,
        }}
      >
        {/* STEP 2: Max-width wrapper - Centers content */}
        <div className="max-w-[1200px] mx-auto px-6 relative">
          {/* STEP 5: Animated Gear Icons */}
          {/* Top-Left Gear */}
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -left-20 top-8 z-0 w-20 opacity-100 animate-spin"
            style={{ animationDuration: "8s" }}
          />

          {/* Right-Middle Gear */}
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 z-0 w-24 opacity-100 animate-spin"
            style={{ animationDuration: "10s", animationDirection: "reverse" }}
          />

          {/* STEP 3: Single white container with rounded corners and shadow */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
            {/* STEP 4: Grid layout - splits into left and right */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT SIDE: Text Content */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    "Solutions adaptées
                    <br />
                    pour la{" "}
                    <span style={{ color: MY_COLORS.secondaryGreen }}>
                      sécurisation
                    </span>
                    <br />
                    des bureaux et locaux
                    <br />
                    professionnels, la
                    <br />
                    gestion des accès aux
                    <br />
                    immeubles et parkings
                    <br />
                    et une surveillance
                    <br />
                    avancée"
                  </h2>
                </div>
              </div>

              {/* RIGHT SIDE: Carousel */}
              <div className="relative h-96 lg:h-[600px] overflow-hidden">
                {/* Carousel Images - Swipe Animation */}
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

                {/* Carousel Indicators (Dots) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white w-8 h-3"
                          : "bg-white/50 hover:bg-white/75 w-3 h-3"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
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
              avec nos <span style={{color:MY_COLORS.secondaryGreen}}>solutions certifiées.</span>
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

export default ControlCarousel;
