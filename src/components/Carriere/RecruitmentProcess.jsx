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
        className="text-xl md:text-4xl font-bold text-center mb-12"
        style={{ color: MY_COLORS.primaryBlue }}
      >
        {t('recruitment.processTitle')}
      </h2>
      
      {/* Timeline des étapes */}
      <div className="max-w-6xl mx-auto">
        {/* Contenu des étapes pour desktop */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 relative">
          {/* Ligne horizontale en pointillés qui relie les cercles */}
          <div 
            className="absolute top-8 left-0 right-0 h-0.5 z-0"
            style={{ 
              background: `repeating-linear-gradient(to right, ${MY_COLORS.primaryBlue} 0, ${MY_COLORS.primaryBlue} 10px, transparent 10px, transparent 20px)`,
              left: '10%',
              right: '10%'
            }}
          ></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative z-10">
              {/* Cercle numéroté centré */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6"
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
        
        {/* Version mobile */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Cercle pour mobile */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
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