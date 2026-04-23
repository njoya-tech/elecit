/// RecruitmentHero.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MY_COLORS } from '../../utils/colors';
import { p3 } from '../../assets';

const RecruitmentHero = ({ title1, title2, subtitle, bgImage }) => {
  const { t } = useTranslation();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px]"
      style={{ height: "65vh" }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* Dark Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      />

      {/* Tech Pattern */}
      <img
        src={p3}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 m-auto w-[150%] sm:w-[130%] md:w-[120%] lg:w-[110%] max-w-[1400px] opacity-10 pointer-events-none z-10"
        style={{ top: "10%" }}
      />

      {/* Centered Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 text-center z-20">
        <motion.h1
          className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-20"
          initial="hidden"
          animate="visible"
          variants={slideDown}
        >
          <span style={{ color: MY_COLORS.secondaryGreen }}>
            {t(title1)}
          </span>
          <br />
          <span style={{ color: MY_COLORS.white }}>
            {t(title2)}
          </span>
        </motion.h1>

        <motion.p
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wide font-medium leading-relaxed mb-4 sm:mb-6 px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          {t(subtitle)}
        </motion.p>
      </div>
    </section>
  );
};

export default RecruitmentHero;