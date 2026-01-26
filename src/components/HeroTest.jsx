/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IMAGES, ICONS } from "../asset/assets";
import { MY_COLORS } from "../constants/colors";
import { motion } from "framer-motion";

// Use YOUR images
const images = [IMAGES.IMG1, IMAGES.IMG2, IMAGES.IMG3];

const ElecITCarouselCard = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("keydown", handleKey);
    }
    return () => {
      if (carousel) carousel.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Animation variant for slide down
  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };


  return (
    <div
      className="relative bg-white flex flex-col
     md:flex-row items-start justify-center p-4 sm:p-6 md:p-8 py-6 
     md:py-12 top-10 w-full gap-6 sm:gap-8 
     md:gap-12 lg:gap-16"
      
     >
      {/* === GROUP: GREEN BLOCK + TOP GEARS === */}
      <motion.div
        className="elecit-green-block-wrapper relative flex-none w-full 
        max-w-[320px] sm:max-w-[420px] md:max-w-[400px] 
        lg:max-w-[440px] mx-auto md:mx-0 md:w-[400px] md:h-[500px] h-64 sm:h-80 
        lg:h-[500px]"
        data-component="elecit-green-block"
        initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6}}
            variants={slideLeft}
        
       >
        {/* Top-left gears - visible on all screens but smaller on mobile */}
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden lg:block absolute -top-8 
          sm:-top-8 md:-top-12 lg:-top-16 xl:-top-17 
          -left-9 sm:-left-10 
          md:-left-15 lg:-left-6 
          xl:-left-20 w-20 sm:w-10 
          md:w-32 lg:w-16 
          xl:w-40 opacity-100
         sm:opacity-80 md:opacity-100 animate-spin z-0"
          style={{ animationDuration: "12s" }}
        />
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden lg:block absolute -top-12 sm:-top-10 
          md:-top-20
          lg:-top-20 
          xl:-top-24 left-5 sm:left-2 
          md:left-5 lg:left-10 
          xl:left-10 w-14 sm:w-8 
          md:w-20 lg:w-2 
          xl:w-27 opacity-100 sm:opacity-100 md:opacity-100 animate-spin z-0"
          style={{
            animationDuration: "10s",
            animationDirection: "reverse",
          }}
        />

        {/* Green block + carousel */}
        <div
          className="relative rounded-3xl sm:rounded-[2.5rem] shadow-xl 
          sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full h-full z-10"
          style={{
            background: `linear-gradient(135deg, ${MY_COLORS.secondaryGreen}, ${MY_COLORS.green})`,
          }}
        >
          {/* === CAROUSEL === */}
          <div
            ref={carouselRef}
            className="md:absolute top-3 sm:top-4 md:top-5 md:-right-6 lg:-right-10 w-full md:w-[360px] lg:w-[400px] h-40 sm:h-48 md:h-[420px] lg:h-[450px] rounded-2xl sm:rounded-[1.25rem] overflow-hidden bg-white shadow-xl sm:shadow-2xl z-20"
            tabIndex={0}
            role="region"
            aria-label={t("entreprise.elecitCarousel.carouselAriaLabel")}
          >
            <img
              src={images[currentIndex]}
              alt="ElecIT workplace"
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Dots Navigation */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-30">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-white w-6 sm:w-8 h-1.5 sm:h-2"
                      : "bg-white/50 w-1.5 sm:w-2 h-1.5 sm:h-2"
                  }`}
                  aria-label={`${t("entreprise.elecitCarousel.goToImage")} ${i + 1}`}
                  aria-current={i === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* === GROUP: RIGHT CONTENT === */}
      <motion.div
        className="elecit-content-wrapper max-w-lg lg:max-w-xl flex-1 relative p-4 sm:p-6 md:p-8 z-10"
        data-component="elecit-content"
        initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={slideRight}
       >
        {/* Helmet Icon - visible on all screens */}
        <div
          className="hidden lg:block absolute -top-6 sm:-top-10 md:-top-16 
          lg:-top-20 xl:-top-24 -right-4 sm:-right-6 md:-right-8
          lg:-right-12 xl:-right-14 w-16 sm:w-24 md:w-32 
          lg:w-36 xl:w-44 origin-center z-0"
          style={{
            transform: "scaleX(-1)",
            transformOrigin: "center",
          }}
        >
          <motion.img
            src={ICONS.Casque}
            alt="helmet"
            className="w-full"
            style={{
              color: MY_COLORS.secondaryGreen,
              opacity: 100,
            }}
            animate={{
              y: [0, -55, 0], // floating up & down
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>

        {/* TITLE with higher z-index to stay on top */}
        <div className="relative z-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 flex items-center">
            <span
              style={{ color: MY_COLORS.secondaryGreen }}
              className="mr-1.5 sm:mr-2"
            >
              »
            </span>
            {t("entreprise.elecitCarousel.title")}
            <span
              style={{
                color: MY_COLORS.secondaryGreen,
                fontWeight: 700,
              }}
            >
              {t("entreprise.elecitCarousel.titleHighlight")}
            </span>
          </h2>
        </div>

        {/* Paragraph 1 */}
        <p 
          className="text-gray-900 mb-3 sm:mb-4 text-justify leading-relaxed text-xs sm:text-sm lg:text-base relative z-20"
          dangerouslySetInnerHTML={{ __html: t("entreprise.elecitCarousel.paragraph1") }}
        />

        {/* Paragraph 2 */}
        <p 
          className="text-gray-600 mb-4 sm:mb-6 text-justify leading-relaxed text-xs sm:text-sm lg:text-base relative z-20"
          dangerouslySetInnerHTML={{ __html: t("entreprise.elecitCarousel.paragraph2") }}
        />

        {/* Documents à lire Section */}
        <div className="mt-6 sm:mt-8 relative z-20">
          <p className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
            {t("entreprise.elecitCarousel.documentsTitle")}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:opacity-80 transition-opacity inline-block"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t("entreprise.elecitCarousel.document1")}
            </a>
            <span className="text-gray-600 hidden sm:inline">&amp;</span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:opacity-80 transition-opacity inline-block"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              {t("entreprise.elecitCarousel.document2")}
            </a>
          </div>
        </div>

        {/* Bottom-right gear - visible on all screens */}
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden lg:block absolute -bottom-12 sm:-bottom-16 md:-bottom-24 lg:-bottom-32 xl:-bottom-40 -right-4 sm:-right-6 md:-right-10 lg:-right-16 xl:-right-20 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 opacity-60 sm:opacity-80 md:opacity-100 rotate-45 animate-spin z-0"
          style={{ animationDuration: "4s" }}
        />
      </motion.div>

    </div>
  );
};

export default ElecITCarouselCard;