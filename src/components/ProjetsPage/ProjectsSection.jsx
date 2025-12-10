import React, { useState } from 'react';
import {motion } from 'framer-motion'
import rail from '../../assets/rail.svg'

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

// Données simulées pour les projets
const projectsData = [
  {
    id: 1,
    number: '1',
    title: 'Banque Mobile',
    category: 'Fabrication mécanique',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '12/06/23',
    statut: 'terminé',
    description: "Conception et fabrication d'une flotte sur mesure de véhicules destinés au transport sécurisé et confortable du personnel d'une entreprise.",
    utilite: "Ce projet répond au besoin critique de mobilité interne fluide, réduction du temps de déplacement des équipes sur site, tout en assurant leur sécurité et leur confort.",
    retourClient: "Grâce à ces nouveaux moyens de transport, nous avons réduit de 30 % les retards liés aux déplacements internes, tout en améliorant le confort de nos collaborateurs.",
    responsable: "Responsable Logistique"
  },
  {
    id: 2,
    number: '2',
    title: 'Services informatiques & DATA Processing',
    category: 'Smart building',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '15/08/23',
    statut: 'terminé',
    description: "Mise en place d'une infrastructure informatique complète pour la gestion et l'analyse de données en temps réel.",
    utilite: "Amélioration de la productivité et de la prise de décision grâce à des outils d'analyse avancés.",
    retourClient: "L'implémentation de cette solution a transformé notre façon de travailler et augmenté notre efficacité de 40%.",
    responsable: "Directeur IT"
  },
  {
    id: 3,
    number: '3',
    title: 'Système de sécurité intelligent',
    category: 'Smart building',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '20/09/23',
    statut: 'en cours',
    description: "Installation d'un système de surveillance et de contrôle d'accès intelligent pour un bâtiment administratif.",
    utilite: "Assurer la sécurité des occupants et des biens tout en optimisant la gestion des accès.",
    retourClient: "La tranquillité d'esprit apportée par ce système est inestimable pour notre organisation.",
    responsable: "Chef de la sécurité"
  },
  {
    id: 4,
    number: '4',
    title: 'Plateforme IoT industrielle',
    category: 'Fabrication mécanique',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '05/10/23',
    statut: 'terminé',
    description: "Développement d'une plateforme IoT pour monitorer et optimiser les processus de production.",
    utilite: "Réduction des temps d'arrêt et amélioration de l'efficacité opérationnelle.",
    retourClient: "Cette solution nous a permis de réduire nos coûts de maintenance de 25%.",
    responsable: "Directeur de production"
  },
  {
    id: 5,
    number: '5',
    title: 'Infrastructure réseau entreprise',
    category: 'Projet interne',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '12/11/23',
    statut: 'en cours',
    description: "Refonte complète de l'infrastructure réseau pour supporter la croissance de l'entreprise.",
    utilite: "Garantir une connectivité fiable et performante pour tous les services.",
    retourClient: "Le nouveau réseau a considérablement amélioré notre productivité quotidienne.",
    responsable: "Responsable Infrastructure"
  },
  {
    id: 6,
    number: '6',
    title: 'Automatisation processus',
    category: 'Smart building',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    shortDescription: "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
    dateRealisation: '18/12/23',
    statut: 'terminé',
    description: "Automatisation des processus métier pour améliorer l'efficacité opérationnelle.",
    utilite: "Libérer du temps pour les équipes et réduire les erreurs humaines.",
    retourClient: "L'automatisation a transformé notre façon de travailler au quotidien.",
    responsable: "Directeur des opérations"
  }
];

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'smart', label: 'Smart building' },
  { id: 'fabrication', label: 'Fabrication mécanique' },
  { id: 'interne', label: 'Projet interne' }
];

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="relative bg-white rounded-lg overflow-visible cursor-pointer transition-all duration-300 hover:shadow-2xl"
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
      <div className="h-48 overflow-hidden mt-8">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center" style={{ color: MY_COLORS.darkBlue }}>
          {project.title}
        </h3>
        <p className="text-sm text-gray-700 text-center mb-6 leading-relaxed">
          {project.shortDescription}
        </p>
        
        {/* Bouton Voir plus */}
        <div className="flex justify-center">
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
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Images du carrousel (simulation)
  const carouselImages = [
    project.image,
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop'
  ];

  return (
    <div 
      className="fixed inset-0 bg-tranparent backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50 p-4"
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
                  Fabrication mécanique
                </h2>
                <div className=''>
        <div className="absolute top-24 left-100 ">
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
        <div className="absolute top-120 left-5 ">
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
              <div className='flex-1 lg:pl-29 mdpl-29 '>
                          <h3 className="text-2xl font-bold mb-2">Projet: {project.title}</h3>
              <div className="space-y-1">
                <p className="text-lg">
                  <span className="font-semibold">Date de réalisation:</span> {project.dateRealisation}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Statut du projet:</span>{' '}
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
                  Description du projet:
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3" style={{ color: MY_COLORS.darkBlue }}>
                  Utilité:
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {project.utilite}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-3" style={{ color: MY_COLORS.darkBlue }}>
                  Retour client:
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
              Vous avez un projet?
            </button>
            
            <button
              onClick={onClose}
              className="px-8 py-3 font-semibold transition-all duration-300"
              style={{ color: MY_COLORS.darkBlue }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => {
        if (activeCategory === 'smart') return p.category === 'Smart building';
        if (activeCategory === 'fabrication') return p.category === 'Fabrication mécanique';
        if (activeCategory === 'interne') return p.category === 'Projet interne';
        return true;
      });

  return (
    <div className="w-full py-16 px-4" style={{backgroundColor: MY_COLORS.white}}>
      <div className="max-w-7xl mx-auto">
        {/* Tabs de catégories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-6 py-3 font-semibold transition-all duration-300 relative"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
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