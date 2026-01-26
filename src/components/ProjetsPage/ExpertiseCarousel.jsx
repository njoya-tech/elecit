import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectsService from '../../services/projets/projects.service';
import '../FabriMeca/FoRound.css';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Image placeholder SVG
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23374151" font-family="Arial" font-size="16"%3EImage non disponible%3C/text%3E%3C/svg%3E';

const ExpertiseCarousel = ({ categoryId = 1 }) => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsToShow = 3;

  // Charge les projets expertise
  useEffect(() => {
    const fetchExpertiseProjects = async () => {
      try {
        setLoading(true);
        console.log('🎯 [ExpertiseCarousel] Chargement projets expertise...');
        console.log('🌐 [ExpertiseCarousel] Langue:', i18n.language);
        console.log('📁 [ExpertiseCarousel] Catégorie:', categoryId);

        const expertiseData = await ProjectsService.getExpertiseProjects(
          i18n.language, 
          categoryId
        );
        
        console.log('📦 [ExpertiseCarousel] Projets reçus:', expertiseData.length);
        setProjects(expertiseData);
      } catch (error) {
        console.error('❌ [ExpertiseCarousel] Erreur chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertiseProjects();
  }, [i18n.language, categoryId]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Gestionnaire d'erreur d'image
  const handleImageError = (e) => {
    e.target.src = PLACEHOLDER_IMAGE;
    e.target.onerror = null;
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="relative">
        <div className="text-center py-12">
          <div className="text-xl font-semibold" style={{ color: MY_COLORS.primaryBlue }}>
            Chargement des expertises...
          </div>
        </div>
      </div>
    );
  }

  // Aucun projet trouvé
  if (projects.length === 0) {
    return (
      <div className="relative">
        <div className="text-center py-12 text-gray-600">
          <p className="text-lg">Aucun projet d'expertise disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Button - Left */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 px-4" 
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div className="text-center">
                {/* Image du projet */}
                <div className="bg-gray-200 rounded-lg mb-4 h-64 overflow-hidden">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Image non disponible
                    </div>
                  )}
                </div>

                {/* Titre du projet */}
                <h4 className="font-bold text-base" style={{ color: MY_COLORS.black }}>
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Button - Right */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: index === currentIndex ? MY_COLORS.secondaryGreen : MY_COLORS.black,
              opacity: index === currentIndex ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertiseCarousel;