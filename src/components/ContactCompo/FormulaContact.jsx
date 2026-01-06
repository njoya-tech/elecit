import React from "react";
import { MY_COLORS } from "../../constants/colors.js";
import { IMAGES } from "../../asset/assets.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormulaContact = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* CONTAINER 2: Headings */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00729B]">
            Formulaire de contact
          </h1>
          <p className="mt-4 text-lg md:text-xl font-semibold text-black">
            Une question, un besoin ou un projet à discuter ?
          </p>
          <p className="mt-2 text-lg md:text-xl font-semibold text-[#00729B]">
            Remplissez le formulaire ci-dessous
          </p>
        </div>

        {/* CONTAINER 3: Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT: FORM (fields next) */}
          <div className="bg-white border border-[#00729B] p-8 md:p-10 shadow-sm">
            <h2 className="sr-only">Formulaire de contact</h2>
            <form className="space-y-6">
              {/* Nom de famille */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Nom de famille *
                </label>
                <input
                  type="text"
                  placeholder="Saisissez votre nom de famille"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-1 focus:ring-[#00729B] rounded-sm px-4 py-3 text-sm outline-none"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  placeholder="Saisissez votre prénom"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-1 focus:ring-[#00729B] rounded-sm px-4 py-3 text-sm outline-none"
                />
              </div>
              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Téléphone *
                </label>
                <PhoneInput
                  country={"fr"} // default country
                  enableSearch={true} // search in dropdown
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="!w-full !h-[48px] !text-sm !border !border-gray-300 
                !rounded-sm !pl-12" // tweak padding to your taste
                  buttonClass="!border !border-gray-300 !rounded-l-sm"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  placeholder="Saisissez votre e-mail"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-1 focus:ring-[#00729B] rounded-sm px-4 py-3 text-sm outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Répondez en quelques mots"
                  className="w-full border border-gray-300 focus:border-[#00729B] focus:ring-1 focus:ring-[#00729B] rounded-sm px-4 py-3 text-sm outline-none resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#00729B] hover:bg-[#005d7e] text-white font-semibold py-3 text-sm tracking-wide transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="w-full h-full">
            <img
              src={IMAGES.IMG17} // to update
              alt="Professionnel dans un environnement industriel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormulaContact;
