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
            {/* Green Text Block - MIDDLE LAYER */}
            <div
              className="rounded-3xl p-8 relative z-20 mb-8"
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
                <p className="text-base" style={{ color: MY_COLORS.black }}>
                  Nous serons heureux d'apporter des
                  <br />
                  réponses à vos questions.
                </p>
              </div>
            </div>

            {/* Border Container - BOTTOM LAYER */}
            <div className="px-4 -mt-16 relative z-10">
              {/* Green Border (Outer Layer) */}
              <div
                className="rounded-3xl p-0.5 relative z-10"
                style={{ backgroundColor: MY_COLORS.green }}
              >
                {/* Space Layer */}
                <div
                  className="rounded-3xl p-1 relative z-10"
                  style={{ backgroundColor: MY_COLORS.gray }}
                >
                  {/* Image - TOP LAYER */}
                  <img
                    src={IMAGES.IMG4}
                    alt="Technicien électrique"
                    className="rounded-2xl w-full h-[480px] object-cover relative z-30"
                  />
                </div>
              </div>
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

                {/* CTA Button - Outlined */}
                <button
                  className="px-6 py-2.5 rounded-full font-medium border-2 transition-all hover:bg-opacity-10"
                  style={{
                    borderColor: MY_COLORS.green,
                    color: MY_COLORS.green,
                    backgroundColor: "transparent",
                  }}
                >
                  Nous joindre
                </button>
              </div>

              {/* Right Side: Gear Icons */}
              <div className=" relative flex gap-3 ">
                <div className="w-[100px] h-[100px]">
                  <img
                    src={ICONS.Engrenage_plan}
                    alt="Gear"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-[150px] h-[180px]">
                  <img
                    src={ICONS.Engrenage_plan}
                    alt="Gear"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepriseAcc;