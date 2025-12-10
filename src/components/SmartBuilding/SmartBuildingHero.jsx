
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Simuler useTranslation
const useTranslation = () => {
  const translations = {
    smartBuilding: {
      title: "SMART BUILDING",
      subtitle: "Des solutions sur mesure pour les habitations, les bureaux, les hôtels et les espaces commerciaux. Confort, sécurité, performance énergétique et connectivité réunis dans une architecture intelligente.",
      buttonText: "Visitez le showroom",
      tabs: {
        smartHome: "Smart home",
        smartHotel: "Smart hotel",
        smartOffice: "Smart office",
        smartCommercial: "Smart commercial",
        smartEvents: "Smart events"
      }
    },
    smartHome: {
      title: "La maison qui s'adapte à vous",
      featureTitle: "Gestion automatisée",
      featureDescription: "Contrôlez automatiquement l'ensemble de vos équipements connectés. Grâce à un système domotique intégré, gérez les fonctions de votre habitat sur place ou à distance via application mobile.",
      buttonText: "Un projet en tête?",
      slides: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
        'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800'
      ]
    },
    smartHotel: {
      title: "L'hôtel connecté du futur",
      featureTitle: "Expérience client optimisée",
      featureDescription: "Offrez à vos clients une expérience unique avec des chambres intelligentes. Contrôle de l'éclairage, de la température, et des services hôteliers via une interface intuitive.",
      buttonText: "Un projet en tête?",
      slides: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
      ]
    },
    smartOffice: {
      title: "Le bureau intelligent",
      featureTitle: "Productivité maximale",
      featureDescription: "Créez un environnement de travail optimal avec des espaces qui s'adaptent aux besoins de vos équipes. Gestion intelligente de l'énergie, de la sécurité et du confort.",
      buttonText: "Un projet en tête?",
      slides: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
      ]
    },
    smartCommercial: {
      title: "L'espace commercial innovant",
      featureTitle: "Gestion centralisée",
      featureDescription: "Optimisez la gestion de vos espaces commerciaux avec des solutions intelligentes. Contrôle de l'éclairage, de la climatisation et de la sécurité pour une efficacité maximale.",
      buttonText: "Un projet en tête?",
      slides: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
        'https://images.unsplash.com/photo-1491336238524-c990bd671778?w=800'
      ]
    },
    smartEvents: {
      title: "L'événementiel connecté",
      featureTitle: "Événements mémorables",
      featureDescription: "Transformez vos événements avec des technologies intelligentes. Éclairage dynamique, sonorisation adaptative et contrôle centralisé pour des expériences inoubliables.",
      buttonText: "Un projet en tête?",
      slides: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      ]
    }
  };

  return {
    t: (key) => {
      const keys = key.split('.');
      let value = translations;
      for (const k of keys) {
        value = value[k];
        if (!value) return key;
      }
      return value;
    }
  };
};

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant Hero avec tabs superposés
const SmartBuildingHero = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'smartHome', label: t('smartBuilding.tabs.smartHome') },
    { id: 'smartHotel', label: t('smartBuilding.tabs.smartHotel') },
    { id: 'smartOffice', label: t('smartBuilding.tabs.smartOffice') },
    { id: 'smartCommercial', label: t('smartBuilding.tabs.smartCommercial') },
    { id: 'smartEvents', label: t('smartBuilding.tabs.smartEvents') }
  ];

  return (
    <div className="relative w-full mb-20">
      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center md:w-[800px] lg:w-[1800px] translate-x-15 h-[500px] md:h-[600px] lg:h-[650px]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 18, 28, 0.7), rgba(0, 18, 28, 0.7)), url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            {t('smartBuilding.title')}
          </h1>
          <p className="text-white text-lg max-w-3xl mb-8 leading-relaxed">
            {t('smartBuilding.subtitle')}
          </p>
          <button 
            className="px-8 py-3 rounded-full border-2 text-white font-medium hover:bg-white hover:text-black transition-all"
            style={{ borderColor: MY_COLORS.secondaryGreen, color: MY_COLORS.secondaryGreen }}
          >
            {t('smartBuilding.buttonText')}
          </button>
        </div>
      </div>

      {/* Tabs Navigation - Superposé sur le hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
        <div className="bg-white flex justify-center rounded-tl-full rounded-tr-full rounded-r-full overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium transition-all relative ${
                activeTab === tab.id ? 'font-bold' : ''
              } ${index === 0 ? 'rounded-l-full' : ''} ${index === tabs.length - 1 ? 'rounded-r-full' : ''}`}
              // style={{
              //   color: activeTab === tab.id ? MY_COLORS.secondaryGreen : MY_COLORS.black,
              //   backgroundColor: activeTab === tab.id ? 'rgba(125, 168, 55, 0.1)' : 'transparent'
              // }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SmartBuildingHero

// // Composant Feature avec carousel
// const SmartFeatureCarousel = () => {
//   const { t } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
//       alt: 'Smart home control'
//     },
//     {
//       image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
//       alt: 'Home automation'
//     },
//     {
//       image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800',
//       alt: 'Smart device'
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-16">
//       <div className="flex items-center gap-12">
//         {/* Carousel Section */}
//         <div className="flex-1 relative">
//           {/* Decorative Gear */}
//           <div 
//             className="absolute -left-16 -top-8 w-24 h-24 rounded-full border-4 opacity-30"
//             style={{ borderColor: MY_COLORS.secondaryGreen }}
//           >
//             <div className="absolute inset-4 rounded-full border-4" style={{ borderColor: MY_COLORS.secondaryGreen }}></div>
//           </div>

//           {/* Image Container with rounded border */}
//           <div 
//             className="relative rounded-3xl overflow-hidden border-8"
//             style={{ borderColor: MY_COLORS.secondaryGreen }}
//           >
//             <div className="relative h-96 overflow-hidden">
//               {slides.map((slide, index) => (
//                 <img
//                   key={index}
//                   src={slide.image}
//                   alt={slide.alt}
//                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
//                     index === currentSlide ? 'opacity-100' : 'opacity-0'
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
//             >
//               <ChevronLeft size={24} style={{ color: MY_COLORS.black }} />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
//             >
//               <ChevronRight size={24} style={{ color: MY_COLORS.black }} />
//             </button>

//             {/* Dots Indicator */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all ${
//                     index === currentSlide ? 'w-8' : ''
//                   }`}
//                   style={{
//                     backgroundColor: index === currentSlide ? MY_COLORS.white : 'rgba(255,255,255,0.5)'
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="flex-1 relative">
//           <h2 className="text-4xl font-bold mb-8" style={{ color: MY_COLORS.black }}>
//             {t('smartHome.title')}
//           </h2>

//           <h3 className="text-xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
//             {t('smartHome.featureTitle')}
//           </h3>

//           <p className="text-gray-700 leading-relaxed mb-8">
//             {t('smartHome.featureDescription')}
//           </p>

//           <button 
//             className="px-8 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
//             style={{ backgroundColor: MY_COLORS.black }}
//           >
//             {t('smartHome.buttonText')}
//           </button>

//           {/* Decorative Gears */}
//           <div 
//             className="absolute -right-12 top-12 w-32 h-32 rounded-full border-4 opacity-20"
//             style={{ borderColor: MY_COLORS.secondaryGreen }}
//           >
//             <div className="absolute inset-6 rounded-full border-4" style={{ borderColor: MY_COLORS.secondaryGreen }}></div>
//           </div>
//           <div 
//             className="absolute -right-6 bottom-8 w-20 h-20 rounded-full border-4 opacity-20"
//             style={{ borderColor: MY_COLORS.secondaryGreen }}
//           >
//             <div className="absolute inset-4 rounded-full border-4" style={{ borderColor: MY_COLORS.secondaryGreen }}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
