


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg';
import { useTranslation } from 'react-i18next';
import BM3 from '../../assets/new/BM3.PNG'
import an5 from '../../assets/new/an5.png'
import c2 from '../../assets/c2.jpg'
import an10 from '../../assets/new/an10.jpg'
import an7 from '../../assets/new/an7.jpg'
import an9 from '../../assets/new/an9.jpg'
import an12 from '../../assets/new/an12.jpeg'
import an11 from '../../assets/new/an11.jpg'
import an8 from '../../assets/new/an8.jpg'
import ProjectsService from '../../services/projects.service';



const MY_COLORS = {
  primaryGreen: '#6B8E23',
  secondaryGreen: '#8BC34A',
  darkGreen: '#558B2F',
  lightGreen: '#C5E1A5',
  white: '#FFFFFF',
  black: '#000000',
  darkBlue: '#0B1F3F',
  blue: '#1976D2',
  gray: '#757575',
  lightGray: '#F5F5F5'
};

// Mapping des images pour chaque projet
const PROJECT_IMAGES = {
  1: {
    main: BM3,
     gallery: [
  BM3 ]
  },
  2: {
    main: an5,
     gallery: [
  an5]
  },
  3: {
    main: c2,
    gallery: [
     c2 ]
  },
  4: {
    main: an7,
     gallery: [
an7]
  },
  5: {
    main: an10,
    gallery: [
  an10
]
  },
  6: {
    main: an9,
    gallery: [
an9]
  },
  7: {
    main: an8,
    gallery: [
 an8]
  },
  8: {
    main: an12,
    gallery: [
 an12
]
  },
  9: {
    main: an11, 
    gallery: [
  an11
]
  }
};



const ProjectCard = ({ project, onClick }) => {
  const { t } = useTranslation();
  const projectImage = PROJECT_IMAGES[project.id]?.main || 'https://via.placeholder.com/400x300';
  
  return (
    <div 
      className="
        relative bg-white rounded-lg 
        w-full
        min-h-[480px] xs:min-h-[500px] sm:min-h-[520px] md:min-h-[540px] lg:min-h-[500px]
        flex flex-col
        overflow-visible
        cursor-pointer
        transition-all duration-300 hover:shadow-2xl
        group
      "
      style={{ border: `2px solid ${MY_COLORS.secondaryGreen}` }}
      onClick={() => onClick(project)}
    >
      {/* Badge numéro */}
      <div 
        className="
          absolute -top-4 sm:-top-5 md:-top-6 
          left-1/2 transform -translate-x-1/2 
          w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14
          rounded-full flex items-center justify-center 
          text-white text-xl sm:text-2xl font-bold z-10
          shadow-lg
        "
        style={{ backgroundColor: MY_COLORS.primaryGreen }}
      >
        {project.number}
      </div>

      {/* Image */}
      <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 overflow-hidden rounded-t-lg">
        <img 
          src={projectImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h3 
          className="
            text-lg xs:text-xl sm:text-xl md:text-2xl 
            font-bold mb-2 sm:mb-3 
            text-center 
            line-clamp-2
          " 
          style={{ color: MY_COLORS.darkBlue }}
        >
          {project.title}
        </h3>

        <p className="
          text-xs xs:text-sm sm:text-sm md:text-base
          text-gray-700 text-center leading-relaxed
          line-clamp-3 sm:line-clamp-4
          mb-4
        ">
          {project.shortDescription}
        </p>

        {/* Bouton Voir plus */}
        <div className="mt-auto pt-4 sm:pt-5 md:pt-6 flex justify-center">
          <button 
            className="
              px-6 sm:px-7 md:px-8 
              py-2 sm:py-2.5 md:py-3
              text-sm sm:text-base
              rounded-full font-semibold 
              transition-all duration-300
              hover:shadow-lg
            "
            style={{
              border: `2px solid ${MY_COLORS.secondaryGreen}`,
              color: MY_COLORS.secondaryGreen
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
              e.currentTarget.style.color = MY_COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = MY_COLORS.secondaryGreen;
            }}
          >
            {t('projects.projectCard.seeMore')}
          </button>
        </div>
      </div>
    </div>
  );
};   

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = PROJECT_IMAGES[project.id]?.gallery || [
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div 
      className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="
          bg-white rounded-lg 
          w-full max-w-6xl 
          max-h-[95vh] sm:max-h-[90vh] 
          overflow-y-auto
          relative
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8">
          {/* En-tête */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Titre et icône animée */}
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4 relative">
                <h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold" 
                  style={{ color: MY_COLORS.darkBlue }}
                >
                  {t('projects.projectModal.mechanicalFabrication')}
                </h2>
                
                {/* Engrenages animés - cachés sur mobile */}
                <div className="hidden md:block">
                  <motion.img 
                    src={rail} 
                    alt="engrenage" 
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 absolute -top-2 md:-top-4 left-full ml-2"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 6, 
                      ease: "linear", 
                      repeat: Infinity 
                    }}
                  />
                </div>
              </div>
              
              {/* Informations du projet */}
              <div className="flex-1 lg:pl-6 xl:pl-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                  {t('projects.projectModal.project')} {project.title}
                </h3>
                <div className="space-y-1 text-sm sm:text-base md:text-lg">
                  <p>
                    <span className="font-semibold">{t('projects.projectModal.dateRealisation')}</span> {project.dateRealisation}
                  </p>
                  <p>
                    <span className="font-semibold">{t('projects.projectModal.projectStatus')}</span>{' '}
                    <span style={{ color: MY_COLORS.blue }}>{project.statut}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Colonne gauche - Carrousel */}
            <div>
              <div className="relative group">
                <img 
                  src={carouselImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg"
                />
                
                {/* Boutons navigation carrousel */}
                {carouselImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="
                        absolute left-2 top-1/2 -translate-y-1/2
                        bg-white/80 hover:bg-white
                        p-2 rounded-full
                        transition-all duration-300
                        opacity-0 group-hover:opacity-100
                      "
                      style={{ color: MY_COLORS.primaryGreen }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="
                        absolute right-2 top-1/2 -translate-y-1/2
                        bg-white/80 hover:bg-white
                        p-2 rounded-full
                        transition-all duration-300
                        opacity-0 group-hover:opacity-100
                      "
                      style={{ color: MY_COLORS.primaryGreen }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Indicateurs carrousel */}
              {carouselImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: index === currentImageIndex 
                          ? MY_COLORS.primaryGreen 
                          : MY_COLORS.lightGray
                      }}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Colonne droite - Informations */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <h4 
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3" 
                  style={{ color: MY_COLORS.darkBlue }}
                >
                  {t('projects.projectModal.projectDescription')}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3" 
                  style={{ color: MY_COLORS.darkBlue }}
                >
                  {t('projects.projectModal.utility')}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                  {project.utilite}
                </p>
              </div>

              <div>
                <h4 
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3" 
                  style={{ color: MY_COLORS.darkBlue }}
                >
                  {t('projects.projectModal.clientFeedback')}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify mb-2">
                  "{project.retourClient}"
                </p>
                <p className="text-sm sm:text-base italic" style={{ color: MY_COLORS.secondaryGreen }}>
                  {project.responsable}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: MY_COLORS.blue }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {t('projects.projectModal.haveProject')}
            </button>
            
            <button
              onClick={onClose}
              className="px-8 py-3 font-semibold transition-all duration-300"
              style={{ color: MY_COLORS.darkBlue }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {t('projects.projectModal.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les catégories et projets depuis Directus
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesData, projectsData] = await Promise.all([
          ProjectsService.getCategories(i18n.language),
          ProjectsService.getProjects(i18n.language)
        ]);

        // Ajouter "Tous" en première catégorie
        setCategories([
          
          ...categoriesData
        ]);

        setProjects(projectsData);
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language, t]);

  // Filtrer les projets par catégorie
  const filteredProjects = activeCategory === 'all' 
    ? projects
    : projects.filter(p => p.categoryId === activeCategory);

  if (loading) {
    return (
      <div className="w-full py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 flex justify-center items-center" style={{backgroundColor: MY_COLORS.white}}>
        <div className="text-xl" style={{ color: MY_COLORS.primaryGreen }}>
          {t('projects.loading')}...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6" style={{backgroundColor: MY_COLORS.white}}>
      <div className="max-w-7xl mx-auto">
        {/* Tabs de catégories */}
        <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-3 xs:px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs xs:text-sm sm:text-base font-semibold transition-all duration-300 relative whitespace-nowrap hover:scale-105"
              style={{
                color: activeCategory === category.id 
                  ? MY_COLORS.secondaryGreen 
                  : MY_COLORS.gray
              }}
            >
              {category.label}
              {activeCategory === category.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8 sm:gap-10 md:gap-12 
          mt-8 sm:mt-10 md:mt-12
        ">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsSection;