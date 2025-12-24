import React from "react";
import { HERO, ICONS } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";

const EntrepriseCards = () => {
  const cards = [
    {
      title: "Innovation",
      icon: ICONS.innovation,
      description:
        "Grâce à une veille technologique permanente et à une culture de créativité, nous développons des approches novatrices pour répondre aux besoins de nos partenaires.",
    },
    {
      title: "Transformation",
      icon: ICONS.transformation,
      description:
        "Nous accompagnons nos clients dans leur mutation vers des modèles plus performants et durables par l'intégration de nouvelles technologies et par l'optimisation des processus.",
    },
    {
      title: "Excellence",
      icon: ICONS.excellence,
      description:
        "À travers des standards de qualité élevés, une expertise pointue et un souci du détail, nous garantissons des résultats qui répondent aux attentes les plus exigeantes.",
    },
  ];

  return (
    <section
      className="w-screen py-20 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
      style={{
        backgroundColor: MY_COLORS.gray,
      }}
    >
      <div className="relative w-full flex justify-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 relative">
          <img
            src={ICONS.Casque}
            alt=""
            aria-hidden="true"
            className=" md:block absolute -left-2 md:-left-4 -top-4 md:-top-8 w-20 md:w-24 lg:w-32 opacity-100 z-20 animate-bounce"
            style={{ animationDuration: "4s" }}
          />

          <div className="w-full h-32 sm:h-40 md:h-[200px] lg:h-[220px] relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={HERO.entreprise}
              alt="bannière nos valeurs"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 sm:px-6">
              <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-2 md:mb-3">
                Nos valeurs
              </h3>
              <p
                className="text-base sm:text-lg md:text-2xl font-bold px-2"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                <span className="font-bold">03 mots clés</span>{" "}
                <span className="text-white">nous définissent</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20">
        <div className="relative">
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -left-8 lg:-left-20 top-20 lg:top-32 z-0 w-20 lg:w-32 opacity-100 animate-spin"
            style={{ animationDuration: "6s" }}
          />

          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden xl:block absolute -right-8 xl:-right-20 -top-4 xl:-top-1 z-0 w-20 xl:w-44 opacity-100 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          />

          <div className="relative z-10 grid grid-cols-1 
          md:grid-cols-2 lg:grid-cols-3 gap-6 
          md:gap-8 lg:gap-12 place-items-center">
            {cards.map((card, index) => (
             <div
  key={index}
  className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm"
>
  {/* CARD */}
  <article
    className="relative bg-white rounded-2xl shadow-lg w-full 
    pt-14 sm:pt-16 md:pt-20 p-5 sm:p-6 md:p-7 lg:p-8 text-center
    hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    {/* BADGE */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="relative flex items-center justify-center
        w-14 h-14 sm:w-16 sm:h-16 md:w-22 md:h-22">
        
        <img
          src={ICONS.cercle}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full animate-pulse"
          style={{ animationDuration: "8s" }}
        />

        <div
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full 
          flex items-center justify-center shadow-lg relative z-10"
          style={{ background: MY_COLORS.secondaryGreen }}
        >
          <img
            src={card.icon}
            alt={`${card.title} icon`}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
          />
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <h4 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-3">
      {card.title}
    </h4>

    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-2">
      {card.description}
    </p>
  </article>
</div>

            ))}
          </div>

          <div className="w-full flex justify-center mt-10 sm:mt-12 md:mt-16 lg:mt-24">
            <div
              className="w-full max-w-xl sm:max-w-2xl h-[2px] sm:h-px"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  to right,
                  ${MY_COLORS.green} 4px,
                  ${MY_COLORS.green} 8px,
                  transparent 1px,
                  transparent 11px
                )`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepriseCards;
