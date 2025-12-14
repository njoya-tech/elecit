import React from "react";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const CardDonnes = () => {
  const services = {
    row1: [
      {
        icon: ICONS.laptop, // Replace with actual icon
        title: "Gestion des Infrastructures IT",
        description:
          "Mise en place, maintenance et supervision d'environnements informatiques (serveurs, réseaux, cloud, sécurité, etc.).",
      },
      {
        icon: ICONS.stockage,
        title: "Support Technique & Assistance",
        description:
          "Service helpdesk, dépannage à distance ou sur site, maintenance préventive et corrective.",
      },
    ],
    row2: [
      {
        icon: ICONS.badge,
        title: "Cybersécurité",
        description:
          "Mise en œuvre de politiques de sécurité, pare-feu, sauvegarde, contrôle d'accès, audits de vulnérabilité.",
      },
      {
        icon: ICONS.business_icon,
        title: "Virtualisation & Cloud Computing",
        description:
          "Migration vers le cloud, déploiement d'environnements virtuels, solutions hybrides.",
      },
      {
        icon: ICONS.badge,
        title: "Développement d'applications",
        description:
          "Conception et déploiement de solutions logicielles sur mesure adaptées à vos processus métiers.",
      },
    ],
  };
  return (
    <>
      {/* CONTAINER 1: HEADER */}
      <header className="w-full bg-slate-900">
        <div className="mx-auto max-w-7xl flex items-center 
        justify-between px-6 md:px-12 py-4 md:py-5">
          {/* Left: circuit pattern */}
          <div className="flex-shrink-0">
            <img
              src={ICONS.formTech}
              alt="Motif circuit"
              className="h-24 md:h-24 w-auto object-contain 
              scale-190 opacity-100 mr-20 translate-x-15"
            />
          </div>

          {/* Right: title */}
          <h1 className="ml-4 text-white font-extrabold text-xl md:text-3xl leading-tight text-right">
            Traitement et Valorisation des Données
          </h1>
        </div>
      </header>

      {/* CONTAINER 2: CONTENT WRAPPER */}
      <div className="w-full bg-white-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
          {/* CONTAINER 3: INTRO SECTION - Control the entire div */}
          <div
            style={{
              marginRight: "10px", // Move entire section to the left
              paddingLeft: "10px", // Add padding if needed
            }}
            className="flex items-center gap-8 mb-16"
          >
            {/* Helmet Icon - Control the helmet */}
            <div className="flex-shrink-0">
              <img
                style={{
                  marginLeft: "50px", // Push helmet to the right
                  animationDelay: "0.5s", // Delay bounce animation
                  animationDuration: "2s", // Slower bounce
                  right: "200px",
                }}
                src={ICONS.Casque}
                alt="Casque de sécurité"
                className="relative h-32 md:h-40 w-auto object-contain animate-bounce"
              />
            </div>

            {/* Description Text - Control the paragraph */}
            <p
              style={{
                textAlign: "center",
                paddingLeft: "2px", // Add space from helmet
                paddingRight: "20px", // Balance the text
                maxWidth: "800px", // Limit text width
                fontSize: "1.3em",
              }}
              className="text-gray-700 text-base md:text-lg leading-relaxed flex-1"
            >
              Nous transformons les données brutes en informations exploitables
              pour aider nos clients à prendre des décisions éclairées,
              optimiser leurs performances et créer de la valeur à chaque étape
              de leur activité.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* HORIZONTAL DOTTED LINE - Between rows */}
        <div
          className="absolute left-0 right-0 hidden md:block"
          style={{
            top: "55%",
            borderTop: "2px dashed #8CC63F",
          }}
        />

        {/* VERTICAL DOTTED LINES - Between columns */}
        <div
          className="hidden lg:block absolute top-0 bottom-0"
          style={{
            left: "33.333%",
            borderLeft: "2px dashed #8CC63F",
          }}
        />
        <div
          className="hidden lg:block absolute top-0 bottom-0"
          style={{
            left: "66.666%",
            borderLeft: "2px dashed #8CC63F",
          }}
        />

        {/* ============================================ */}
        {/* ROW 1: 2 Cards + Image                      */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
          {/* CARD 1 */}
          <div className="relative pt-14 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* ICON - Half in, half out */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <img src={services.row1[0].icon} alt="" className="w-20 h-20" />
            </div>

            <h3
              className="text-xl font-bold mb-3 text-center"
              style={{ color: MY_COLORS.black }}
            >
              {services.row1[0].title}
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {services.row1[0].description}
            </p>
          </div>

          {/* CARD 2 */}
          <div className="relative pt-14 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* ICON - Half in, half out */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <img src={services.row1[1].icon} alt="" className="w-20 h-20" />
            </div>

            <h3
              className="text-xl font-bold mb-3 text-center"
              style={{ color: MY_COLORS.black }}
            >
              {services.row1[1].title}
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              {services.row1[1].description}
            </p>
          </div>

          {/* IMAGE (Right Side) */}
          <div className="flex justify-center items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full">
              <img
                src={IMAGES.IMG5}
                alt="IT Services Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* ROW 2: 3 Cards                             */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 relative z-20">
          {services.row2.map((service, index) => (
            <div
              key={index}
              className="
      relative 
      pt-14 p-6 
      rounded-xl shadow-lg bg-white
      hover:shadow-xl transition-shadow duration-500 
      border border-gray-100 
      z-20 
      overflow-visible
    "
            >
              {/* ICON - Half in, half out */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                <img src={service.icon} alt="" className="w-20 h-20" />
              </div>

              <h3
                className="text-xl font-bold mb-3 text-center"
                style={{ color: MY_COLORS.black }}
              >
                {service.title}
              </h3>

              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {service.description}
              </p>

              {/* GEAR BEHIND CARD */}
              {index === 2 && (
                <div
                  className="
          absolute 
          -bottom-18 -right-28 
          opacity-100 pointer-events-none z-10
          
          
        "
                >
                  <img
                    style={{
                      animation: "rotateClockwise 5s linear infinite",
                    }}
                    src={ICONS.Engrenage_plan}
                    alt=""
                    className="w-32 h-32"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardDonnes;
