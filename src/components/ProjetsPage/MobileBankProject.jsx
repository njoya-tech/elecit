import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rail } from '../../assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../FabriMeca/FoRound.css';
import ExpertiseCarousel from './ExpertiseCarousel';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const MobileBankProject = ({ onClose, projectData }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ CORRECTION: Utiliser directement projectData des props
  const project = projectData;

  // Navigation carousel
  const nextSlide = () => {
    if (!project?.carouselImages?.length) return;
    setCurrentSlide((prev) => (prev + 1) % project.carouselImages.length);
  };

  const prevSlide = () => {
    if (!project?.carouselImages?.length) return;
    setCurrentSlide((prev) => (prev - 1 + project.carouselImages.length) % project.carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Reset carousel quand le projet change
  useEffect(() => {
    setCurrentSlide(0);
  }, [project?.id]);

  // Aucun projet trouvé
  if (!project) {
    return (
      <div className="w-full max-w-[90%] mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
            Projet non trouvé
          </h2>
          <button
            onClick={onClose || (() => window.location.href = '/projets')}
            className="px-8 py-3 rounded-full font-semibold text-white"
            style={{ backgroundColor: MY_COLORS.primaryBlue }}
          >
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  console.log('🎨 [MobileBankProject] Rendu avec projet:', project.title);

  return (
    <div className="w-full max-w-[90%] mx-auto px-6 py-16">
      {/* Bouton retour */}
      {onClose && (
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour
        </button>
      )}

      {/* Header Section */}
      <div className="flex text-center items-center justify-center mb-8 relative">
        <div>
          <h1 className="text-2xl font-bold mb-6">
        
          </h1>
          <h2 className="text-3xl font-bold mb-8">
            {project.title}
          </h2>
        </div>
        <div className="ml-8">
          <img src={rail} alt="" className='hidden w-30 h-30 lg:left-400 absolute rotating-gear' />
        </div>
      </div>

      {/* Project Info */}
      <div className="mb-8 text-center">
        <p className="text-xl mb-2 font-semibold">
          {t('projectNew.dateLabel')} {project.dateRealisation}
        </p>
        <p className="text-xl font-semibold">
          {t('projectNew.statusLabel')} <span style={{ color: MY_COLORS.secondaryGreen }}>{project.status}</span>
        </p>
      </div>

      {/* Cover Image (Image principale) */}
      {project.coverImage && (
        <div className="mb-12">
          <div className="w-full h-100 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('❌ Erreur chargement cover image:', project.coverImage);
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+non+disponible';
              }}
            />
          </div>
        </div>
      )}

      {/* Description Section */}
      {project.descriptionProjet && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6" style={{ color: MY_COLORS.black }}>
            {t('projectNew.descriptionTitle')}
          </h3>
          <div 
            className="text-xl leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: project.descriptionProjet }}
          />
        </div>
      )}

      {/* Section avec Carousel et Texte */}
      {(project.carouselImages?.length > 0 || project.processUtility) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 bg-gray-400/20 rounded-lg">
          {/* Left: Carousel */}
          {project.carouselImages?.length > 0 && (
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={project.carouselImages[currentSlide]}
                  alt={`${project.title} - Image ${currentSlide + 1}`}
                  className="w-full h-full object-contain "
                  onError={(e) => {
                    console.error('❌ Erreur chargement carousel image:', project.carouselImages[currentSlide]);
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+non+disponible';
                  }}
                />
              </div>

              {/* Navigation Buttons */}
              {project.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" style={{ color: MY_COLORS.black }} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" style={{ color: MY_COLORS.black }} />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide ? 'w-8' : ''
                        }`}
                        style={{
                          backgroundColor: index === currentSlide ? MY_COLORS.secondaryGreen : MY_COLORS.black,
                          opacity: index === currentSlide ? 1 : 0.5
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Decorative Gear Icon */}
              <div>
                <img src={rail} alt="" className='hidden w-50 h-50 lg:-left-10 lg:-bottom-140 absolute z-10 rotating-gear' />
              </div>
            </div>
          )}

         {/* Right: Text Content */}
<div className='items-start justify-center mt-5 px-6'>
  {/* Titre de la section Process */}
  {project.processTitle && (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-6" style={{ color: MY_COLORS.black }}>
        {t('projectNew.processTitle')}
      </h3>
      <p className="text-xl leading-relaxed text-gray-700 mb-6">
        {project.processTitle}
      </p>
    </div>
  )}

  {/* Titre et contenu de l'utilité */}
  {project.processUtility && (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-6" style={{ color: MY_COLORS.black }}>
        {t('projectNew.utilityTitle')}
      </h3>
      <div 
        className="text-xl leading-relaxed text-gray-700"
        dangerouslySetInnerHTML={{ __html: project.processUtility }}
      />
    </div>
  )}
</div>
        </div>
      )}

      {/* Section Valeur Ajoutée avec Vidéo */}
      {(project.valueDescription || project.videoUrl) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 bg-gray-400/20  rounded-lg">
          {/* Left: Text Content */}
          {project.valueDescription && (
            <div className='ml-5 mt-2'>
              <h3 className="text-2xl font-bold mb-6" style={{ color: MY_COLORS.black }}>
                {t('projectNew.valueTitle')}
              </h3>
              <div 
                className="text-xl leading-relaxed text-gray-700 mb-6 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: project.valueDescription }}
              />
            </div>
          )}

          {/* Right: Video */}
          {project.videoUrl && (
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <video className="w-full h-full object-fill" controls>
                  <source src={project.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Retour Client */}
      {project.clientFeedback && (
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: MY_COLORS.black }}>
            {t('projectNew.testimonialTitle')}
          </h3>
          <p className="text-xl text-center text-gray-700 italic mb-4">
            "{project.clientFeedback}"
          </p>
          {project.nameClientFeedback && (
            <p className="text-xl text-center font-semibold" style={{ color: MY_COLORS.secondaryGreen }}>
              - {project.nameClientFeedback}
            </p>
          )}
        </div>
      )}

      {/* Section Expertise */}
      {project.expertiseText && (
        <div className="mb-12 mx-auto">
          <div className="text-xl text-center font-bold text-gray-700 mb-12 p-8  rounded-lg">
            {project.expertiseText}
          </div>
        </div>
      )}
      
      {/* Carousel Expertise */}
      <ExpertiseCarousel projectId={project.id} />

      {/* Bouton Projet */}
      <div className="flex justify-center items-center relative  mt-5">
        <button 
          className="px-8 py-3 rounded-full font-semibold text-white text-sm"
          style={{ backgroundColor: MY_COLORS.black }}
          onClick={() => window.location.href = '/projets'}
        >
          {t('projectNew.projectButton')}
        </button>

        {/* Decorative Gear Icon */}
        <div>
          <img src={rail} alt="" className='hidden rotating-gear w-35 h-35 lg:-right-10 absolute z-10' />
        </div>
      </div>
    </div>
  );
};

export default MobileBankProject;