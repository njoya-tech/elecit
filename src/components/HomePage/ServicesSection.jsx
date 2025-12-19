import React, { useState } from 'react';
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import s3 from '../../assets/s3.jpg'
import cercle_interomp from '../../assets/cercle_interomp.svg'

import { motion } from 'framer-motion'

// --- Définition des Couleurs et Données (pour rendre le fichier autonome) ---
const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Données de traduction intégrées (simulant l'accès à common.json)
const t = (key) => {
    // Les données sont ici en français car c'est la langue demandée pour le contenu
    const data = {
 "serviceOffer": {
            "title": "Une offre de",
            "titleHighlight": "service",
            "title2": "diversifiée",
            "title3": ", adaptée à vos besoins",
            "viewMore": "Voir plus",
            "services": [
                {
                    "title": "Services informatiques & DATA Processing",
                    "description": "Des solutions sur mesure pour l'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.",
                    "imageName": s3
    },
    {
      "title": "Bureau d'étude: conception & ingénierie",
      "description": "Conception, optimisation et réalisation de vos projets techniques. Analyse des besoins et mise en œuvre des solutions sur mesure.       ",
      "imageName": s3
    },
    {
      "title": "Service après vente disponible 24/7",
      "description": "Des prestations techniques pour garantir la fiabilité, la durabilité et la performance optimale des équipements après leur mise en service.",
      "imageName": s3
    }
  ]
}
    };
 // ✅ Accès correct aux données
    if (key === 'serviceOffer.title') return data.serviceOffer.title;
    if (key === 'serviceOffer.titleHighlight') return data.serviceOffer.titleHighlight;
    if (key === 'serviceOffer.title2') return data.serviceOffer.title2;
    if (key === 'serviceOffer.title3') return data.serviceOffer.title3;
    if (key === 'serviceOffer.viewMore') return data.serviceOffer.viewMore;
    if (key === 'serviceOffer.services') return data.serviceOffer.services;
    return null;
};


// --- Composant pour l'icône de la flèche (Remplacement de ChevronRight) ---
const ChevronRight = ({ size = 20, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6"/>
    </svg>
);


// --- Composant pour le cercle discontinu animé (AnimatedCircleBorder) ---
const AnimatedCircleBorder = ({ children, isHovered }) => {
    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* SVG importé (Base64) et animé avec Framer Motion */}
            <motion.img 
                className="absolute inset-0 w-full h-full"
                src={cercle_interomp}
                alt="Cercle Interrompu Décoratif"
                // Animation de rotation infinie permanente
                animate={{ rotate: 360 }}
                transition={{ 
                    duration: 6, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
            />
            
            {/* Image au centre */}
            <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl" style={{ borderColor: 'transparent' }}>
                {children}
            </div>
        </div>
    );
};
// --- Composant pour chaque carte de solution (SolutionCard) ---
const SolutionCard = ({ solution, onSeeMore }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Remplacement direct de la structure pour le placement du bouton
    return (
        <div 
            className="flex flex-col items-center max-w-sm mx-auto z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. Contenu de la Carte (La partie blanche superposée) */}
            <div 
                className="flex flex-col items-center w-full bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:shadow-2xl"
                style={{ 
                    // Pour que la carte flotte un peu au survol
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    paddingBottom: '2rem' // Espace interne
                }}
            >
                {/* Emplacement de l'Image qui par son dessus coupe aussi limage et le cercle inerropu  (décalé vers le haut, créant la superposition) */}
                <div className="relative -mt-20 mb-4"> 
                    <AnimatedCircleBorder >
                        <img 
                            src={solution.imageName} 
                            alt={solution.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/160x160/CCCCCC/000000?text=Image+404";
                            }}
                        />
                    </AnimatedCircleBorder>
                </div>

                {/* Texte de la carte */}
                <div className="flex flex-col items-center p-6 pt-0 text-center flex-grow">
                    <h3 
                        className="text-xl font-bold mb-4 px-4"
                        style={{ color: MY_COLORS.black }}
                    >
                        {solution.title}
                    </h3>
                    <p 
                        className="text-sm text-gray-600 px-4 leading-relaxed flex-grow "
                    >
                        {solution.description}
                    </p>
                </div>
            </div>
            
            {/* 2. Bouton Voir Plus (Extérieur à la carte, au bas) */}
            <button
                onClick={onSeeMore}
                className="group flex items-center gap-2 px-6 py-3 mt-6 rounded-full font-semibold transition-all duration-300 hover:gap-3 shadow-md"
                style={{ 
                    // Inversement des couleurs au survol
                    backgroundColor: isHovered ? MY_COLORS.green : MY_COLORS.white,
                    color: isHovered ? MY_COLORS.white : MY_COLORS.green,
                    border: `2px solid ${MY_COLORS.green}`,
                    // Légère élévation au survol (coordonnée avec l'effet de la carte)
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
            >
               {t('serviceOffer.viewMore')}

                {/* <ChevronRight 
                    size={20} 
                    className="transition-transform duration-300 group-hover:translate-x-1"
                /> */}
            </button>
        </div>
    );
};


// --- Composant Principal de la Section (SolutionsSection) ---
const ServicesSection = () => {
    // Récupération des données de traduction
  const bannerTitle = t('serviceOffer.title');
    const bannerHighlight = t('serviceOffer.titleHighlight');
    const bannerTitle2 = t('serviceOffer.title2');
    const bannerTitle3 = t('serviceOffer.title3');
    const viewMoreText = t('serviceOffer.viewMore');
    const solutions = t('serviceOffer.services');

        const handleSeeMore = (solutionTitle) => {
        console.log(`Navigation vers la solution: ${solutionTitle}`);
    };


    return (
        <section 
            className="relative pb-24 pt-0" 
            style={{ backgroundColor: MY_COLORS.white }} 
        >
            {/* 1.  */}
            {/* La hauteur est ajustée pour que le bas de la bannière coupe le cercle des image et cercle intertrompu de 192px (96px) */}
            <div 
                className="absolute top-0 left-0 w-full h-60" // Hauteur de 12rem (192px)
                style={{ backgroundColor: MY_COLORS.black }} 
            >
                <div className="max-w-7xl mx-auto py-30 px-4 text-center h-full flex items-end justify-center lg:mt-5 md:mt-5 sm:mt-5 mt-5">
                    <h2 className="text-3xl md:text-4xl font-bold px-4 md:w-140 tracking-tight">
                               <span style={{ color: MY_COLORS.white }}>{bannerTitle} </span>
                    <span style={{ color: MY_COLORS.secondaryGreen }}>{bannerHighlight} </span>
                    <span style={{ color: MY_COLORS.white }}>{bannerTitle2}</span>
                    <span style={{ color: MY_COLORS.white }}>{bannerTitle3}</span>
               </h2>
                </div>
            </div>
            
            {/* 2. Grille de solutions (Premier plan, superposée) */}
            {/* Le padding-top est ajusté pour placer le centre de la carte au niveau de la coupure de la bannière */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-65"> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-0 md:gap-x-8 justify-items-center">
                    {solutions.map((solution, index) => (
                        <SolutionCard
                            key={index}
                            solution={solution}
                            onSeeMore={() => handleSeeMore(solution.title)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default ServicesSection