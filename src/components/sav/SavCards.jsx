import React from "react";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors";

const SavCards = () => {
  const cards = [
    {
      title: "Études",
      subtitle: "& Conception",
      icon: ICONS.laptop,
      description:
        "Analyse des besoins et du programme architectural/ Études techniques/ Modélisation 2D/3D/ Planification, chiffrage prévisionnel et autorisations",
    },
    {
      title: "Gestion de Projet",
      subtitle: "& Suivi de Chantier",
      icon: ICONS.laptop,
      description:
        "Planification des travaux et coordination des intervenants/ Suivi de chantier, contrôles techniques et qualité/ Respect strict des délais et du budget contractuel/ Communication transparente avec le maître d'ouvrage",
    },
    {
      title: "Réalisation",
      subtitle: "& Livraison",
      icon: ICONS.laptop,
      description:
        "Travaux de gros œuvre et second œuvre/ Intégration des lots techniques (électricité, plomberie, CVC)/ Finitions intérieures et extérieures selon cahier des charges/ Reception des travaux",
    },
    {
      title: "Maintenance",
      subtitle: "& Rénovation",
      icon: ICONS.laptop,
      description:
        "Entretien préventif et curatif des bâtiments/ Rénovation et mise aux normes/ Amélioration énergétique/ Service après-vente et garantie décennale",
    },
    {
      title: "Conseil",
      subtitle: "& Expertise",
      icon: ICONS.laptop,
      description:
        "Audit technique et diagnostic immobilier/ Conseil en maîtrise d'ouvrage/ Assistance juridique et administrative/ Optimisation des coûts de construction",
    },
    {
      title: "Solutions",
      subtitle: "Clé en Main",
      icon: ICONS.laptop,
      description:
        "Prise en charge complète du projet/ Coordination de tous les corps de métier/ Garantie unique et responsabilité globale/ Livraison dans les délais convenus",
    },
  ];

  return (
    <section
  className="w-full py-16"
  style={{ backgroundColor: MY_COLORS.white }}
  aria-labelledby="services-heading"
>
  {/* TOP SECTION */}
  <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 mb-12">
    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
      {/* Helmet Icon */}
      <div className="shrink-0">
        <img
          src={ICONS.Casque}
          alt="Casque de chantier"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 
          lg:w-40 lg:h-40 animate-[bounce_3s_ease-in-out_infinite]"
        />
      </div>

      {/* Title & Description */}
      <div className="flex-1 text-center md:text-left">
        <h2
          id="services-heading"
          className="text-2xl sm:text-3xl sm:text-center md:text-4xl
           lg:text-5xl font-bold mb-4 lg:mr-50"
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          Nos prestations
        </h2>
        <p className="text-sm sm:text-center md:text-lg
         text-gray-900 leading-relaxed max-w-3xl mx-auto md:mx-0">
          De l'étude de faisabilité à la livraison clé en main, nous
          accompagnons nos clients à chaque étape du projet, en assurant un
          haut niveau de technicité et de conformité réglementaire.
        </p>
      </div>
    </div>
  </div>

  {/* BANNER IMAGE */}
  <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 mb-16">
    <div className="w-full h-[180px] sm:h-[200px] md:h-[280px] 
    relative overflow-hidden rounded-2xl shadow-xl">
      <img
        src={IMAGES.IMG8}
        alt="Vue d'ensemble d'un chantier de construction"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>

  {/* CARDS SECTION */}
  <div className="max-w-full sm:max-w-[1200px] mx-auto px-4 sm:px-6 relative">
    {/* Decorative Gears */}
    <img
      src={ICONS.Engrenage_plan}
      alt=""
      aria-hidden="true"
      className="hidden lg:block absolute -right-12 bottom-2 z-0 w-32 lg:w-48 opacity-100 pointer-events-none"
      style={{ animation: "spin 8s linear infinite reverse", willChange: "transform" }}
    />
    <img
      src={ICONS.Engrenage_plan}
      alt=""
      aria-hidden="true"
      className="hidden lg:block absolute right-5 -bottom-12 z-0 w-20 lg:w-24 opacity-100 pointer-events-none"
      style={{ animation: "spin 8s linear infinite reverse", willChange: "transform" }}
    />

    {/* Cards Grid */}
    <div className="relative -mt-10 sm:-mt-24 md:-mt-22 z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {cards.map((card, index) => (
          <div key={index} className="relative flex justify-center">
            {/* Icon Badge */}
            <div className="absolute -top-2 md:-top-10 left-1/2 -translate-x-1/2 z-20">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 
                md:w-16 md:h-16 rounded-full flex items-center 
                justify-center shadow-lg transition-transform 
                hover:scale-110 duration-300 "
                style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                aria-hidden="true"
               >
                <img
                  src={card.icon}
                  alt=""
                  className="w-6 h-6 sm:w-8 
                  sm:h-8 md:w-10 
                  md:h-10 brightness-0 invert"
                />
              </div>
            </div>

            {/* Card */}
            <article className="mt-4 md:mt-0 bg-white rounded-2xl shadow-2xl w-full p-4 sm:p-6 md:p-8 pt-10 md:pt-12 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <header className="mb-4">
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-slate-900 mb-1">
                  {card.title}
                </h3>
                <h4 className="text-base sm:text-lg md:text-lg font-bold text-slate-900">
                  {card.subtitle}
                </h4>
              </header>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-left">
                {card.description}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
};

export default SavCards;
