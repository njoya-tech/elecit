import React from "react";
import { ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton.jsx";

const SavGreenCards = () => {
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
      <section className="w-full bg-white pt-0 pb-16 px-2">
        <div
          className="relative w-full mb-8 overflow-hidden"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <h2
            className="relative text-3xl md:text-4xl lg:text-5xl 
          font-bold px-8 py-6 md:py-8 text-right"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            Nos engagements clés
          </h2>
          <div className="absolute -top-10 left-0 w-1/3 h-full opacity-100 scale-125">
            <img src={ICONS.formTech} alt="" />
          </div>
        </div>

        <div className="relative text-center mb-20">
          {/* DECORATIVE GEARS - Top left */}
          <div className="absolute left-0 top-0 hidden lg:block">
            {/* Large Gear */}
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              aria-hidden="true"
              className="relative w-40 h-40 opacity-100 animate-spin [animation-duration:5s] [animation-timing-function:linear]"
              style={{
                top: "-30px",
                left: "30px",
              }}
            />
          </div>

          {/* TITLE */}

          {/* SUBTITLE */}
          <p
            style={{ color: MY_COLORS.black }}
            className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Bénéficiez d’un SAV intégré, rentable et structurant, pensé pour
            assurer la <br /> pérennité de vos projets.
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
            <div className="relative pt-10 p-6 rounded-xl shadow-lg bg-[#7FA946] hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* ICON - Positioned HALF IN, HALF OUT */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={services.row1[1].icon}
                  alt=""
                  className="w-24 h-24"
                  style={{ filter: "brightness(0)" }}
                />
              </div>

              <h3
                className="text-xl font-bold mb-3 text-center mt-4"
                style={{ color: MY_COLORS.black }}
              >
                {services.row1[1].title}
              </h3>
              <p className="text-black text-center text-sm leading-relaxed">
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
                className={`
    relative pt-10 p-6 rounded-xl shadow-2xl 
    hover:shadow-xl transition-shadow duration-300 border border-gray-100
    ${index === 1 ? "bg-[#7FA946]" : "bg-white"}
    `}
              >
                {/* ICON - Positioned HALF IN, HALF OUT */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <img
                    src={service.icon}
                    alt=""
                    className={`
                    w-24 h-24
                    ${index === 1 ? "brightness-0" : ""}
                    `}
                  />
                </div>

                <h3
                  className="text-xl font-bold mb-3 text-center mt-4"
                  style={{ color: MY_COLORS.black }}
                >
                  {service.title}
                </h3>
                <p className="text-black text-center text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0">
          {/* BLACK BLOCK PNG - Background layer */}
          <div
            className="w-full overflow-hidden"
            style={{
              height: "440px",
            }}
          >
            <img
              src={ICONS.formePlan}
              className="w-full object-cover block"
              alt=""
            />
          </div>

          {/* CONTENT OVERLAY - Positioned absolutely on top of PNG */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
            {/* TECH PATTERN - Behind text */}
            <img
              style={{
                top: "12em",
                width: "85%",
              }}
              src={ICONS.formTech}
              alt=""
              aria-hidden="true"
              className="absolute z-0 pointer-events-none opacity-30 
             top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em]  // Use Tailwind transform
             w-[150%] md:w-full lg:w-[180%] h-auto"
            />

            {/* TEXT */}
            <h3
              className="relative z-20 text-center text-2xl 
            md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
              style={{ color: MY_COLORS.white, top: "24%" }}
            >
              Faites le choix d’un accompagnement <br />
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                fiable, durable et rentable.
              </span>
            </h3>

            {/* Subtitle/Description */}
            <p
              className="text-center md:text-lg lg:text-l text-white/90 
           max-w-2xl mx-auto mt-15"
            >
              " Contactez notre service après-vente dès maintenant pour garantir
              la <br />
              continuité et l’efficacité de vos installations!"
            </p>

            {/* BUTTON */}
            <CTAButton
              className=" absolute top-10 "
              onClick={() => alert("Video clicked!")}
            >
              Contactez Nous
            </CTAButton>
          </div>

          {/* ROTATING GEAR - Top priority overlay */}
          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40"
            style={{
              animation: "rotateClockwise 8s linear infinite",
              top: "65%",
              right: "1%",
            }}
            aria-hidden="true"
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div
            className="absolute w-24 h-24 md:w-16 md:h-16 lg:w-16 lg:h-16 z-40"
            style={{
              animation: "rotateClockwise 20s linear infinite",
              top: "23%",
              left: "10%",
            }}
            aria-hidden="true"
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SavGreenCards;
