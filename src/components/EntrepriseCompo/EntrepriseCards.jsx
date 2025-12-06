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
      className="w-full py-16  lg:mt-10"
      style={{ backgroundColor: MY_COLORS.creamDark }}
    >
      {/* =======================
          FULL-WIDTH BANNER
      =========================*/}
      <div className="relative w-full flex justify-center mb-20 lg:mt-10">
        <div className="w-full max-w-[1200px] px-6 relative">
          {/* Decorative helmet */}
          <img
            src={ICONS.Casque}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -left-4 -top-8 w-34 opacity-80 z-20 animate-bounce"
            style={{ animationDuration: "4s" }}
          />

          <div className="w-full h-[180px] relative overflow-hidden rounded-lg shadow-xl">
            <img
              src={HERO.entreprise}
              alt="bannière nos valeurs"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3">
                Nos valeurs
              </h3>
              <p
                className="text-xl md:text-2xl font-bold"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                <span className="font-bold">03 mots clés</span>{" "}
                <span className="text-white">nous définissent</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================
          CENTERED CONTENT
      =========================*/}
      <div className="max-w-[1200px] mx-auto px-6 -mt-20">
        <div className="relative">
          {/* Left gear */}
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -left-20 top-32 z-0 w-32 opacity-100 animate-spin"
            style={{ animationDuration: "6s" }}
          />

          {/* Right gear */}
          <img
            src={ICONS.Engrenage_plan}
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute -right-20 -top-1 z-0 w-42 opacity-100 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          />

          {/* Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 place-items-start">
            {cards.map((card, index) => (
              <div key={index} className="relative flex justify-center w-full">
                {/* Badge */}
                <div className="absolute -top-6.5 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <img
                      src={ICONS.cercle}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full animate"
                      style={{ animationDuration: "8s" }}
                    />

                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative z-10"
                      style={{ background: MY_COLORS.secondaryGreen }}
                    >
                      <img
                        src={card.icon}
                        alt={`${card.title} icon`}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <article className="mt-8 bg-white rounded-2xl shadow-lg w-full max-w-[360px] p-8 text-center hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">
                    {card.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </article>
              </div>
            ))}
          </div>

          {/* =======================
              BROKEN LINE (NEW)
          =========================*/}
          <div className="w-full flex justify-center mt-24">
            <div
              className="w-full h-[2px]"
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
        </div>
      </div>
    </section>
  );
};

export default EntrepriseCards;
