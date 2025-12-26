import React, { useEffect } from "react";
import { ICONS } from "../../asset/assets.js";
import { MY_COLORS } from "../../constants/colors.js";

const ProjectModal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/60 z-9999" onClick={onClose}></div>

      {/* MODAL CONTAINER */}
      <div
        className="fixed inset-0 z-10000 flex items-center justify-center p-4 sm:p-6 md:p-8"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTTOM LEFT DECORATIVE GEAR */}
          <div
            className="absolute w-24 h-24 md:w-32 md:h-32 z-10 opacity-100"
            style={{
              animation: "rotateClockwise 18s linear infinite",
              bottom: "5%",
              left: "-3%",
            }}
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
              //   style={{ filter: "brightness(0) saturate(100%)
              // invert(73%) sepia(35%) saturate(445%) hue-rotate(39deg) brightness(91%) contrast(87%)" }}
            />
          </div>

          {/* TOP RIGHT DECORATIVE GEAR */}
          <div
            className="absolute w-16 h-16 md:w-30 md:h-30 z-10"
            style={{
              animation: "rotateClockwise 15s linear infinite reverse",
              top: "18%",
              right: "2%",
            }}
          >
            <img
              src={ICONS.Engrenage_plan}
              alt=""
              className="w-full h-full object-contain"
              //   style={{ filter: "brightness(0) saturate(100%)
              // invert(73%) sepia(35%) saturate(445%) hue-rotate(39deg) brightness(91%) contrast(87%)" }}
            />
          </div>

          {/* MODAL CONTENT */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-0
           h-full max-h-[90vh] overflow-y-auto"
          >
            {/* LEFT SIDE - IMAGE */}
            <div className="relative p-8 md:p-10 flex flex-col bg-white md:-ml-[2px]">
              {/* Category Tag */}
              <div className="mb-4">
                <span className="px-4 py-2 text-2xl  font-bold text-black inline-block">
                  IT and DATA PROCESSING
                </span>
              </div>

              {/* Project Image */}
              <div className="relative flex-1 min-h-[300px] z-20">
                <img
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* RIGHT SIDE - DETAILS */}
            <div className="relative p-8 md:p-10 flex flex-col bg-white">
              {/* Project Title */}
              <h2 className="max-w-[90%] text-2xl md:text-3xl font-bold text-black leading-normal mb-6 break-words min-h-[4.8em]">
                Projet : {project?.title}
              </h2>

              {/* Date & Status */}
              <div className="mb-6 space-y-1">
                <p className="text-sm text-black">
                  <span className="font-bold">Date de réalisation: </span>
                  {project?.date || "12/06/23"}
                </p>
                <p className="text-sm text-black">
                  <span className="font-bold">Statut du projet: </span>
                  <span
                    style={{ color: MY_COLORS.green }}
                    className="font-bold"
                  >
                    {project?.status || "terminé"}
                  </span>
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-black mb-2">
                  Description du projet:
                </h3>
                <p className="text-sm text-black leading-relaxed text-left md:text-justify">
                  {project?.description ||
                    "Nous avons conçu et développé un système de gestion de contenu (CMS) sur mesure, pensé pour offrir une administration simple, rapide et totalement personnalisable."}
                </p>
              </div>

              {/* Utilité */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-black mb-2">
                  Utilité:
                </h3>
                <p className="text-sm text-black leading-relaxed">
                  {project?.utility ||
                    "Cette solution permet à l'entreprise de gérer efficacement ses informations, ses services et ses mises à jour sans dépendre d'un support technique externe"}
                </p>
              </div>

              {/* Client Feedback */}
              <div className="mb-8 flex-grow">
                <h3 className="text-base font-bold text-black mb-2">
                  Retour client:
                </h3>
                <p className="text-sm text-black leading-relaxed mb-3">
                  "
                  {project?.clientFeedback ||
                    "Le CMS conçu par ElecIT Engineering nous a simplifié la gestion de nos contenus. L'outil est intuitif, rapide et parfaitement adapté à nos besoins. Un vrai gain de temps au quotidien."}
                  "
                </p>
                <p
                  className="text-sm font-semibold italic"
                  style={{ color: MY_COLORS.green }}
                >
                  {project?.clientRole || "Directeur général"}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                <button
                  className="px-8 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: MY_COLORS.green }}
                  onClick={() => {
                    alert("Contactez-nous pour votre projet!");
                  }}
                >
                  Vous avez un projet?
                </button>

                <button
                  className="px-8 py-3 font-bold text-sm text-black bg-transparent transition-all duration-300 hover:text-gray-600"
                  onClick={onClose}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS ANIMATION */}
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
    </>
  );
};

export default ProjectModal;
