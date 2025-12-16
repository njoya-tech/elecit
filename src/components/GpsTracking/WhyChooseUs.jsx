import React from 'react';
import gp1 from '../../assets/gp1.svg'
import casq from '../../assets/casq.svg'
import gp2 from '../../assets/gp2.svg'
import gp3  from '../../assets/gp3.svg'
import gp5 from '../../assets/gp5.svg'
import gp6 from '../../assets/gp6.svg'
import g1 from '../../assets/g1.svg'
import { motion } from 'framer-motion'





const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const FeatureCard = ({ icon , text }) => (
  <div className="relative bg-white mt-10 rounded-lg border-2 border-gray-200 p-6 flex flex-col items-center text-center min-h-[180px] hover:shadow-lg shadow-lg transition-shadow">
    <div className=" -mt-20 absolute">
     <img src={icon} alt="" className='w-30 h-30 object-contain' />
    </div>
    <div className='mt-20'>
            <p className="text-gray-700 text-sm leading-relaxed">
      {text}
    </p>
    </div>
   
  </div>
);

const WhyChooseUs = ({ translations }) => {
  const {
    title,
    subtitle,
    feature1,
    feature2,
    feature3,
    feature4,
    feature5,
    feature6
  } = translations;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#E5E5E5' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            {title}
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Decorative gear icon */}
        <div className="flex justify-end -mt-20 mr-8">
         <motion.img 
                src={casq || "https://placehold.co/100x100/7DA837/FFFFFF?text=Gear"}
                alt="engrenage" 
                className="w-45 h-45 scale-x-[-1]" 
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  y: {
                    duration: 2, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                  }
                }}
              />
        </div>

        {/* Features Grid with Dashed Lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-15">
          {/* Horizontal dashed line between rows (desktop only) */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-gray-400 -translate-y-1/2" style={{ zIndex: 0, borderColor: MY_COLORS.green }}></div>
          
          {/* Vertical dashed lines between columns (desktop only) */}
          <div className="hidden md:block absolute left-1/3 top-0 bottom-0 border-l-2 border-dashed border-gray-400" style={{ zIndex: 0, borderColor: MY_COLORS.green }}></div>
          <div className="hidden md:block absolute left-2/3 top-0 bottom-0 border-l-2 border-dashed border-gray-400" style={{ zIndex: 0 , borderColor: MY_COLORS.green}}></div>

          {/* Feature 1 */}
          <div className="relative" style={{ zIndex: 1 }}>
            <FeatureCard
              icon={gp1}
              text={feature1}
            />
          </div>

          {/* Feature 2 */}
          <div className="relative" style={{ zIndex: 1 }}>
            <FeatureCard
              icon={gp3}
              text={feature2}
            />
          </div>

          {/* Feature 3 */}
          <div className="relative" style={{ zIndex: 1 }}>
            <FeatureCard
              icon={ gp2}
              text={feature3}
            />
          </div>

          {/* Feature 4 */}
          <div className="relative " style={{ zIndex: 1 }}>
            <FeatureCard
              icon={g1}
              text={feature4}
            />
          </div>

          {/* Feature 5 */}
          <div className="relative" style={{ zIndex: 1 }}>
            <FeatureCard
              icon={gp5}
              text={feature5}
            />
          </div>

          {/* Feature 6 */}
          <div className="relative" style={{ zIndex: 1 }}>
            <FeatureCard
              icon={gp6}
              text={feature6}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs