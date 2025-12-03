import React from 'react'

const HeroTest = () => {
  return (
    <div className="relative h-[500px]"> {/* parent container height */}
      <div className="absolute -top-60 left-55 bg-lime-500 text-white rounded-lg 
      shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-110 w-90">
        {/* Your content here */}
      </div>
    </div>
  );
};

export default HeroTest
