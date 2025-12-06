import { useState, useEffect, useRef } from "react";
import { IMAGES, ICONS } from "../asset/assets";
import { MY_COLORS } from "../constants/colors";

// Use YOUR images
const images = [IMAGES.IMG1, IMAGES.IMG2, IMAGES.IMG3];

const ElecITCarouselCard = () => {
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
        setCurrentIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    const carousel = carouselRef.current;
    // Ensure element is focusable for keyboard navigation
    if (carousel) {
      carousel.addEventListener("keydown", handleKey);
    }
    return () => {
      if (carousel) carousel.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="relative bg-white flex flex-col md:flex-row items-start justify-center p-4 sm:p-6 md:p-8 py-6 md:py-12 top-0 w-full gap-6 sm:gap-8 md:gap-16">
      {/* === GROUP: GREEN BLOCK + TOP GEARS (single block for easy responsive control) === */}
      <div
        className="elecit-green-block-wrapper relative flex-none w-full max-w-[420px] sm:max-w-[520px] md:w-[400px] md:h-[500px] h-80 sm:h-[380px] lg:-left-30"
        data-component="elecit-green-block"
      >
        {/* Grouped Top-left gears (positioned relative to this wrapper) */}
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden md:block absolute -top-12 md:-top-20 -left-6 md:-left-20 w-10 sm:w-14 md:w-20 opacity-100 animate-spin --z-10 lg:w-50"
          style={{ animationDuration: "12s" }}
        />
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden md:block absolute -top-14 md:-top-24 left-3 md:left-4 w-8 sm:w-12 md:w-14 opacity-100 animate-spin --z-10 lg:w-30 lg:left-14 lg:-top-26"
          style={{
            animationDuration: "10s",
            animationDirection: "reverse",
          }}
        />

        {/* Green block + carousel (still unchanged internally) */}
        <div
          className="relative rounded-[2.5rem] shadow-2xl p-6 sm:p-8 md:p-10 w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${MY_COLORS.secondaryGreen}, ${MY_COLORS.green})`,
          }}
        >
          {/* === CAROUSEL === */}
          <div
            ref={carouselRef}
            className="md:absolute top-4 md:top-5 md:-right-10 right-0 w-full md:w-[400px] h-44 sm:h-56 md:h-[450px] rounded-[1.25rem] overflow-hidden bg-white shadow-2xl"
            tabIndex={0}
            role="region"
            aria-label="Image carousel"
          >
            <img
              src={images[currentIndex]}
              alt="ElecIT workplace"
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Transparent stripe placeholder */}
            <div className="absolute bottom-0 w-full h-10 bg-transparent opacity-60" />

            {/* Dots Navigation */}
            <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex ? "bg-white w-8 h-2" : "bg-white/50 w-2 h-2"
                  }`}
                  aria-label={`Aller à l'image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === GROUP: RIGHT CONTENT (helmet, text, docs, bottom gear) === */}
      <div
        className="elecit-content-wrapper max-w-md flex-1 relative p-4 sm:p-6 md:p-8"
        data-component="elecit-content"
      >
        {/* Helmet Icon */}
        <div
          className="hidden md:block absolute -top-16 md:-top-24 right-0 md:-right-10 lg:-right-14 w-36 sm:w-44 origin-center"
          style={{
            transform: "scaleX(-1)",
            transformOrigin: "center",
          }}
        >
          <img
            src={ICONS.Casque}
            alt="helmet"
            className="w-full animate-bounce"
            style={{
              color: MY_COLORS.secondaryGreen,
              animationDelay: "0s",
            }}
          />
        </div>

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <span
            style={{ color: MY_COLORS.secondaryGreen }}
            className="mr-2"
          >
            »
          </span>
          L'essentiel d'Elec
          <span
            style={{
              color: MY_COLORS.secondaryGreen,
              fontWeight: 700,
            }}
          >
            IT
          </span>
        </h2>

        {/* Paragraph 1 */}
        <p className="text-gray-600 mb-4 text-justify leading-relaxed text-sm sm:text-base">
          Depuis sa création en{" "}
          <span className="font-bold">2015</span>, ElecIT
          Engineering s'est imposée comme un acteur pluridisciplinaire, capable
          de piloter des projets complexes, alliant savoir-faire technique,
          innovation et engagement sur le terrain.
        </p>

        {/* Paragraph 2 */}
        <p className="text-gray-600 mb-4 text-justify leading-relaxed text-sm sm:text-base">
          Animée par une volonté constante d'apporter des réponses concrètes aux
          besoins de ses clients, l'entreprise s'est construite autour de la
          mission de son promoteur :{" "}
          <span className="font-bold">
            mettre la technologie et l'ingénierie au service du développement
            durable, de la performance et du bien-être collectif au Cameroun et
            à l&apos;international.
          </span>
        </p>

        {/* Documents à lire Section */}
        <div className="mt-8">
          <p className="font-bold text-gray-900 mb-3">Documents à lire:</p>

          <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:opacity-80 transition-opacity"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              Certification ISO 9001 V 2015
            </a>
            <span className="text-gray-600">&amp;</span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:opacity-80 transition-opacity"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              Politique de qualité
            </a>
          </div>
        </div>

        {/* Bottom-right gear */}
        <img
          src={ICONS.Engrenage_plan}
          alt="gear"
          className="hidden md:block absolute -bottom-32 md:-bottom-40 right-0 md:-right-20 w-20 md:w-50 opacity-100 rotate-45 animate-spin"
          style={{ animationDuration: "4s" }}
        />
      </div>
    </div>
  );
};

export default ElecITCarouselCard;