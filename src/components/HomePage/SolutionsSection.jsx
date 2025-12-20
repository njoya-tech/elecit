import React, { useState } from 'react';
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import cercle_interomp from '../../assets/cercle_interomp.svg'

import { motion } from 'framer-motion'

import { useTranslation } from 'react-i18next';

// --- Définition des Couleurs ---
const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Mapping des images pour les associer aux items
const imageMap = {
  0: c1,
  1: c2,
  2: c3
};

// --- Composant pour l'icône de la flèche ---
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

// --- Composant pour le cercle discontinu animé ---
const AnimatedCircleBorder = ({ children, isHovered }) => {
    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.img 
                className="absolute inset-0 w-full h-full"
                src={cercle_interomp}
                alt="Cercle Interrompu Décoratif"
                animate={{ rotate: 360 }}
                transition={{ 
                    duration: 6, 
                    ease: "linear", 
                    repeat: Infinity 
                }}
            />
            
            <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl" style={{ borderColor: 'transparent' }}>
                {children}
            </div>
        </div>
    );
};

// --- Composant pour chaque carte de solution ---
const SolutionCard = ({ solution, onSeeMore, imageSrc }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className="flex flex-col lg:flex md:flex items-center max-w-sm mx-auto z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Contenu de la Carte */}
            <div 
                className="flex flex-col items-center w-full bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:shadow-2xl"
                style={{ 
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    paddingBottom: '2rem'
                }}
            >
                {/* Image avec cercle */}
                <div className="relative -mt-20 mb-4"> 
                    <AnimatedCircleBorder isHovered={isHovered}>
                        <img 
                            src={imageSrc} 
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
                        className="text-sm text-gray-600 px-4 leading-relaxed flex-grow"
                    >
                        {solution.description}
                    </p>
                </div>
            </div>
            
            {/* Bouton Voir Plus */}
            <button
                onClick={onSeeMore}
                className="group flex items-center gap-2 px-6 py-3 mt-6 rounded-full font-semibold transition-all duration-300 hover:gap-3 shadow-md"
                style={{ 
                    backgroundColor: isHovered ? MY_COLORS.green : MY_COLORS.white,
                    color: isHovered ? MY_COLORS.white : MY_COLORS.green,
                    border: `2px solid ${MY_COLORS.green}`,
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
            >
                {t('solution.viewMore')}
            </button>
        </div>
    );
};

// --- Composant Principal de la Section ---
const SolutionsSection = () => {
    const { t } = useTranslation();
    
    // Récupération des données de traduction avec le préfixe 'solution.'
    const bannerTitle = t('solution.bannerTitle');
    const bannerHighlight = t('solution.bannerHighlight');
    const bannerTitle2 = t('solution.bannerTitle2');
    const solutions = t('solution.items', { returnObjects: true }); 

    const handleSeeMore = (solutionTitle) => {
        console.log(`Navigation vers la solution: ${solutionTitle}`);
    };

    return (
        <section 
            className="relative pb-24 pt-0" 
            style={{ backgroundColor: MY_COLORS.white }} 
        >
            {/* Bannière avec fond noir */}
            <div 
                className="absolute top-0 left-0 w-full h-60"
                style={{ backgroundColor: MY_COLORS.black }} 
            >
                <div className="max-w-7xl mx-auto py-30 px-4 text-center h-full flex items-end justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold px-4 md:w-140 tracking-tight">
                        <span style={{ color: MY_COLORS.white }}>{bannerTitle} </span>
                        <span style={{ color: MY_COLORS.secondaryGreen }}>{bannerHighlight}</span>
                        <span style={{ color: MY_COLORS.white }}> {bannerTitle2}</span>
                    </h2>
                </div>
            </div>
            
            {/* Grille de solutions */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-65"> 
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-y-16 md:gap-y-0 md:gap-x-8 justify-items-center">
                    {solutions && solutions.map((solution, index) => (
                        <SolutionCard
                            key={index}
                            solution={solution}
                            imageSrc={imageMap[index]}
                            onSeeMore={() => handleSeeMore(solution.title)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;