import React, { useState } from "react";
import { ICONS, IMAGES } from "../../asset/assets";
import { MY_COLORS } from "../../constants/colors";
import { Plus, Minus } from "lucide-react";
import CTAButton from "../CTA/CTAButton.jsx";
import { useTranslation } from "react-i18next";

const EntrepriseAcc = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = t("entreprise.entrepriseAcc.items", { returnObjects: true });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      className="w-screen py-12 md:py-16 lg:py-24 relative -mx-[50vw] left-1/2 right-1/2"
      style={{
        backgroundColor: MY_COLORS.gray,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-0">
          {/* LEFT BLOCK - FAQ */}
          <div className="space-y-6 md:space-y-8 relative">
            {/* Hard Hat Icon */}
            <div className="absolute w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 -top-12 md:-top-20 -left-8 md:-left-16 lg:-left-24">
              <img
                src={ICONS.Casque}
                alt="Casque"
                className="w-full h-full object-contain animate-bounce"
                style={{
                  animationDuration:"3s"
                }}
              />
            </div>

            {/* Title */}
            <h2
              className="text-2xl md:text-4xl font-bold mt-4 md:mt-6 lg:mt-10"
              style={{ color: MY_COLORS.black }}
            >
              {t("entreprise.entrepriseAcc.title")}
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-3 md:space-y-4 lg:space-y-6 mt-6 md:mt-8 lg:mt-40">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-3 md:pb-4"
                  style={{ borderColor: MY_COLORS.creamDark }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-start justify-between text-left"
                  >
                    <h3
                      className="text-base md:text-lg lg:text-xl font-medium pr-3 md:pr-4"
                      style={{ color: MY_COLORS.green }}
                    >
                      {item.question}
                    </h3>

                    {/* Plus/Minus Icon */}
                    <span className="shrink-0 w-5 h-5 md:w-6 md:h-6">
                      {openIndex === index ? (
                        <Minus
                          className="w-5 h-5 md:w-6 md:h-6"
                          color={MY_COLORS.green}
                          strokeWidth={2}
                        />
                      ) : (
                        <Plus
                          className="w-5 h-5 md:w-6 md:h-6"
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
                      className="mt-3 md:mt-4 text-sm md:text-base leading-relaxed"
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
              className="absolute top-30 md:top-35 
              lg:top-25 left-0 right-0 z-10"
            >
              <div className="px-2 md:px-4">
                <div
                  className="rounded-2xl md:rounded-3xl p-0.5"
                  style={{
                    backgroundColor: MY_COLORS.green,
                    marginTop: "28px",
                  }}
                >
                  <div
                    className="rounded-2xl md:rounded-3xl p-1"
                    style={{ backgroundColor: MY_COLORS.gray }}
                  >
                    <div className="h-64 md:h-96 lg:h-[480px] rounded-xl md:rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Green Text Block - MIDDLE LAYER (z-20) */}
            <div
              className="rounded-2xl md:rounded-3xl p-5 md:p-7 lg:p-8 relative z-20"
              style={{
                backgroundColor: MY_COLORS.green,
              }}
            >
              {/* Title & Subtitle */}
              <div className="text-center">
                <h3
                  className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4"
                  style={{ color: MY_COLORS.black }}
                >
                  {t("entreprise.entrepriseAcc.contactTitle")}
                </h3>
                <p
                  className="text-sm md:text-base text-slate-900"
                  style={{
                    color: MY_COLORS.black,
                    lineHeight: "1.75rem",
                    marginBottom: "24px",
                  }}
                >
                  {t("entreprise.entrepriseAcc.contactSubtitle")}
                </p>
              </div>
            </div>

            {/* Image - FRONT LAYER (z-30) */}
            <div
              className="px-2 md:px-4 -mt-10 md:-mt-14 
              lg:-mt-12 relative z-30 md:left-2 md:-top-2"
            >
              <img
                src={IMAGES.IMG4}
                alt="Technicien électrique"
                className="rounded-xl md:rounded-2xl w-full h-60
                 md:h-96 lg:h-[480px] object-cover"
                style={{
                  width: "97%",
                  marginLeft: "2px",
                  marginTop: "19px",
                }}
              />
            </div>

            {/* CTA Section: Button + Gears */}
            <div className="px-2 md:px-4 mt-6 md:mt-8 flex items-center justify-between ml-0 lg:ml-40">
              {/* Left Side: Button */}
              <div className="flex items-center gap-3 md:gap-4  shrink-0">
                <CTAButton
                  onClick={() => alert("Video clicked!")}
                  className="whitespace-nowrap min-w-fit"
                >
                  {t("entreprise.entrepriseAcc.contactButton")}
                </CTAButton>
              </div>

              {/* Right Side: Animated Gear Icons - Diagonal Layout */}
              <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48">
                {/* Small Gear (Top) */}
                <div
                  className="hidden lg:block  absolute w-14 h-14 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px]"
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
                  className=" hidden lg:block absolute w-20 h-20 md:w-32
                   md:h-32 lg:w-[150px] lg:h-[150px]"
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
