import React from 'react';
import { motion } from 'framer-motion';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant pour les items avec image à droite (desktop)
const ExpertiseItemRight = ({ icon, title, description, image, index }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center py-3 sm:py-4 md:py-5">
        {/* Contenu texte */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6 order-1">
          <div className="flex-shrink-0">
            <img src={icon} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-35 lg:h-35 object-contain" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: MY_COLORS.black }}>
              {title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: MY_COLORS.black }}>
              {description}
            </p>
          </div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.2 + 0.2
          }}
          className="rounded-lg overflow-hidden shadow-lg order-2"
        >
          <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover" />
        </motion.div>
      </div>

      {/* Ligne pointillée */}
      <div className="border-b-2 border-dashed border-gray-300 my-4 sm:my-6 md:my-8"></div>
    </motion.div>
  );
};

// Composant pour les items avec image à gauche (desktop)
const ExpertiseItemLeft = ({ icon, title, description, image, index }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center py-3 sm:py-4 md:py-5">
        {/* Image - order-2 sur mobile pour garder cohérence */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.2 + 0.2
          }}
          className="rounded-lg overflow-hidden shadow-lg order-2 lg:order-1"
        >
          <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover" />
        </motion.div>

        {/* Contenu texte - order-1 sur mobile */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6 order-1 lg:order-2">
          <div className="flex-shrink-0">
            <img src={icon} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-35 lg:h-35 object-contain" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: MY_COLORS.black }}>
              {title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: MY_COLORS.black }}>
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Ligne pointillée */}
      <div className="border-b-2 border-dashed border-gray-300 my-4 sm:my-6 md:my-8"></div>
    </motion.div>
  );
};

// Composant principal
const ExpertiseSection = ({ data }) => {
  // Données de démonstration
  const defaultData = {
    title: "Notre Expertise",
    subtitle: "Découvrez nos domaines d'excellence et notre savoir-faire unique dans chaque secteur d'activité",
    headerIcon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop",
    gearIcon: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop",
    expertises: [
      {
        icon: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&h=80&fit=crop",
        title: "Développement Web",
        description: "Création de sites web modernes et performants avec les dernières technologies",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
        imagePosition: "right"
      },
      {
        icon: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&h=80&fit=crop",
        title: "Design UI/UX",
        description: "Conception d'interfaces utilisateur intuitives et expériences utilisateur exceptionnelles",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        imagePosition: "left"
      },
      {
        icon: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&h=80&fit=crop",
        title: "Marketing Digital",
        description: "Stratégies digitales sur-mesure pour développer votre présence en ligne",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        imagePosition: "right"
      }
    ]
  };

  const sectionData = data || defaultData;

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 md:mb-14 lg:mb-16 relative"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 relative">
            {/* Icône flottante gauche - cachée sur mobile */}
            <div className="hidden md:block absolute -bottom-12 md:-bottom-16 lg:-bottom-20 left-4 md:left-8 lg:left-15">
              <motion.img 
                src={sectionData.headerIcon} 
                alt="" 
                className="w-24 h-24 md:w-32 md:h-32 lg:w-45 lg:h-45"
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
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2" style={{ color: MY_COLORS.secondaryGreen }}>
              {sectionData.title}
            </h2>
            
            {/* Engrenage tournant droite - cachée sur mobile */}
            <div className="hidden md:block absolute -top-12 md:-top-16 lg:-top-20 right-4 md:right-8 lg:right-15">
              <motion.img 
                src={sectionData.gearIcon} 
                alt="" 
                className="w-24 h-24 md:w-32 md:h-32 lg:w-45 lg:h-45" 
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 6, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              />
            </div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2" style={{ color: MY_COLORS.black }}>
            {sectionData.subtitle}
          </p>

          {/* Rail tournant - caché sur mobile et sm */}
          <div className="hidden lg:block absolute -bottom-260 -left-1">
            <motion.img 
 src={sectionData.gearIcon}  alt="engrenage" 
              className="w-50 h-50"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
            />
          </div>
        </motion.div>

        {/* Liste des expertises */}
        <div>
          {sectionData.expertises.map((expertise, index) => {
            if (expertise.imagePosition === 'right') {
              return (
                <ExpertiseItemRight
                  key={index}
                  icon={expertise.icon}
                  title={expertise.title}
                  description={expertise.description}
                  image={expertise.image}
                  index={index}
                />
              );
            } else {
              return (
                <ExpertiseItemLeft
                  key={index}
                  icon={expertise.icon}
                  title={expertise.title}
                  description={expertise.description}
                  image={expertise.image}
                  index={index}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;