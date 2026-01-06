import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import cercle_interomp from '../../assets/cercle_interomp.svg'



const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant pour le cercle animé avec des segments discontinus
const AnimatedCircleBorder = ({ children, isHovered }) => {
  return (
    <div className="relative lg:w-48 lg:h-48 md:w-30 md:h-30 flex items-center justify-center">
      {/* SVG pour le cercle discontinu animé */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ 
          transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)',
          transition: 'transform 3s linear infinite'
        }}
      >
        <circle
          cx="96"
          cy="96"
          r="90"
          fill="none"
          stroke={MY_COLORS.secondaryGreen}
          strokeWidth="3"
          strokeDasharray="15 10"
          strokeLinecap="round"
          style={{
            animation: isHovered ? 'rotateCircle 3s linear infinite' : 'none'
          }}
        />
        <circle
          cx="96"
          cy="96"
          r="85"
          fill="none"
          stroke={MY_COLORS.primaryBlue}
          strokeWidth="2"
          strokeDasharray="10 15"
          strokeLinecap="round"
          style={{
            animation: isHovered ? 'rotateCircleReverse 4s linear infinite' : 'none'
          }}
        />
      </svg>
      
      {/* Image au centre */}
      <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes rotateCircle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateCircleReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

// Composant pour chaque carte de solution
const SolutionCard = ({ image, title, description, buttonText, onSeeMore }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
    <div 
      className="flex flex-col  items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image avec bordure animée importer cercle interompu.svg ici sachant quelle tourne en rotation autour de limage */}
      <div className="mb-6">
        <AnimatedCircleBorder isHovered={isHovered}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </AnimatedCircleBorder>
      </div>
      
      {/* Titre */}
      <h3 
        className="text-xl font-bold text-center mb-4 px-4"
        style={{ color: MY_COLORS.black }}
      >
        {title}
      </h3>
      
      {/* Description */}
      <p 
        className="text-sm text-center text-gray-600 mb-6 px-4 leading-relaxed flex-grow"
      >
        {description}
      </p>
      
  
    </div>

        {/* Bouton Voir Plus a lexterieur des card  */}
      <button
        onClick={onSeeMore}
        className="group   items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
        style={{ 
          backgroundColor: isHovered ? MY_COLORS.green : 'transparent',
          color: isHovered ? MY_COLORS.white : MY_COLORS.green,
          border: `2px solid ${MY_COLORS.green}`
        }}
      >
        {buttonText}
        <ChevronRight 
          size={20} 
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
      </>
  );
};

export default SolutionCard