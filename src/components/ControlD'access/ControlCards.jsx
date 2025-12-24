/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useRef } from "react";
import { ICONS, IMAGES, OBJECTS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";

const ControlCards = () => {
  const carouselImages = [
    OBJECTS.obj_1,
    OBJECTS.obj_4,
    OBJECTS.obj_6,
    OBJECTS.obj_3,
  ];

  const slides = [carouselImages[carouselImages.length - 1], ...carouselImages];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const carouselRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev - 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(carouselImages.length);
      }, 500);
    } else {
      setTransitionEnabled(true);
    }
  }, [currentIndex, carouselImages.length]);

  const cards = [
    {
      icon: ICONS.badge,
      title: "Contrôle d'Accès Intelligent",
      features: [
        "Systèmes de badges, cartes RFID et biométrie",
        "Portails automatiques avec gestion des entrées et sorties",
        "Serrures électroniques et systèmes de verrouillage sécurisé",
      ],
    },
    {
      icon: ICONS.stockage,
      title: "Vidéosurveillance et Détection d'Intrusion",
      features: [
        "Installation de caméras haute définition et vidéosurveillance IP",
        "Systèmes de détection de mouvement et alarmes connectées",
        "Surveillance en temps réel et enregistrement sécurisé",
      ],
    },
    {
      icon: ICONS.securite_icon,
      title: "Sécurité et Gestion des Risques",
      features: [
        "Protection contre les intrusions, le vol et le vandalisme",
        "Solutions de cybersécurité pour les systèmes de contrôle d'accès",
        "Détection des incendies et intégration avec les systèmes d'alerte",
      ],
    },
    {
      icon: ICONS.decision_icon,
      title: "Gestion Centralisée et Automatisation",
      features: [
        "Supervision des accès via des logiciels de gestion",
        "Solutions cloud pour le contrôle à distance",
        "Historique des accès et rapports d'activité détaillés",
      ],
    },
  ];

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      {/* Section Header */}
      <div
        className="relative w-full mb-8 overflow-hidden"
        style={{ backgroundColor: MY_COLORS.black }}
      >
        <div className="absolute -top-10 right-0 w-1/3 h-full opacity-100 scale-125">
          <img src={ICONS.formTech} alt="" />
        </div>
        <h2
          className="relative text-3xl md:text-4xl lg:text-5xl font-bold px-8 py-6 md:py-8"
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          Nos prestations
        </h2>
      </div>

      {/* Subtitle */}
      <p
        className="text-center text-base md:text-lg lg:text-xl mb-12 md:mb-16 
        px-4 max-w-4xl mx-auto"
        style={{ color: MY_COLORS.black }}
      >
        Nous proposons des solutions performantes pour sécuriser les bâtiments,
        les infrastructures et les espaces sensibles.
      </p>

      {/* Main Grid Layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
        <div
          className="hidden md:block absolute left-1/2 
              top-0 bottom-0 w-px border-l-2 border-dotted -translate-x-1/2 z-0"
          style={{
            borderColor: MY_COLORS.secondaryGreen,
            left: "33.33%",
          }}
        ></div>

        {/* Left Featured Card */}
        <div className="lg:col-span-1">
          <div className="h-full flex flex-col justify-between min-h-[500px]">
            {/* Green Card with Carousel */}
            <div
              className="rounded-2xl p-8 md:p-12 shadow-lg mb-6 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${MY_COLORS.secondaryGreen} 
                0%, ${MY_COLORS.green} 100%)`,
              }}
            >
              <div
                className="w-[180px] md:w-[220px] 
              lg:w-[250px] h-[180px] md:h-[220px] 
              lg:h-[250px] flex items-center justify-center overflow-hidden relative"
              >
                <div
                  className="absolute top-0 left-0 w-full h-full flex"
                  ref={carouselRef}
                  style={{
                    transition: transitionEnabled
                      ? "transform 0.5s ease-in-out"
                      : "none",
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {slides.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Slide ${idx}`}
                      className="w-full h-full object-cover shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Title Text */}
            <h3
              className="text-center font-bold text-lg md:text-xl mb-4 px-4"
              style={{ color: MY_COLORS.green }}
            >
              Visite immersive de la boutique de vente de matériaux de
              construction et d'équipements électriques
            </h3>

            {/* Black Button */}
            <button
              className="px-8 py-3 rounded-full font-semibold 
              transition-opacity hover:opacity-90 flex items-center 
              justify-center mx-auto gap-2"
              style={{
                backgroundColor: MY_COLORS.black,
                color: MY_COLORS.white,
              }}
            >
              Mango boutique
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Cards Grid (2x2) */}
        <div className="lg:col-span-2 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Vertical Dotted Line */}
            <div
              className="hidden md:block absolute left-1/2 
              top-0 bottom-0 w-px border-l-2 border-dotted -translate-x-1/2 z-0"
              style={{ borderColor: MY_COLORS.secondaryGreen }}
            ></div>

            {/* Horizontal Dotted Line */}
            <div
              className="hidden md:block absolute left-0 right-0 top-1/2 
              h-px border-t-2 border-dotted -translate-y-1/2 z-0"
              style={{ borderColor: MY_COLORS.secondaryGreen }}
            ></div>

            {cards.map((card, index) => {
              const isTopRow = index < 2;

              return (
                <div
                  key={index}
                  className="relative rounded-xl p-4 md:p-6 pt-12 shadow-lg
                  hover:shadow-lg transition-shadow z-10"
                  style={{
                    backgroundColor: MY_COLORS.white,
                    border: `1px solid #e5e7eb`,
                    transform: isTopRow
                      ? "translateY(-10px)"
                      : "translateY(10px)",
                  }}
                >
                  {/* Badge Icon */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-28 
                    h-20 flex items-center justify-center"
                    style={{
                      top: "-35px",
                    }}
                  >
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-14 h-24 object-contain"
                      style={{
                        filter: `brightness(0) saturate(100%) invert(56%) 
                        sepia(18%) saturate(1367%) hue-rotate(34deg)
                        brightness(91%) contrast(87%)`,
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col items-center text-center">
                    <h3
                      className="text-lg md:text-xl font-bold mb-4"
                      style={{ color: MY_COLORS.black }}
                    >
                      {card.title}
                    </h3>
                    <div
                      className="space-y-2 text-sm md:text-base text-slate-950"
                      style={{ color: "#6b7280" }}
                    >
                      {card.features.map((feature, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {feature}
                          {idx < card.features.length - 1 && "/"}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Helmet Icon */}
          <div className="hidden xl:block absolute -right-54 top-1/2 -translate-y-1/2 z-0">
            <img
              src={ICONS.Casque}
              alt="Helmet decoration"
              className="w-36 h-36 opacity-100 animate-bounce"
              style={{
                animationDuration: "4s",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCards;
