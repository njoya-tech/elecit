import React from 'react'
import LanguageSwitcher from '../../components/features/LanguageSwitcher'
import NavBar from '../../components/features/NavBar'
import ImageWithTextOverlay from '../../components/ImageWithTextOverlay'
import HeroSection from '../../components/HomePage/HeroSection'
import slide1_home from '../../assets/slide1_home.jpg';
import slide2_home from '../../assets/slide2_home.jpg';
import slide3_home from '../../assets/slide3_home.jpg';
const HomePage = () => {


  const heroSlides = [
    {
      image: slide1_home,
      subtitle: 'hero.subtitle',
      title: 'hero.slide1.title',
      highlighted: 'hero.slide1.highlighted',
      title2: 'hero.slide1.title2',
      highlighted2: 'hero.slide1.highlighted2',
      title3: 'hero.slide1.title3'
    },
    {
      image: slide2_home,
      subtitle: 'hero.subtitle',
      title: 'hero.slide2.title',
      highlighted: 'hero.slide2.highlighted',
      title2: 'hero.slide2.title2',
      highlighted2: 'hero.slide2.highlighted2',
      title3: 'hero.slide2.title3'
    },
    {
      image: slide3_home,
      subtitle: 'hero.subtitle',
      title: 'hero.slide3.title',
      highlighted: 'hero.slide3.highlighted',
      title2: 'hero.slide3.title2',
      highlighted2: 'hero.slide3.highlighted2',
      title3: 'hero.slide3.title3'
    }
  ];


  return (
    <>
    
    <LanguageSwitcher/>

     <NavBar/>

 <HeroSection slides={heroSlides} />



 
         {/* <section className='relative w-full max-w-lg mx-auto'>
                <div className='absolute inset'>

                </div>
         </section>
    <div className='text-green-600 font-montserrat   flex justify-center  '>HomePage</div>
    <ImageWithTextOverlay></ImageWithTextOverlay> */}

    </>
  )
}

export default HomePage