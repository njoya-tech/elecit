import React from 'react'
import { MY_COLORS } from '../../utils/colors';
import SolutionCard from './SolutionCard'



const SolutionsSection = ({ 
  bannerTitle, 
  bannerHighlight, 
  bannerTitle2, 
  solutions 
}) => {
  const handleSeeMore = (solutionTitle) => {
    console.log(`Navigation vers: ${solutionTitle}`);
  };

  return (
    <section 
      className="py-16 px-4"
     
    >
      <div className="w-screnn mx-auto">
        {/* Bannière titre */}
        <div 
          className="text-center mb-16 py-12 w-full flex items-center justify-center"
          style={{ backgroundColor: MY_COLORS.black }}
        >
          <h2 className="text-3 xl md:text-4xl font-bold px-4 md:w-140">
            <span style={{ color: MY_COLORS.white }}>{bannerTitle} </span>
            <span style={{ color: MY_COLORS.secondaryGreen }}>{bannerHighlight}</span>
            <span style={{ color: MY_COLORS.white }}> {bannerTitle2}</span>
          </h2>
        </div>
        
        {/* Grille de solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              image={solution.image}
              title={solution.title}
              description={solution.description}
              buttonText={solution.buttonText}
              onSeeMore={() => handleSeeMore(solution.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection