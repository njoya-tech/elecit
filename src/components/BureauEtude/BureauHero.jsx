/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { ICONS, HERO } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import CTAButton from "../CTA/CTAButton";
import { motion } from "framer-motion";
import { useState } from "react";

const BureauHero = () => {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      className="
        relative w-full overflow-hidden
        min-h-[500px]
      "
      style={{ height: "55vh" }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={HERO.bureauEtude}
        alt="Bureau d'étude et ingénierie"
        className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 bg-linear-to-b
       from-black/70 via-black/50 to-black/80"
      />

      {/* ANGLED BLACK PNG MASK */}
      <img
        src={ICONS.formeSombre}
        alt=""
        aria-hidden="true"
        className="
          absolute bottom-0 left-0 w-full
          max-h-80 sm:max-h-[360px] md:max-h-[420px]
          object-cover pointer-events-none
          z-10
        "
      />

      {/* TECH PATTERN – hidden on mobile */}
      <img
        src={ICONS.formTech}
        alt=""
        aria-hidden="true"
        className="
          hidden sm:block
          absolute inset-0 m-auto
          w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%]
          max-w-[1400px]
          opacity-10
          pointer-events-none
          z-10
        "
        style={{ top: "10%" }}
      />

      {/* CONTENT */}
      <div
        className="
          absolute inset-0 z-20
          flex flex-col items-center justify-center
          px-4 sm:px-6 md:px-12 lg:px-16
          text-center
        "
      >
        {/* TITLE */}
        <h1
          className="
            font-extrabold
            text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl
            leading-tight
            mb-4 sm:mb-6 mt-20
          "
          style={{ color: MY_COLORS.secondaryGreen }}
        >
          {t("bureau.hero.titleLine1")}
          <br />
          {t("bureau.hero.titleLine2")}
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            text-white
            text-sm sm:text-base md:text-lg
            leading-relaxed
            mb-8 sm:mb-10
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl
          "
        >
          {t("bureau.hero.descriptionLine1")}
          <br />
          {t("bureau.hero.descriptionLine2")}
        </p>

        {/* CTA + Arrow */}
        <div className="flex items-center gap-4 lg:mt-0 ml-20">
          <CTAButton onClick={() => setShowVideo(true)}>
            {t("bureau.hero.button")}
          </CTAButton>

          {showVideo && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setShowVideo(false)} // Click outside closes the video
            >
              {/* Video Container */}
              <div
                className="relative w-[90%] max-w-3xl aspect-video
                 bg-black rounded-xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-2 right-2 text-white text-3xl z-10"
                >
                  &times;
                </button>

                <iframe
                  src="https://www.youtube.com/embed/geUNzc0cVuY?autoplay=1"
                  title="YouTube video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          <motion.img
            src={ICONS.flech_icon}
            alt="Arrow"
            className="w-10 sm:w-22 opacity-100 origin-top"
            animate={{
              rotate: [-15, 15, -15],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BureauHero;
