import React, { useState } from "react";
import { HERO, ICONS, IMAGES } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";
import CTAButton from "../CTA/CTAButton.jsx";
import ProjectModal from "./ProjectModal.jsx";
import { useTranslation } from "react-i18next";

const CardProject = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const visiblePosts = t("dataProcessing.projects.items", {
    returnObjects: true,
  });

  return (
    <>
      <section className="relative w-full lg:mb-30 lg:mt-10 overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={HERO.dataProcessing}
          alt="Data processing background"
          className="w-full h-[75vh] md:h-[85vh] object-cover"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* ANGLED BLACK PNG MASK */}
        <img
          src={ICONS.formeSombre}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full max-h-[420px] object-cover pointer-events-none"
          style={{ objectFit: "cover" }}
        />

        {/* CENTERED TEXT CONTENT */}
        <div
          className="absolute inset-0 flex flex-col items-center
       justify-center px-4 sm:px-6 md:px-12 text-center top-[-15px]"
        >
          {/* MAIN TITLE */}
          <h3
            style={{
              color: MY_COLORS.secondaryGreen,
            }}
            className="text-white font-extrabold text-[28px] sm:text-[32px] md:text-4xl 
          lg:text-5xl xl:text-6xl leading-tight mb-6 sm:mb-8 md:mb-10"
          >
            <span>{t("dataProcessing.projects.title")}</span>
            <br />
            <span>{t("dataProcessing.projects.subtitle")}</span>
          </h3>

          {/* SUBTITLE */}
          <p className="text-white text-sm md:text-base lg:text-lg tracking-wide font-semibold mb-2 px-4">
            {t("dataProcessing.projects.description")}
          </p>

          {/* Cards grid */}
          <div
            className="relative mt-12 sm:mt-14 md:mt-16 lg:mt-10 w-full max-w-7xl px-4 sm:px-6
  max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-visible"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 
            md:justify-items-center"
            >
              {visiblePosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`relative bg-white/70 border border-transparent 
                rounded-md shadow-sm flex flex-col min-h-[280px] sm:min-h-[300px] md:min-h-[320px] 
                lg:min-h-[350px] w-full max-w-[400px] mx-auto
                ${
                  index === 2
                    ? "md:col-span-2 lg:col-span-1 md:max-w-[400px]"
                    : ""
                }`}
                >
                  {/* Number badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div
                      className="h-12 w-12 rounded-full bg-[#7DA837]
                   text-white flex items-center justify-center text-lg font-bold"
                    >
                      {post.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col">
                    <h3
                      className="font-bold text-[18px] sm:text-[20px] md:text-[22px] 
                      lg:text-[26px] mb-6 sm:mb-8 md:mb-10 text-center"
                    >
                      {post.title}
                    </h3>

                    <p className="text-sm text-black-600 mb-4 flex-1 text-center">
                      {post.excerpt}
                    </p>

                    <button
                      className="mt-auto inline-flex items-center 
                  justify-center px-6 py-2 rounded-full bg-[#000000]
                   text-white text-sm font-semibold hover:bg-[#f7f7f7] shadow-md hover:text-green-700
                   transition-all duration-300"
                      onClick={() => {
                        setSelectedProject(post);
                        setIsModalOpen(true);
                      }}
                    >
                      {t("dataProcessing.projects.seeMore")}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
      
      {/* ============================================ */}
      {/* CTA SECTION WITH BACKGROUND                 */}
      {/* ============================================ */}
      <section className="hidden lg:block">
        <div className="relative mx-auto w-[90%] lg:w-6/6 max-w-6xl -mt-15 p-0 md:top-10">
          <div className="w-full overflow-hidden" style={{ height: "440px" }}>
            <img
              src={ICONS.formePlan}
              className="w-full object-cover block"
              alt=""
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16">
            <img
              style={{
                top: "12em",
                width: "85%",
              }}
              src={ICONS.formTech}
              alt=""
              aria-hidden="true"
              className="absolute z-0 pointer-events-none opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[12em] w-[150%] md:w-full lg:w-[180%] h-auto"
            />

            <h3
              className="relative z-20 text-center text-2xl md:text-4xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-8 md:mb-12"
              style={{ color: MY_COLORS.white, top: "24%" }}
            >
              {t("dataProcessing.projects.cta.title")} <br />
              <span style={{ color: MY_COLORS.secondaryGreen }}>
                {t("dataProcessing.projects.cta.titleHighlight")}
              </span>
            </h3>

            <p className="text-center md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mt-15">
              {t("dataProcessing.projects.cta.description")}
            </p>

            <CTAButton
              className="absolute top-10 md:top-2 md:w-70"
              onClick={() => alert("Video clicked!")}
            >
              {t("dataProcessing.projects.cta.button")}
            </CTAButton>
          </div>

          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-40 animate-spin"
            style={{
              animationDuration: "4s",
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

export default CardProject;