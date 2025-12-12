import React from "react";
import { HERO, ICONS, IMAGES } from "../../asset/assets.js";

const CardProject = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12"
      style={{
        backgroundImage:`url(${HERO.dataProcessing})`
      }}
      
      
      
      >


        
        {/* CONTAINER 2: Header and text container */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          {/* Header content will go here */}
        </div>

        {/* CONTAINER 3: 3 cards container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 will go here */}

          {/* Card 2 will go here */}

          {/* Card 3 will go here */}
        </div>
      </div>
    </section>
  );
};

export default CardProject;
