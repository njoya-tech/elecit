


import React, { useState } from 'react';
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
    min-h-[520px] sm:min-h-[540px] md:min-h-[560px] lg:min-h-[500px]
    flex flex-col
    overflow-visible
    cursor-pointer
    transition-all duration-300 hover:shadow-2xl z-5
  "
  style={{ border: `2px solid ${MY_COLORS.secondaryGreen}` }}
  onClick={() => onClick(project)}
>

      {/* Badge numéro */}
      <div 
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold z-10"
        style={{ backgroundColor: MY_COLORS.primaryGreen }}
      >
        {project.number}
      </div>

      {/* Image */}
<div className="h-48 sm:h-52 md:h-56 overflow-hidden">
  <img 
  src={projectImage} 
  alt={project.title}
  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
/>
</div>


      {/* Contenu */}
      <div className="p-6 flex flex-col flex-grow">

<h3 className="text-xl font-bold mb-3 text-center" style={{ color: MY_COLORS.darkBlue }}>
  {project.title}
</h3>


<p className="
  text-sm text-gray-700 text-center leading-relaxed
  line-clamp-4
">
  {project.shortDescription}
</p>

        {/* Bouton Voir plus */}
        <div className="mt-auto pt-6 flex justify-center">


<button 
  className="px-8 py-2 rounded-full font-semibold transition-all duration-300"
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
  
  // Images du carrousel depuis le mapping
  const carouselImages = PROJECT_IMAGES[project.id]?.gallery || [
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x600'
  ];

  return (
    <div 
      className="fixed inset-0 bg-transparent backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto absolute"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* En-tête */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 lg:flex md:flex">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-3xl font-bold" style={{ color: MY_COLORS.darkBlue }}>
                  {t('projects.projectModal.mechanicalFabrication')}
                </h2>
                <div>
                  <div className="absolute top-24 left-100">
                    <motion.img 
                      src={rail} 
                      alt="engrenage" 
                      className="w-30 h-30"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 6, 
                        ease: "linear", 
                        repeat: Infinity 
                      }}
                    />
                  </div>
                  <div className="absolute top-120 left-5">
                    <motion.img 
                      src={rail} 
                      alt="engrenage" 
                      className="w-70 h-45"
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 6, 
                        ease: "linear", 
                        repeat: Infinity 
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 lg:pl-29 md:pl-29">
                <h3 className="text-2xl font-bold mb-2">
                  {t('projects.projectModal.project')} {project.title}
                </h3>
                <div className="space-y-1">
                  <p className="text-lg">
                    <span className="font-semibold">{t('projects.projectModal.dateRealisation')}</span> {project.dateRealisation}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">{t('projects.projectModal.projectStatus')}</span>{' '}
                    <span style={{ color: MY_COLORS.blue }}>{project.statut}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Colonne gauche - Carrousel */}
            <div>
              <div className="relative">
                <img 
                  src={carouselImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-100 object-cover rounded-lg"
                />
                
                {/* Indicateurs carrousel */}
                <div className="flex justify-center gap-2 mt-4">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: index === currentImageIndex 
                          ? MY_COLORS.primaryGreen 
                          : MY_COLORS.lightGray
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Informations */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-3" style={{ color: MY_COLORS.darkBlue }}>
                  {t('projects.projectModal.projectDescription')}
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3" style={{ color: MY_COLORS.darkBlue }}>
                  {t('projects.projectModal.utility')}
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.utilite}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3" style={{ color: MY_COLORS.darkBlue }}>
                  {t('projects.projectModal.clientFeedback')}
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify mb-2">
                  "{project.retourClient}"
                </p>
                <p className="italic" style={{ color: MY_COLORS.secondaryGreen }}>
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
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Récupération des projets et catégories depuis i18next
  const categories = t('projects.categories', { returnObjects: true });
  const projectsData = t('projects.projectsData', { returnObjects: true });

  // Filtrage des projets selon la catégorie active
  const filteredProjects = activeCategory === 'all' 
    ? projectsData
    : projectsData.filter(p => {
        const categoryLabel = categories.find(cat => cat.id === activeCategory)?.label;
        return p.category === categoryLabel;
      });

  return (
    <div className="w-full py-16 px-4" style={{backgroundColor: MY_COLORS.white}}>
      <div className="max-w-7xl mx-auto">
        {/* Tabs de catégories */}
        <div className="flex lg:flex-wrap w-auto justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-6 py-3 text-sm font-semibold transition-all duration-300 relative"
              style={{
                color: activeCategory === category.id 
                  ? MY_COLORS.secondaryGreen 
                  : MY_COLORS.gray
              }}
            >
              {category.label}
              {activeCategory === category.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 flex justify-center">
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