import React from 'react';
import { motion } from 'framer-motion';
import casq from '../../assets/casq.svg'
import rail from '../../assets/rail.svg'

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

// Composant pour les items avec image à droite
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-5">
        {/* Contenu texte à gauche */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <img src={icon} alt="" className="w-35 h-35 object-contain" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
              {title}
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: MY_COLORS.black }}>
              {description}
            </p>
          </div>
        </div>

        {/* Image à droite */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.2 + 0.2
          }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img src={image} alt={title} className="w-full h-80 object-cover" />
        </motion.div>
      </div>

      {/* Ligne pointillée */}
      <div className="border-b-2 border-dashed border-gray-300 my-8"></div>
    </motion.div>
  );
};

// Composant pour les items avec image à gauche
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-5">
        {/* Image à gauche */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.2 + 0.2
          }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img src={image} alt={title} className="w-full h-80 object-cover" />
        </motion.div>

        {/* Contenu texte à droite */}
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <img src={icon} alt="" className="w-35 h-35 object-contain" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
              {title}
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: MY_COLORS.black }}>
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Ligne pointillée */}
      <div className="border-b-2 border-dashed border-gray-300 my-8"></div>
    </motion.div>
  );
};

// Composant principal
const ExpertiseSection = ({ data }) => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            
            <div className='absolute -bottom-20 left-15' >
               <motion.img src={data.headerIcon} alt="" className="w-45 h-45  "
                // Animation: Uniquement le mouvement vertical (flottement)
    animate={{ 
      y: [0, -15, 0], // Commence à 0, monte à -15px, revient à 0
    }}
    
    // Transition: Rend le flottement doux et répétitif
    transition={{ 
      // On cible explicitement la propriété 'y'
      y: {
        duration: 2, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "reverse", 
      }
    }}
               />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: MY_COLORS.secondaryGreen }}>
              {data.title}
            </h2>
           <div className='absolute -top-20 right-15' >
               <motion.img src={data.gearIcon} alt="" className="w-45 h-45" 
                 animate={{ rotate: 360 }}
                 transition={{ 
                 duration: 6, 
                 ease: "linear", 
                 repeat: Infinity 
            }}
               
               />
            </div>
          </div>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: MY_COLORS.black }}>
            {data.subtitle}
          </p>

           <div className="absolute -bottom-260 -left-1">
                    <motion.img 
                      src={rail} 
                      alt="engrenage" 
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
          {data.expertises.map((expertise, index) => {
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
export default ExpertiseSection