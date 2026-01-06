import React, { useState } from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import { Plus, Minus } from "lucide-react";
import CTAButton from "../CTA/CTAButton.jsx";

const EntrepriseAcc = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question:
        "Où êtes-vous implantés et dans quelles régions intervenez-vous ?",
      answer:
        "Notre siège est basé à Douala et à Yaoundé; mais nous intervenons sur l'ensemble du territoire national et dans certaines zones d'Afrique de l'Ouest. Pour des projets spécifiques, nous étudions aussi les interventions à l'international.",
    },
    {
      question: "Quels sont vos délais moyens pour un projet ?",
      answer:
        "Les délais varient selon la complexité du projet. En général, nous livrons les projets standards en 2-4 semaines.",
    },
    {
      question: "Comment obtenir un devis personnalisé ?",
      answer:
        "Vous pouvez nous contacter via le formulaire en ligne ou par téléphone. Nous vous envoyons un devis sous 48h.",
    },
    {
      question:
        "Est-ce que vous proposez un accompagnement après la livraison ?",
      answer:
        "Oui, nous offrons un service après-vente complet incluant maintenance et support technique 24/7.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      className="w-full pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-10 lg:px-14"
      style={{ backgroundColor: MY_COLORS.gray }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* LEFT BLOCK - FAQ */}
          <div className="space-y-6 sm:space-y-8 relative">
            {/* Hard Hat Icon */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 -top-12 sm:-top-16 md:-top-20 -left-8 sm:-left-12 md:-left-16 lg:-left-24">
              <img
                src={ICONS.Casque}
                alt="Casque"
                className="w-full h-full object-contain animate-bounce"
              />
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6 lg:mt-10"
              style={{ color: MY_COLORS.black }}
            >
              Questions fréquemment <br />
              posées
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 mt-6 sm:mt-8 lg:mt-40">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-3 sm:pb-4"
                  style={{ borderColor: MY_COLORS.creamDark }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-start justify-between text-left"
                  >
                    <h3
                      className="text-base sm:text-lg md:text-xl font-medium pr-3 sm:pr-4"
                      style={{ color: MY_COLORS.green }}
                    >
                      {item.question}
                    </h3>

                    {/* Plus/Minus Icon */}
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                      {openIndex === index ? (
                        <Minus
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          color={MY_COLORS.green}
                          strokeWidth={2}
                        />
                      ) : (
                        <Plus
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          color={MY_COLORS.green}
                          strokeWidth={2}
                        />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openIndex === index ? "500px" : "0",
                      opacity: openIndex === index ? 1 : 0,
                    }}
                  >
                    <p
                      className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed"
                      style={{ color: MY_COLORS.black }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BLOCK - Contact Card */}
          <div className="relative mt-8 lg:mt-0">
            {/* Border Container - BACK LAYER (z-10) */}
            <div
             className="absolute top-30 sm:top-32
            md:top-35 lg:top-35 left-0 right-0 z-10">
              <div className="px-2 sm:px-4">
                <div
                  className="rounded-2xl sm:rounded-3xl p-0.5"
                  style={{
                    backgroundColor: MY_COLORS.green,
                    marginTop: "28px",
                  }}
                >
                  <div
                    className="rounded-2xl sm:rounded-3xl p-1"
                    style={{ backgroundColor: MY_COLORS.gray }}
                  >
                    <div className="h-64 sm:h-80 md:h-96 lg:h-[480px] rounded-xl sm:rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Green Text Block - MIDDLE LAYER (z-20) */}
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 relative z-20"
              style={{
                backgroundColor: MY_COLORS.green,
              }}
            >
              {/* Title & Subtitle */}
              <div className="text-center">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                  style={{ color: MY_COLORS.black }}
                >
                  Obtenez d'autres
                  <br />
                  informations
                </h3>
                <p
                  className="text-sm sm:text-base"
                  style={{
                    color: MY_COLORS.black,
                    lineHeight: "1.75rem",
                    marginBottom: "14px",
                  }}
                >
                  Nous serons heureux d'apporter des
                  <br />
                  réponses à vos questions.
                </p>
              </div>
            </div>

            {/* Image - FRONT LAYER (z-30) */}
            <div className="px-2 sm:px-4 -mt-10 sm:-mt-12
             md:-mt-14 lg:-mt-16 relative z-30">
              <img
                src={IMAGES.IMG4}
                alt="Technicien électrique"
                className="rounded-xl sm:rounded-2xl w-full h-64
                 sm:h-80 md:h-96 lg:h-[480px] object-cover"
                style={{
                  width: "98%",
                  marginLeft: "10px",
                  marginTop: "8px",
                }}
              />
            </div>

            {/* CTA Section: Button + Gears */}
            <div className="px-2 sm:px-4 mt-6 sm:mt-8 flex items-center justify-between">
              {/* Left Side: Button */}
              <div className="flex items-center gap-3 sm:gap-4">
                <CTAButton onClick={() => alert("Video clicked!")}>
                  Nous joindre
                </CTAButton>
              </div>

              {/* Right Side: Animated Gear Icons - Diagonal Layout */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48">
                {/* Small Gear (Top) */}
                <div
                  className="absolute w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px]"
                  style={{
                    top: "-10%",
                    right: "-9%",
                    animation: "rotateClockwise 20s linear infinite",
                  }}
                >
                  <img
                    src={ICONS.Engrenage_plan}
                    alt="Small Gear"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Large Gear (Bottom) - Diagonal Position */}
                <div
                  className="absolute w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]"
                  style={{
                    top: "18%",
                    right: "-50%",
                    animation: "rotateClockwise 25s linear infinite",
                  }}
                >
                  <img
                    src={ICONS.Engrenage_plan}
                    alt="Large Gear"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default EntrepriseAcc;