import React, { useState, useEffect } from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton.jsx";

const EntrepriseTeam = () => {
  // 📸 CAROUSEL DATA - Array of slides (images + titles)
  const carouselSlides = [
    { image: IMAGES.IMG1, title: "Domoticiens" },
    { image: IMAGES.IMG2, title: "Mécatroniciens" },
    { image: IMAGES.IMG3, title: "Gestionnaires de flotte" },
    { image: IMAGES.IMG4, title: "Ingénieurs informatique" },
    { image: IMAGES.IMG5, title: "Ingénieur génie civil" },
    { image: IMAGES.IMG6, title: "Techniciens de fabrication" },
    { image: IMAGES.IMG7, title: "Techniciens informatique" },
    { image: IMAGES.IMG8, title: "Agents de maintenance" },
    { image: IMAGES.IMG9, title: "Ingénieurs énergie renouvelable" },
    { image: IMAGES.IMG10, title: "Techniciens courant fort et faible" },
  ];

  // 🎯 STATE - Which slide are we showing? (starts at 0)
  const [currentSlide, setCurrentSlide] = useState(0);

  // ⏰ AUTO-SLIDE - Change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // Go to next slide (loop back to 0 when we reach the end)
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up timer when component unmounts
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  // 🖱️ CLICK DOT - Jump to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="w-full py-16"
      style={{ backgroundColor: MY_COLORS.white }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* 📝 LEFT SIDE - Text Content */}
          <div className="flex-1 space-y-6">
            <h3
              className="text-2xl font-bold"
              style={{ color: MY_COLORS.green }}
            >
              L'équipe
            </h3>

            <h2
              className="text-4xl font-bold leading-tight"
              style={{ color: MY_COLORS.black }}
            >
              Ces acteurs là qui s'unissent pour répondre à vos besoins
            </h2>

            <p className="text-lg leading-relaxed" style={{ color: "#666666" }}>
              Nous mobilisons les bonnes compétences au bon moment. Cette
              richesse humaine et technique nous permet de répondre avec agilité
              et précision aux enjeux les plus variés de nos clients, du conseil
              à la réalisation.
            </p>

            <ul
              className="space-y-2 text-base"
              style={{ color: MY_COLORS.black }}
            >
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Domoticiens</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mécatroniciens</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Gestionnaires de flotte</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ingénieurs informatique</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ingénieurs génie civil</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Techniciens de fabrication</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Techniciens informatique</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Agents de maintenance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ingénieurs énergie renouvelable</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Techniciens courant fort et faible</span>
              </li>
            </ul>

            <CTAButton onClick={() => alert("Video clicked!")}>
          Publireportage
        </CTAButton>
          </div>

          {/* 🎠 RIGHT SIDE - Carousel */}
          <div className="flex-1 relative px-8">
            {/* ⚙️ TOP-RIGHT GEAR - FIXED Z-INDEX */}
            <div className="absolute -top-8 -right-25 w-[220px] h-[220px] z-0 opacity-100">
              <img
                src={ICONS.Engrenage_plan}
                alt="gear decoration"
                className="w-full h-full"
                style={{
                  animation: "spin 5s linear infinite",
                }}
              />
            </div>

            {/* 🟢 GREEN ROUNDED BLOCK (background) */}
            <div
              className="absolute top-6 right-0 w-[72%] h-[450px] rounded-[40px]"
              style={{ backgroundColor: MY_COLORS.green }}
            ></div>

            {/* ⚪ WHITE CARD WITH IMAGE */}
            <div className="relative w-[92%] h-[450px] rounded-[40px] shadow-xl overflow-hidden z-10 bg-white">
              {/* 🖼️ The carousel images - with slide animation */}
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

                    {/* 📝 Text caption bar - MOVED TO TOP FOR BETTER VISIBILITY */}
                    <div
                      className="absolute top-9 left-0 right-0 px-6 py-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
                    >
                      <h3
                        className={`text-xl font-bold transition-all duration-700 ease-out ${
                          index === currentSlide
                            ? "translate-y-0 opacity-100 delay-3500"
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

            {/* ⚙️ BOTTOM-LEFT GEAR - BEHIND CAROUSEL */}
            <div className="absolute -bottom-2 -left-3 w-[100px] h-[100px] z-0 opacity-100">
              <img
                src={ICONS.Engrenage_plan}
                alt="gear decoration"
                className="w-full h-full"
                style={{
                  animation: "spin 8s linear infinite",
                }}
              />
            </div>

            {/* ⚫ DOTS NAVIGATION */}
            <div className="flex justify-center gap-2 mt-8 relative z-10">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="w-2.5 h-2.5 rounded-full transition-all hover:scale-125 cursor-pointer"
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
      </div>

      {/* 🟢 GREEN DASHED LINE SEPARATOR */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 mt-26 lg:pt-1">
        <div
          className="w-full h-0.5 -top-10"
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
