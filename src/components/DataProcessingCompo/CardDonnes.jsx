import React from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";

const ControlCards = () => {
  const services = {
    row1: [
      {
        icon: ICONS.badge,
        title: "Contrôle d'Accès Intelligent",
        description:
          "Systèmes de badges, cartes RFID et biométrie, portails automatiques et serrures électroniques.",
      },
      {
        icon: ICONS.stockage,
        title: "Vidéosurveillance & Intrusion",
        description:
          "Caméras HD, détection de mouvement, alarmes connectées et surveillance en temps réel.",
      },
    ],
    row2: [
      {
        icon: ICONS.securite_icon,
        title: "Sécurité & Gestion des Risques",
        description:
          "Protection contre les intrusions, cybersécurité et détection incendie intégrée aux systèmes d’alerte.",
      },
      {
        icon: ICONS.decision_icon,
        title: "Gestion Centralisée & Automatisation",
        description:
          "Supervision des accès, contrôle à distance, solutions cloud et rapports d’activité détaillés.",
      },
      {
        icon: ICONS.business_icon,
        title: "Audit & Conseil en Sécurité",
        description:
          "Analyse des vulnérabilités, définition de politiques de sécurité et accompagnement à la mise en conformité.",
      },
    ],
  };

  return (
    <>
      {/* HEADER WITH BLACK BACKGROUND + formTech */}
      <header className="w-full bg-slate-900">
        <div
          className="relative w-full mb-8 overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <h2
            className="relative text-3xl md:text-2xl lg:text-3xl 
                  font-bold px-8 py-6 md:py-8 text-right"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            Traitement et Valorisation des Données{" "}
          </h2>
          <div className="absolute -top-10 left-0 w-1/3 h-full opacity-100 scale-125">
            <img src={ICONS.formTech} alt="" />
          </div>
        </div>
      </header>

      {/* MAIN WHITE SECTION */}
      <div className="w-full bg-white pt-0 pb-16 px-2">
        <div className="max-w-7xl mx-auto">
          {/* ================= HEADER INSIDE SECTION (HELMET ONLY) ================= */}
          <div className="relative text-center mb-20">
            {/* HELMET TOP-LEFT */}
            <div className="absolute -left-20 top-0 hidden lg:block">
              <img
                src={ICONS.Casque}
                alt="Casque de chantier"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40
                 animate-[bounce_3s_ease-in-out_infinite]"
                style={{
                  top: "-20px",
                  left: "10px",
                }}
              />
            </div>

            {/* Small subtitle instead of big green heading (optional) */}
            <p
              style={{ color: MY_COLORS.black }}
              className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-8"
            >
              Nous sécurisons vos bâtiments, infrastructures et espaces
              sensibles grâce à des solutions de contrôle d&apos;accès et de
              vidéosurveillance performantes.
            </p>
          </div>

          {/* ================= GRID + DOTTED LINES ================= */}
          <div className="relative">
            {/* HORIZONTAL DOTTED LINE */}
            <div
              className="absolute left-0 right-0 hidden md:block"
              style={{
                top: "55%",
                borderTop: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />

            {/* VERTICAL DOTTED LINES */}
            <div
              className="hidden lg:block absolute top-0 bottom-0"
              style={{
                left: "33.333%",
                borderLeft: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />
            <div
              className="hidden lg:block absolute top-0 bottom-0"
              style={{
                left: "66.666%",
                borderLeft: `2px dashed ${MY_COLORS.secondaryGreen}`,
              }}
            />

            {/* ================= ROW 1 ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
              {/* CARD 1 */}
              <div
                className="relative pt-10 p-16 rounded-xl shadow-2xl
               bg-white hover:shadow-xl transition-shadow duration-300 border
                border-gray-100"
              >
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <img
                    src={services.row1[0].icon}
                    alt=""
                    className="w-24 h-24"
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

              {/* CARD 2 */}
              <div className="relative pt-10 p-16 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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

              {/* STATIC IMAGE AS LAST CARD OF ROW 1 */}
              <div className="flex justify-center items-center p-4">
                <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-sm">
                  <img
                    src={IMAGES.IMG5} // choose your static image here
                    alt="Contrôle & sécurité"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ================= ROW 2 ================= */}
            <div
              className="grid grid-cols-1 lg:grid-cols-3 
            gap-8 pt-8 relative z-10 "
              style={{
                marginTop: "12px",
              }}
            >
              {services.row2.map((service, index) => (
                <div
                  key={index}
                  className="relative pt-10 p-6 rounded-xl shadow-lg
                   bg-white hover:shadow-xl transition-shadow 
                   duration-300 border border-gray-100"
                >
                  <div className="absolute -top-9 left-1/2 transform -translate-x-1/2">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-16 h-16"
                    />
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

        {/* OPTIONAL: rotation keyframes if you reuse rotateClockwise elsewhere */}
        <style>{`
          @keyframes rotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ControlCards;
