import React from "react";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const CardAvantage = () => {
  return (
    <>
      {/* CONTAINER 1: HEADER */}
      <header className="w-full bg-slate-900">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
          {/* Right: title */}
          <h1 className="ml-4 text-white font-extrabold text-xl md:text-3xl leading-tight text-left">
            Traitement et Valorisation des Données
          </h1>

          {/* Left: circuit pattern */}
          <div className="flex-shrink-0">
            <img
              src={ICONS.formTech}
              alt="Motif circuit"
              className="h-24 md:h-24 w-auto object-contain scale-200 opacity-100 -ml-9"
            />
          </div>
        </div>
      </header>

      {/* CONTAINER 2: TOP SECTION - Text, Button, and Fiabilité Card */}
      <section className="w-full py-12 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left: Description Text */}
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Grâce à notre expertise, nous vous accompagnons dans la
                transformation numérique de votre entreprise et vous aidons à
                prendre de meilleures décisions grâce à vos données.
              </p>

              {/* Documentation Button with curved arrow */}
              <div className="mt-6 flex items-center gap-4">
                <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  Documentation
                </button>
                {/* Curved Arrow */}
                <svg
                  width="60"
                  height="40"
                  viewBox="0 0 60 40"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    d="M5 5 Q30 -5, 50 15 L45 20 M50 15 L55 10"
                    stroke="#7FA946"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Right: Fiabilité Card */}
            <div className="w-full md:w-1/2 flex justify-end">
              <div
                style={{
                  left: "27px",
                }}
                className="bg-white border border-gray-200 rounded-2xl 
              shadow-lg p-6 pt-16 w-full md:w-80 relative"
              >
                {/* Icon half in/out - no circle, just icon */}
                <div
                  className="absolute -top-8 left-1/2 
                transform -translate-x-1/2"
                >
                  <img
                    src={ICONS.faibilite_icon}
                    alt="Fiabilité"
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">
                  Fiabilité des systèmes
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Des infrastructures informatiques stables, performantes et
                  toujours opérationnelles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTAINER 3: GRID SECTION with Cards and Decorative Gears */}
      <section className="w-full py-12 px-6 md:px-12 relative">
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
              border-dashed hidden md:block"
              style={{
                top: "calc(50% - 3rem)",
                color: MY_COLORS.secondaryGreen,
                 borderLeft: "2px dashed #8CC63F",
              }}
            ></div>

            <div
              className="absolute left-0 right-0 border-t-2 
              border-dashed hidden md:block"
              style={{
                top: "calc(10% - 9rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>

            {/* Vertical dotted divider lines (between columns) - goes up to cards */}
            <div
              className="absolute -top-25 bottom-0 border-l-2
               border-dashed hidden md:block"
              style={{
                left: "calc(33.333% + 0.05rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>
            <div
              className="absolute -top-80 bottom-0 border-l-2 
              border-dashed  hidden md:block"
              style={{
                left: "calc(66.666% + 0.95rem)",
                color: MY_COLORS.secondaryGreen,
              }}
            ></div>

            <div
              style={{ top: "-20px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
            >
              {/* ROW 1 */}
              {/* Card 1: Sécurité renforcée - GREEN */}
              <div
                className="rounded-2xl shadow-lg p-6 pt-16 relative"
                style={{
                  backgroundColor: "#7FA946",
                  top: "-20px",
                  boxShadow: "0,4px,10px  rgba (0,0,0,0.15)",
                }}
              >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.securite_icon}
                    alt="Sécurité"
                    className="w-16 h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Sécurité renforcée
                </h3>
                <p className="text-gray-800 text-center text-sm leading-relaxed">
                  Protection complète des données et des systèmes contre les
                  cybermenaces.
                </p>
              </div>

              {/* Card 2: Gain de temps - WHITE */}
              <div
                style={{
                  top: "-20px",
                  left: "10px",
                }}
                className="bg-white border border-gray-200 rounded-2xl 
              shadow-lg p-6 pt-16 w-full md:w-80 relative"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.gain_temps_icon}
                    alt="Gain de temps"
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Gain de temps
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Automatisation des tâches et support technique réactif pour
                  vous concentrer sur l'essentiel.
                </p>
              </div>

              {/* Card 3: Optimisation des coûts - GREEN */}
              <div
                className="rounded-2xl shadow-md p-6 pt-16 relative"
                style={{
                  backgroundColor: "#7FA946",
                  top: "-20px",
                  left: "10px",
                }}
              >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.optimisation_icon}
                    alt="Optimisation"
                    className="w-16 h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Optimisation des coûts
                </h3>
                <p className="text-gray-800 text-center text-sm leading-relaxed">
                  Réduction des dépenses liées à la maintenance, à
                  l'infrastructure et à la gestion des données.
                </p>
              </div>

              {/* ROW 2 */}
              {/* Card 4: Décisions plus intelligentes - WHITE */}
              <div
                style={{
                  top: "20px",
                }}
                className="bg-white border border-gray-200 rounded-2xl 
              shadow-lg p-6 pt-16 w-full md:w-80 relative"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.decision_icon}
                    alt="Décisions"
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Décisions plus intelligentes
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Accès à des données claires et structurées pour guider vos
                  choix stratégiques.
                </p>
              </div>

              {/* Card 5: Flexibilité et évolutivité - GREEN */}
              <div
                className="rounded-2xl shadow-md p-6 pt-16 relative"
                style={{
                  backgroundColor: "#7FA946",
                  left: "15px",
                  top: "15px",
                }}
               >
                {/* Icon half in/out - black for green cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.flexibilite_icon}
                    alt="Flexibilité"
                    className="w-16 h-16"
                    style={{ filter: "brightness(0)" }}
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Flexibilité et évolutivité
                </h3>
                <p className="text-gray-800 text-center text-sm leading-relaxed">
                  Des solutions adaptées à votre croissance et à l'évolution de
                  vos besoins.
                </p>
              </div>

              {/* Card 6: Conformité réglementaire - WHITE */}
              <div
                style={{
                  top: "15px",
                  left: "15px",
                }}
                className="bg-white border border-gray-200 rounded-2xl 
              shadow-lg p-6 pt-16 w-full md:w-80 relative"
              >
                {/* Icon half in/out - normal for white cards */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img
                    src={ICONS.conformite_icon}
                    alt="Conformité"
                    className="w-16 h-16"
                  />
                </div>

                <h3 className="text-xl font-bold text-center mb-3 text-black">
                  Conformité réglementaire
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  Respect des normes (comme le RGPD) pour une gestion des
                  données en toute légalité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardAvantage;
