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
  ];

  return (
    <section
      className="w-full py-16"
      style={{ backgroundColor: MY_COLORS.white }}
    >
      {/* TOP SECTION - Helmet + Title + Description */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Helmet Icon */}
          <div className="flex-shrink-0">
            <img
              src={ICONS.Casque}
              alt="Casque"
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>

          {/* Title and Description */}
          <div className="flex-1">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              Nos prestations
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
              De l'étude de faisabilité à la livraison clé en main, nous
              accompagnons nos clients <br/> {" "}à chaque étape du projet, en assurant un
              haut niveau de technicité et de <br/> conformité réglementaire.
            </p>
          </div>
        </div>
      </div>

      {/* BANNER IMAGE */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="w-full h-[200px] md:h-[280px] relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={IMAGES.IMG8}
            alt="Bureau d'étude banner"
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
          className="hidden lg:block absolute -right-20 bottom-10 z-0 w-32 opacity-100 animate-spin"
          style={{ animationDuration: "8s", animationDirection: "reverse" }}
        />

        {/* Cards Grid - Overlapping Banner */}
        <div className="relative -mt-32 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div key={index} className="relative flex justify-center">
                {/* Icon Badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg~"
                    style={{ backgroundColor: MY_COLORS.secondaryGreen ,
                        
                    }}
                  >
                    <img
                      src={card.icon}
                      alt={`${card.title} icon`}
                      className="w-20 h-10 brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Card */}
                <article className="mt-0 bg-white rounded-2xl shadow-lg w-full p-8 pt-12 text-center hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {card.title}
                  </h3>
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    {card.subtitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed text-left">
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

export default BureauCards;