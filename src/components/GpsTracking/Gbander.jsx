import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
}

// Composant image flottante (version propre)
const FloatingImage = ({
  src,
  alt,
  delay = 0,
  duration = 4,
  className = '',
  zIndex = 1
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={`absolute ${className}`}
    style={{ zIndex }}
    animate={{
      y: [0, -18, 0],
      x: [0, 12, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    onError={(e) => {
      e.currentTarget.src =
        `https://placehold.co/300x300/CCCCCC/000000?text=${alt}`
    }}
  />
)

const Gbander = ({ images, casqIcon }) => {
  const { t } = useTranslation()

  // Images par défaut (restent fixes, non traduites)
  const defaultImages = {
    loc1: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=300&h=300&fit=crop",
    ordi1: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop",
    loc2: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=300&h=300&fit=crop",
    phonegps: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop"
  }

  const bannerImages = images || defaultImages
  const defaultCasqIcon = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200"

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 pb-40">
      
      {/* Colonne gauche */}
      <div className="hidden md:block md:col-span-1 bg-white" />

      {/* Contenu principal */}
      <div className="col-span-1 md:col-span-10">
        <section
          className="rounded-3xl relative w-full min-h-[300px] sm:min-h-[480px] md:min-h-[480px] lg:min-h-[480px] overflow-visible"
          style={{ backgroundColor: '#40414F' }}
        >
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-80 lg:items-center h-full">
              
              {/* TEXTE */}
              <div className="relative z-10 space-y-6 sm:space-y-8 pt-5 md:pt-0">
                
                {/* Engrenage décoratif - Responsive positioning */}
                <div className="absolute -left-4 sm:-left-8 md:-left-12 lg:-left-16 top-4 lg:-top-40 sm:top-6 md:top-8 z-20">
                  <motion.img 
                    src={casqIcon || defaultCasqIcon}
                    alt="engrenage" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-45 lg:h-45 scale-x-[-1]" 
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

                {/* Titre */}
                <h2
                  className="max-w-8xl lg:w-[140%] md:w-[190%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                  style={{ color: MY_COLORS.white }}
                >
                  <span style={{color: MY_COLORS.secondaryGreen}}>
                    {t('gpsT.BanderTitle')}
                  </span>
                  <br className="hidden sm:block" />
                  {' '}{t('gpsT.BanderTitle2')}
                </h2>

                {/* Description */}
                <p className="text-white text-sm sm:text-base leading-relaxed max-w-md">
                  {t('gpsT.BanderDescription')}
                </p>

                {/* Bouton CTA avec animation pulse */}
                <motion.button
                  className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg border-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: MY_COLORS.green,
                    borderColor: MY_COLORS.green,
                  }}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 0.96, 1.06, 1],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    backgroundColor: MY_COLORS.green,
                    color: MY_COLORS.white,
                    scale: [1, 0.96, 1.06, 1],
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('gpsT.BanderButton')}
                </motion.button>
              </div>

              {/* VISUELS */}
              <div className="relative h-80 sm:h-96 md:h-96 lg:h-[500px] w-full flex justify-center md:justify-end items-center">
                {/* Zone verrouillée */}
                <div className="relative w-full h-full md:max-w-none lg:max-w-[640px] xl:max-w-[720px]">
                  
                  {/* Ordinateur - Élément central principal */}
                  <FloatingImage
                    src={bannerImages.ordi1}
                    alt="Dashboard"
                    className="left-[5%] top-[8%] w-[90%] max-w-[800px]"
                    zIndex={3}
                  />

                  {/* Smartphone GPS - Premier plan */}
                  <FloatingImage
                    src={bannerImages.phonegps}
                    alt="Smartphone GPS"
                    delay={0.8}
                    className="left-[50%] top-[45%] w-[35%] max-w-[190px]"
                    zIndex={4}
                  />

                  {/* Pin de localisation 1 - Arrière-plan droite */}
                  <FloatingImage
                    src={bannerImages.loc1}
                    alt="Location Pin"
                    delay={1.2}
                    className="left-[65%] top-[9%] w-[40%] max-w-[300px]"
                    zIndex={2}
                  />

                  {/* Pin de localisation 2 - Bas gauche */}
                  <FloatingImage
                    src={bannerImages.loc2}
                    alt="Location Pin Blue"
                    delay={1.6}
                    className="left-[2%] top-[35%] w-[50%] max-w-[900px]"
                    zIndex={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Colonne droite */}
      <div className="hidden md:block md:col-span-1 bg-white" />
    </div>
  )
}

export default Gbander