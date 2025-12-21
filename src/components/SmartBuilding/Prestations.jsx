import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'
import pres1 from '../../assets/pres1.svg'
import pres2 from '../../assets/pres2.svg'
import pres3 from '../../assets/pres3.svg'
import pres4 from '../../assets/pres4.svg'
import pres5 from '../../assets/pres5.svg'
import pres6 from '../../assets/pres6.svg'
import pres7 from '../../assets/pres7.svg'
import rail from '../../assets/rail.svg'

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-transparent backdrop-blur-lg border-2 shadow-lg border-gray-300 rounded-lg p-6 flex flex-col items-center text-center h-full">
    <div className="mb-4">
      <img src={icon} alt={title} className="w-16 h-16" />
    </div>
    <h3 className="font-bold text-base mb-3" style={{ color: MY_COLORS.black }}>
      {title}
    </h3>
    <p className="text-sm text-gray-700 leading-relaxed">
      {description}
    </p>
  </div>
);

const Prestations = () => {
  const { t } = useTranslation();

  const services = [
    { id: 'conception', icon: pres4 },
    { id: 'automatisation', icon: pres5 },
    { id: 'securite', icon: pres3 },
    { id: 'supervision', icon: pres1 },
    { id: 'formation', icon: pres7 },
    { id: 'evolution', icon: pres2 }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 relative ">
   

      {/* Decorative gears - top right */}
      <div className="hidden lg:block absolute -right-40 top-12  ">
                <motion.img 
                   src={rail} 
                   alt="engrenage" 
                   className="w-45 h-45"
                   animate={{ rotate: 360 }}
                   transition={{ 
                     duration: 6, 
                     ease: "linear", 
                     repeat: Infinity 
                   }}
                /> 
      </div>

      {/* First Row - Title/Description/Button aligned with Audit Card */}
      <div className="relative mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Title, Description, Button */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4" style={{ color: MY_COLORS.secondaryGreen }}>
              {t('prestations.title')}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {t('prestations.description')}
            </p>
            <div className="flex items-center">
              <button 
                className="px-8 py-3 rounded-full font-semibold text-white text-sm uppercase tracking-wide hover:opacity-90 transition-opacity"
                style={{ backgroundColor: MY_COLORS.black }}
              >
                {t('prestations.buttonText')}
              </button>
             
            </div>
          </div>

          {/* Right: Audit Card */}
          <div className="lg:col-span-1">
            <ServiceCard
              icon={pres6}
              title={t('prestations.services.audit.title')}
              description={t('prestations.services.audit.description')}
            />
          </div>
        </div>

        {/* Vertical dotted line separating left section from audit card */}
        <div className="hidden lg:block absolute top-0 bottom-0 pointer-events-none" style={{ left: '66.666%', color: MY_COLORS.green }}>
          <svg className="h-full" width="2">
            <line x1="1" y1="0" x2="1" y2="100%" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeDasharray="8,8"/>
          </svg>
        </div>
      </div>

      {/* Horizontal Dotted Line Separator */}
      <div className="relative mb-12">
        <svg className="w-full" height="2">
          <line x1="0" y1="1" x2="100%" y2="1" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeDasharray="8,8"/>
        </svg>
      </div>

      {/* Main Grid - 6 remaining cards (3 columns x 2 rows) */}
      <div className="relative">
        {/* Vertical dotted lines between columns */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" >
            {/* Vertical line 1 */}
            <line x1="33.333%" y1="0" x2="33.333%" y2="100%" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeDasharray="8,8"/>
            {/* Vertical line 2 */}
            <line x1="66.666%" y1="0" x2="66.666%" y2="100%"stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeDasharray="8,8"/>
            {/* Horizontal line between rows */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke={MY_COLORS.secondaryGreen} strokeWidth="2" strokeDasharray="8,8"/>
          </svg>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={t(`prestations.services.${service.id}.title`)}
              description={t(`prestations.services.${service.id}.description`)}
            />
          ))}
        </div>
      </div>

      {/* Decorative gears - bottom right */}
     <div className="hidden lg:block absolute -left-40 bottom-60 ">
         <motion.img 
                   src={rail} 
                   alt="engrenage" 
                   className="w-45 h-45"
                   animate={{ rotate: 360 }}
                   transition={{ 
                     duration: 6, 
                     ease: "linear", 
                     repeat: Infinity 
                   }}
                 /> 
      </div>
        <div className="hidden lg:block absolute -right-16 bottom-12 ">
         <motion.img 
                   src={rail} 
                   alt="engrenage" 
                   className="w-45 h-45"
                   animate={{ rotate: 360 }}
                   transition={{ 
                     duration: 6, 
                     ease: "linear", 
                     repeat: Infinity 
                   }}
                 /> 
      </div>
    </div>
  );
};

export default Prestations;