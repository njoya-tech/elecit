import React, { useState } from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import { Plus, Minus } from "lucide-react";

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
      className="w-full pt-10 pb-16 px-14"
      style={{ backgroundColor: MY_COLORS.gray }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT BLOCK - FAQ */}
          <div className="space-y-8 relative">
            {/* Hard Hat Icon */}
            <div className="absolute w-32 h-32 -top-20 -left-24">
              <img
                src={ICONS.Casque}
                alt="Casque"
                className="w-full h-full object-contain animate-bounce"
              />
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl font-bold lg:mt-10"
              style={{ color: MY_COLORS.black }}
            >
              Questions fréquemment <br />
              posées
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-4 lg:space-y-6 lg:mt-40">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-4"
                  style={{ borderColor: MY_COLORS.creamDark }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-start justify-between text-left"
                  >
                    <h3
                      className="text-lg md:text-xl font-medium pr-4"
                      style={{ color: MY_COLORS.green }}
                    >
                      {item.question}
                    </h3>

                    {/* Plus/Minus Icon */}
                    <span className="flex-shrink-0 w-6 h-6">
                      {openIndex === index ? (
                        <Minus
                          size={24}
                          color={MY_COLORS.green}
                          strokeWidth={2}
                        />
                      ) : (
                        <Plus
                          size={24}
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
                      className="mt-4 text-base leading-relaxed"
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
          <div className="relative">
            {/* Border Container - BACK LAYER (z-10) */}
            <div className="absolute top-32 left-0 right-0 z-10">
              <div className="px-4">
                <div
                  className="rounded-3xl p-0.5"
                  style={{ backgroundColor: MY_COLORS.green ,
                    marginTop:"42px"
                  }}
                >
                  <div
                    className="rounded-3xl p-1"
                    style={{ backgroundColor: MY_COLORS.gray }}
                  >
                    <div className="h-[480px] rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Green Text Block - MIDDLE LAYER (z-20) */}
            <div
              className="rounded-3xl p-8 relative z-20  "
              style={{
                backgroundColor: MY_COLORS.green,
                
              }}
             >
              {/* Title & Subtitle */}
              <div className="text-center">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: MY_COLORS.black }}
                >
                  Obtenez d'autres
                  <br />
                  informations
                </h3>
                <p className="text-base" style={{ color: MY_COLORS.black,
                  lineHeight: "1.75rem",
                  marginBottom:"18px"
                 }}>
                  Nous serons heureux d'apporter des
                  <br />
                  réponses à vos questions.
                </p>
              </div>
            </div>

            {/* Image - FRONT LAYER (z-30) */}
            <div className="px-4 -mt-16 relative z-30">
              <img
                src={IMAGES.IMG4}
                alt="Technicien électrique"
                className="rounded-2xl w-full h-[480px] object-cover"
                style={{height:"480px",
                  width:"95%",
                  marginLeft:"15px",
                  marginTop:"10px"
                }}
              />
            </div>

            {/* CTA Section: Arrow + Button + Gears */}
            <div className="px-4 mt-8 flex items-center justify-between">
              {/* Left Side: Arrow + Button */}
              <div className="flex items-center gap-4">
                {/* Curved Arrow Icon */}
                <div className="w-16 h-16">
                  <img
                    src={ICONS.FlecheVerte}
                    alt="Arrow"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* CTA Button - With Hover Fill Animation */}
                <button
                  className="px-8 py-3 rounded-full font-medium border-2 transition-all duration-500 ease-in-out"
                  style={{
                    borderColor: MY_COLORS.green,
                    color: MY_COLORS.green,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = MY_COLORS.green;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = MY_COLORS.green;
                  }}
                >
                  Nous joindre
                </button>
              </div>

              {/* Right Side: Animated Gear Icons - Diagonal Layout */}
              <div className="relative w-48 h-48">
                {/* Small Gear (Top) */}
                <div
                  className="absolute"
                  style={{
                    top: "-10%",
                    right: "-9%",
                    width: "100px",
                    height: "100px",
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
                  className="absolute"
                  style={{
                    top: "18%",
                    right: "-50%",
                    width: "150px",
                    height: "150px",
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
