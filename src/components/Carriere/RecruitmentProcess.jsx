// RecruitmentProcess.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';

const RecruitmentProcess = ({ steps }) => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full py-16 px-4">
      {/* Titre de la section */}
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-16"
        style={{ color: MY_COLORS.primaryBlue }}
      >
        {t('recruitment.processTitle')}
      </h2>
      
      {/* Timeline des étapes */}
      <div className="max-w-6xl mx-auto">
        {/* Ligne de connexion pour desktop */}
        <div className="hidden md:flex items-center justify-between mb-8 relative">
          {/* Ligne horizontale */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
            style={{ 
              background: `repeating-linear-gradient(to right, ${MY_COLORS.primaryBlue} 0, ${MY_COLORS.primaryBlue} 10px, transparent 10px, transparent 20px)`
            }}
          ></div>
          
          {/* Cercles numérotés */}
          {steps.map((_, index) => (
            <div
              key={index}
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: MY_COLORS.primaryBlue }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Contenu des étapes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Cercle pour mobile */}
              <div
                className="md:hidden w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
                style={{ backgroundColor: MY_COLORS.primaryBlue }}
              >
                {index + 1}
              </div>
              
              {/* Titre de l'étape */}
              <h3 className="font-bold text-lg mb-3" style={{ color: MY_COLORS.black }}>
                {t(step.title)}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {t(step.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentProcess;