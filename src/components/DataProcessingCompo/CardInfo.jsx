import React from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors.js";

const CardInfo = () => {
  // Service data array for easy management
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
    <div className="w-full bg-white pt-0 pb-16 px-2">
      <div className="max-w-7xl mx-auto">
        {/* ============================================ */}
        {/* CONTAINER 2: HEADER SECTION                */}
        {/* ============================================ */}
        <div className="relative text-center mb-20">
          {/* DECORATIVE GEARS - Top Right */}
          <div className="absolute right-0 top-0 hidden lg:block">
            {/* Large Gear */}
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className=" relative w-40 h-40 opacity-100"
              style={{
                top: "-30px",
                left: "30px",
                animation: "rotateClockwise 5s linear infinite",
              }}
            />
            {/* Small Gear */}
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className="relative  w-24 h-24 opacity-100"
              style={{
                top: "-100px",
                left: "-20px",
                animation: "rotateClockwise 5s linear infinite ",
              }}
            />
          </div>

          {/* TITLE */}
          <h2
            style={{ color: MY_COLORS.secondaryGreen }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Les services informatiques
          </h2>

          {/* SUBTITLE */}
          <p 
          style={{color:MY_COLORS.black}}
          className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Nous proposons une gamme complète de services informatiques pour
            accompagner la transformation numérique de votre organisation, en
            alliant performance, sécurité et évolutivité.
          </p>
        </div>

        {/* ============================================ */}
        {/* CONTAINER 3: SERVICES GRID                 */}
        {/* ============================================ */}
        <div className="relative">
          {/* HORIZONTAL DOTTED LINE - Between rows */}
          <div
            className="absolute left-0 right-0 hidden md:block"
            style={{
              top: "54%",
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
          {/* ROW 1: Image + 2 Cards                     */}
          {/* ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
            {/* IMAGE (Left Side) */}
            <div className="flex justify-center items-center p-4">
              <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-sm">
                <img
                  src={IMAGES.IMG5} // ✅ Fixed: Use specific image
                  alt="IT Services Illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CARD 1 - Icon WITHOUT circle */}
            <div className="relative pt-10 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* ICON - No circle, just the icon */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={services.row1[0].icon}
                  alt=""
                  className="w-24 h-24" // ⬅️ CONTROL SIZE HERE
                />
              </div>

              <h3
                className="text-xl font-bold mb-3 text-center mt-4"
                style={{ color: MY_COLORS.black }}
              >
                {services.row1[0].title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {services.row1[0].description}
              </p>
            </div>

            {/* CARD 2 - With icon half in/out */}
            <div className="relative pt-10 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* ICON - Positioned HALF IN, HALF OUT */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                
                  <img
                    src={services.row1[1].icon}
                    alt=""
                    className="w-24 h-24"
                  />
                
              </div>

              <h3
                className="text-xl font-bold mb-3 text-center mt-4"
                style={{ color: MY_COLORS.black }}
              >
                {services.row1[1].title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {services.row1[1].description}
              </p>
            </div>
          </div>

          {/* ============================================ */}
          {/* ROW 2: 3 Cards                             */}
          {/* ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 relative z-10">
            {services.row2.map((service, index) => (
              <div
                key={index}
                className="relative pt-10 p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* ICON - Positioned HALF IN, HALF OUT */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  
                    <img 
                    src={service.icon} 
                    alt="" 
                    className="w-24 h-24" />
                </div>

                <h3
                  className="text-xl font-bold mb-3 text-center mt-4"
                  style={{ color: MY_COLORS.black }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADD ROTATION ANIMATION */}
      <style>{`
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CardInfo;
