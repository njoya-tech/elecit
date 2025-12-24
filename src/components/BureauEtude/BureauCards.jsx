import React from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";

const BureauCards = () => {
  const cards = [
    {
      title: "Études",
      subtitle: "& Conception",
      icon: ICONS.laptop,
      description:
        "Analyse des besoins et du programme architectural Études techniques Modélisation 2D/3D/ Planification, chiffrage prévisionnel et autorisations",
    },
    {
      title: "Gestion de Projet",
      subtitle: "& Suivi de Chantier",
      icon: ICONS.laptop,
      description:
        "Planification des travaux et coordination des intervenants Suivi de chantier, contrôles techniques et qualité Respect strict des délais et du budget contractuel Communication transparente avec le maître d'ouvrage",
    },
    {
      title: "Réalisation",
      subtitle: "& Livraison",
      icon: ICONS.laptop,
      description:
        "Travaux de gros œuvre et second œuvre Intégration des lots techniques (électricité, plomberie, CVC) Finitions intérieures et extérieures selon cahier des charges Reception des travaux",
    },
  ];

  return (
    <section
      className="w-full py-16"
      style={{ backgroundColor: MY_COLORS.white }}
      aria-labelledby="services-heading"
    >
      {/* TOP SECTION - Helmet + Title + Description */}
      <div className="max-w-[1200px] mr-36 px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 ">
          {/* Helmet Icon */}
          <div className="shrink-0">
            <img
              src={ICONS.Casque}
              alt="Casque de chantier"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40
                      animate-[bounce_3s_ease-in-out_infinite]"
            />
          </div>

          {/* Title and Description */}
          <div className="flex-1">
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 -mt-10 text-center"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              Nos prestations
            </h2>
            <p className="text-base md:text-lg text-gray-900 leading-relaxed text-center max-w-3xl mx-auto">
              De l'étude de faisabilité à la livraison clé en main, nous
              accompagnons nos clients à chaque étape du projet, en assurant un
              haut niveau de technicité et de <br/>conformité réglementaire.
            </p>
          </div>
        </div>
      </div>

      {/* BANNER IMAGE */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="w-full h-[200px] md:h-[280px] relative 
        overflow-hidden rounded-2xl shadow-xl">
          <img
            src={IMAGES.IMG8}
            alt="Vue d'ensemble d'un chantier de construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="max-w-[1200px] mx-auto px-6 relative">
        {/* Decorative Gear - Bottom Right */}
        <img
          src={ICONS.Engrenage_plan}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -right-20 bottom-10 z-0 w-32 opacity-100 pointer-events-none"
          style={{
            animation: "spin 8s linear infinite reverse",
            willChange: "transform",
          }}
        />

        {/* Cards Grid - Overlapping Banner */}
        <div className="relative -mt-24 md:-mt-32 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 justify-items-center">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative flex justify-center w-full max-w-xs"
              >
                {/* Icon Badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 duration-300"
                    style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                    aria-hidden="true"
                  >
                    <img
                      src={card.icon}
                      alt=""
                      className="brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Card */}
                <article
                  className="mt-4 md:mt-0 bg-white rounded-2xl shadow-lg w-full 
                p-6 md:p-8 pt-10 md:pt-12 text-center hover:shadow-xl 
                transition-all duration-300 hover:-translate-y-1"
                >
                  <header className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {card.title}
                    </h3>
                    <h4 className="text-lg font-bold text-slate-900">
                      {card.subtitle}
                    </h4>
                  </header>
                  <p className="text-sm text-slate-900 leading-relaxed text-center">
                    {card.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT SHOWCASE SECTION */}
      <div className="max-w-[1200px] mx-auto px-6 mt-24">
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <img
            src={IMAGES.IMG4}
            alt="Chantier de construction d'un hangar"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col 
          justify-center px-8 md:px-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-15 lg:-mt-20">
              <span style={{ color: MY_COLORS.secondaryGreen }}>PROJET:</span>{" "}
              <span className="text-white">Construction hangar</span>
            </h2>

            <p className="text-white text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Qu'il s'agisse de bâtiments publics, résidentiels, scolaires ou
              industriels, chaque ouvrage témoigne de notre engagement pour
              l'excellence, du respect des délais et des normes les plus
              exigeantes.
            </p>

            <div>
              <button
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    MY_COLORS.secondaryGreen;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#0f172a";
                }}
              >
                Voir le projet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BureauCards;
