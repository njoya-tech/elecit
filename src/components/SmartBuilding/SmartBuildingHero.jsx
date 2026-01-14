import React from 'react';
import { useTranslation } from 'react-i18next';
import fi from '../../assets/fi.svg'
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

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
        className="relative w-full bg-cover bg-center sm:w-full md:w-[800px] lg:w-[1800px] translate-x-0 sm:translate-x-0 md:translate-x-15 lg:translate-x-15 h-[300px] sm:h-[400px] md:h-[600px] lg:h-[650px]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 18, 28, 0.7), rgba(0, 18, 28, 0.7)), url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200)',
        }}
      >
        <div className="absolute mb-10 inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 md:mt-10 text-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6"
            style={{ color: MY_COLORS.secondaryGreen }}
          >
            {t('smartBuilding.title')}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg max-w-full sm:max-w-xl md:max-w-3xl mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2">
            {t('smartBuilding.subtitle')}
          </p>

<div className='flex flex-row lg:-translate-x-10 gap-2'>
  <motion.div 
    className="flex-shrink-0"
    animate={{
      x: [0, -12, 0], // Position normale → Gauche → Position normale
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.3
    }}
  >
    <img 
      src={fi} 
      alt="Fleche"
      className="w-8 h-8 sm:w-6 sm:h-6 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-15 xl:h-15 object-contain scale-x-[-1]"
    />
  </motion.div>
  
          <button 
            className="px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3 text-sm sm:text-base rounded-full border-2 text-white font-medium hover:bg-white transition-all"
            style={{ borderColor: MY_COLORS.secondaryGreen, color: MY_COLORS.secondaryGreen }}
          >
            {t('smartBuilding.buttonText')}
          </button>
</div>
        </div>
      </div>

      {/* Tabs Navigation - Superposé sur le hero */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4">
        <div className="bg-white flex justify-center rounded-tl-full rounded-tr-full rounded-r-full overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 font-medium text-sm transition-all relative ${
                activeTab === tab.id ? 'font-bold' : ''
              } ${index === 0 ? 'rounded-l-full' : ''} ${index === tabs.length - 1 ? 'rounded-r-full' : ''}`}
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

export default SmartBuildingHero;

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
