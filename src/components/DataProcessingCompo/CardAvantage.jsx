import React from "react";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const CardAvantage = () => {
  return (
    <>
      {/* CONTAINER 1: HEADER */}
      <header className="w-full bg-slate-900">
        <div
          className="relative w-full mb-4 sm:mb-6 md:mb-8 overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <div className="absolute -top-10 right-0 w-1/3 h-full opacity-100 scale-125 hidden sm:block">
            <img src={ICONS.formTech} alt="" />
          </div>
          <h2
            className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 lg:py-8"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            Les avantages clés{" "}
          </h2>
        </div>
      </header>

      {/* CONTAINER 2: TOP SECTION - Text, Button, and Fiabilité Card */}
      <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            {/* Left: Description Text */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                Grâce à notre expertise, nous vous accompagnons dans la
                transformation numérique de votre entreprise et vous aidons à
                prendre de meilleures décisions grâce à vos données.
              </p>

              {/* Documentation Button with curved arrow */}
              <div className="mt-4 sm:mt-6 flex items-center gap-4">
                <button className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 transition">
                  Documentation
                </button>
              </div>
            </div>

            {/* Right: Fiabilité Card */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
              shadow-lg p-5 sm:p-6 pt-14 sm:pt-16 w-full max-w-sm md:max-w-none md:w-80 relative"
              >
                {/* Icon half in/out - no circle, just icon */}
                <div
                  className="absolute -top-7 sm:-top-8 left-1/2 
                transform -translate-x-1/2"
                >
                  <img
                    src={ICONS.faibilite_icon}
                    alt="Fiabilité"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3">
                  Fiabilité des systèmes
                </h3>
                <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                  Des infrastructures informatiques stables, performantes et
                  toujours opérationnelles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTAINER 3: GRID SECTION with Cards and Decorative Gears */}
      <section className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 relative">
        <div className="mx-auto max-w-7xl relative lg:mt-10">
          {/* Left Decorative Gear */}
          <div className="absolute -left-15 top-1/4 -translate-x-1/2 hidden lg:block">
            <img
              style={{
                animation: "rotateClockwise 5s linear infinite",
              }}
              src={ICONS.Engrenage_plan}
              alt="Gear decoration"
              className="w-32 h-32 opacity-100"
            />
          </div>

          {/* Right Decorative Gear */}
          <div className="absolute -right-10 -bottom-10 translate-x-1/2 hidden lg:block">
            <img
              style={{
                animation: "rotateClockwise 5s linear infinite",
              }}
              src={ICONS.Engrenage_plan}
              alt="Gear decoration"
              className="w-40 h-40 opacity-100"
            />
          </div>

          {/* Grid of 6 Cards with dotted dividers */}
          <div className="relative">
            {/* Horizontal dotted divider line (between rows) - goes up to cards */}
            <div
              className="absolute left-0 right-0 border-t-2 
              border-dashed hidden lg:block"
              style={{
                top: "calc(50% - 3rem)",
                color: MY_COLORS.secondaryGreen,
                borderLeft: "2px dashed #8CC63F",
              }}
            ></div>

            <div
              className="absolute left-0 right-0 border-t-2 
              border-dashed hidden lg:block"
              style={{
                top: "calc(10% - 9rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>

            {/* Vertical dotted divider lines (between columns) - goes up to cards */}
            <div
              className="absolute -top-25 bottom-0 border-l-2
               border-dashed hidden lg:block"
              style={{
                left: "calc(33.333% + 0.05rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>
            <div
              className="absolute -top-80 bottom-0 border-l-2 
              border-dashed  hidden lg:block"
              style={{
                left: "calc(66.666% + 0.95rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 
             md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 lg:-top-9 relative">
              {/* Card 1: Sécurité renforcée - GREEN */}
              <div
                className="rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 pt-14 sm:pt-16 relative lg:-top-5"
                style={{
                  backgroundColor: "#7FA946",
                  boxShadow: "0,4px,10px  rgba (0,0,0,0.15)",
                }}
              >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.securite_icon}
                    alt="Sécurité"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Sécurité renforcée
                </h3>
                <p className="text-gray-800 text-center text-xs sm:text-sm leading-relaxed">
                  Protection complète des données et des systèmes contre les
                  cybermenaces.
                </p>
              </div>

              {/* Card 2: Gain de temps - WHITE */}
              <div
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
              shadow-lg p-5 sm:p-6 pt-14 sm:pt-16 relative lg:-top-5 lg:left-2.5"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.gain_temps_icon}
                    alt="Gain de temps"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Gain de temps
                </h3>
                <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                  Automatisation des tâches et support technique réactif pour
                  vous concentrer sur l'essentiel.
                </p>
              </div>

              {/* Card 3: Optimisation des coûts - GREEN */}
              <div
                className="rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 pt-14 sm:pt-16 relative lg:-top-5 lg:left-2.5"
                style={{
                  backgroundColor: "#7FA946",
                }}
              >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.optimisation_icon}
                    alt="Optimisation"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Optimisation des coûts
                </h3>
                <p className="text-gray-800 text-center text-xs sm:text-sm leading-relaxed">
                  Réduction des dépenses liées à la maintenance, à
                  l'infrastructure et à la gestion des données.
                </p>
              </div>

              {/* Card 4: Décisions plus intelligentes - WHITE */}
              <div
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
              shadow-lg p-5 sm:p-6 pt-14 sm:pt-16 relative lg:top-5"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.decision_icon}
                    alt="Décisions"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Décisions plus intelligentes
                </h3>
                <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                  Accès à des données claires et structurées pour guider vos
                  choix stratégiques.
                </p>
              </div>

              {/* Card 5: Flexibilité et évolutivité - GREEN */}
              <div
                className="rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 pt-14 sm:pt-16 relative lg:top-3.5 lg:left-3.5"
                style={{
                  backgroundColor: "#7FA946",
                }}
              >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.flexibilite_icon}
                    alt="Flexibilité"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Flexibilité et évolutivité
                </h3>
                <p className="text-gray-800 text-center text-xs sm:text-sm leading-relaxed">
                  Des solutions adaptées à votre croissance et à l'évolution de
                  vos besoins.
                </p>
              </div>

              {/* Card 6: Conformité réglementaire - WHITE */}
              <div
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
              shadow-lg p-5 sm:p-6 pt-14 sm:pt-16 relative lg:top-3.5 lg:left-3.5"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-7 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.conformite_icon}
                    alt="Conformité"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 text-black">
                  Conformité réglementaire
                </h3>
                <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                  Respect des normes (comme le RGPD) pour une gestion des
                  données en toute légalité.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rotation Animation */}
        <style>{`
          @keyframes rotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
};

export default CardAvantage;