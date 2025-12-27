import React from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { IMAGES } from "../../asset/assets.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormulaContact = () => {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADINGS */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00729B] leading-tight">
            Formulaire de contact
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-black">
            Une question, un besoin ou un projet à discuter ?
          </p>
          <p className="mt-2 text-base sm:text-lg md:text-xl font-semibold text-[#00729B]">
            Remplissez le formulaire ci-dessous
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
          {/* LEFT: FORM */}
          <div className="bg-white border border-[#00729B] p-6 sm:p-8 md:p-10 shadow-sm rounded-lg">
            <h2 className="sr-only">Formulaire de contact</h2>
            <form className="space-y-5 sm:space-y-6">
              {/* Nom de famille */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Nom de famille *
                </label>
                <input
                  type="text"
                  placeholder="Saisissez votre nom de famille"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Prénom *
                </label>
                <input
                  type="text"
                  placeholder="Saisissez votre prénom"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Téléphone *
                </label>
                <PhoneInput
                  country={"cm"} // Changed to Cameroon default
                  enableSearch={true}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="!w-full !h-[44px] sm:!h-[48px] !text-sm !border !border-gray-300 !rounded-sm !pl-12 sm:!pl-14"
                  buttonClass="!border !border-gray-300 !rounded-l-sm"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  E-mail *
                </label>
                <input
                  type="email"
                  placeholder="Saisissez votre e-mail"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Répondez en quelques mots"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-2 focus:ring-[#00729B]/20 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none resize-none transition-all"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#00729B] hover:bg-[#005d7e] active:bg-[#004a63] text-white font-semibold py-3 sm:py-3.5 text-sm sm:text-base tracking-wide transition-all duration-200 rounded-sm"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full min-h-[400px]">
            <img
              src={IMAGES.IMG17}
              alt="Professionnel dans un environnement industriel"
              className="w-full h-full rounded-lg shadow-sm 
               object-cover object-[50%_20%]
               sm:object-[50%_30%]
               md:object-[50%_12%]
               lg:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormulaContact;
