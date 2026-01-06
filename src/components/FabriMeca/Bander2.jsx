import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import sma from '../../assets/sma.png'
import smart1 from '../../assets/smart1.jpg'
import casq from '../../assets/casq.svg'
import st1 from '../../assets/st1.png'
import st2 from '../../assets/st2.png'
import { MY_COLORS } from '../../utils/colors'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import fabp from '../../assets/fabp.jpg'
import rail from '../../assets/rail.svg'

// Animation flottante keyframes
const floatingAnimation = `
  @keyframes floating {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .floating {
    animation: floating 3s ease-in-out infinite;
  }
`

const Bander2 = () => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  // Les images du carrousel restent fixes (non traduites)
  const slides = [sma, st1, st2]

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setFadeIn(true)
      }, 500)
    }, 4000)

    return () => clearInterval(timer)
  }, [slides.length])

  const changeSlide = (direction) => {
    setFadeIn(false)
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
      setFadeIn(true)
    }, 500)
  }

  return (
    <>
      <style>{floatingAnimation}</style>

      <div className='bg-gray-400/20 w-screen items-center justify-center flex p-10'>
        <div className='relative w-[1000px]' 
          style={{
            backgroundImage: `linear-gradient(rgba(36, 38, 39, 0.7), rgba(58, 61, 63, 0.7)), url(${fabp})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >          
          <div className="flex items-center gap-5 pl-10">
            {/* Left Content Section */}
            <div className="flex-1 relative z-10">
              {/* Decorative Gear Left */}
              <div className="absolute -left-30 top-3 w-35 h-40">
                <motion.img 
                  src={casq} 
                  alt="engrenage" 
                  className="w-30 h-30 scale-x-[-1]" 
                  animate={{ 
                    y: [0, -15, 0],
                  }}
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

              <h1 className='text-4xl font-bold mt-8 text-white'>
                <span style={{color: MY_COLORS.secondaryGreen}}>
                  {t('smartVill.title1')}
                </span>
                {t('smartVill.title2')}
              </h1>

              <p className="text-white text-light mt-8 max-w-md mb-10">
                {t('smartVill.subtitle')}
              </p>

              <button 
                className="px-8 py-3 bg-white rounded-full font-bold transition-all hover:bg-white mt-10 mb-20"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.secondaryGreen
                  e.target.style.color = MY_COLORS.white
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = MY_COLORS.white
                  e.target.style.color = MY_COLORS.black
                }}
              >
                {t('smartVill.buttonText')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bander2