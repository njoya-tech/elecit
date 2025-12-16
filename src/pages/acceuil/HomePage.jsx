import React from 'react'
import LanguageSwitcher from '../../components/features/LanguageSwitcher'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
import ImageWithTextOverlay from '../../components/ImageWithTextOverlay'
import BlogCarousel from '../../components/HomePage/BlogCaroussel'
import BlogBanner from '../../components/HomePage/BlogBanner'

import SmartBuilding from '../../components/HomePage/SmartBuilding'
import HeroSection from '../../components/HomePage/HeroSection'
import slide1_home from '../../assets/slide1_home.jpg';
import slide2_home from '../../assets/slide2_home.jpg';
import slide3_home from '../../assets/slide3_home.jpg';

import loca1 from '../../assets/loca1.png';
import loca2 from '../../assets/loca2.png';
import ordi1 from '../../assets/ordi1.png';

import st1 from '../../assets/st1.png';
import st2 from '../../assets/st2.png';
import st3 from '../../assets/st3.png';
import s from '../../assets/s.png'

import phonegps from '../../assets/phonegps.png';
import ServicesSection from '../../components/HomePage/ServicesSection'
import RealBanner from '../../components/HomePage/RealBanner'
import ServicesCarousel from '../../components/HomePage/ServicesCarousel'
import TrackingPlatformSection from '../../components/HomePage/TrackingPlatformSection'
import TestimonialsCarousel from '../../components/HomePage/TestimonialsCarousel'

import SolutionsSection from '../../components/HomePage/SolutionsSection'
import { useTranslation } from 'react-i18next';





const HomePage = () => {

   const services = [
    {
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      title: 'Services Informatiques & DATA Processing',
      description: 'Des solutions sur mesure pour l\'analyse des données, la conception de programmes, ainsi que la gestion des réseaux et bases de données.'
    },
    {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      title: 'Smart Building Solutions',
      description: 'Solutions innovantes pour la gestion intelligente des bâtiments et l\'optimisation énergétique.'
    },
    {
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
      title: 'GPS & Tracking',
      description: 'Systèmes de localisation et de suivi en temps réel pour une gestion optimale de vos ressources.'
    },
    {
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      title: 'Contrôle d\'accès & Sécurité',
      description: 'Solutions complètes de sécurité et de contrôle d\'accès pour protéger vos installations.'
    },
    {
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
      title: 'Bureau d\'étude',
      description: 'Expertise technique et conseil pour la conception de vos projets technologiques.'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      title: 'Service Après-Vente',
      description: 'Support technique et maintenance pour assurer la pérennité de vos installations.'
    }
  ];


   const blog = [
    {
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      title: 'Pourquoi la fabrication sur mesure change la donne dans l’industrie camerounaise?',
      description: 'Dans de nombreux secteurs industriels au Cameroun, les entreprises se heurtent à une difficulté récurrente....'
    },
    {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      title: '5 manières dont un hôtel intelligent économise énergie et fidélise ses clients',
      description: 'Dans un contexte hôtelier de plus en plus compétitif au Cameroun, la question est double...'
    },
    {
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
      title: 'La révolution du tracking : quand l’IA surveille vos véhicules',
      description: 'Le transport et la logistique sont au cœur de l’économie camerounaise, mais ce secteur fait face à des défis majeurs....'
    },
    {
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      title: 'irrigation intelligente : la technologie au service de l’agriculture durable',
      description: 'L’agriculture camerounaise, moteur de l’économie nationale, est confrontée à un défi de taille...'
    },
    {
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
      title: 'Du métal brut à l’innovation : comment nous façonnons des infrastructures durables',
      description: 'Transformer une matière brute en un produit innovant et fonctionnel, voilà l’art de la métallurgie moderne...'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      title: 'Data Processing et sécurité : protéger l’or numérique de votre entreprise',
      description: 'Chaque entreprise, quelle que soit sa taille, génère quotidiennement des volumes considérables d’informations....'
    }
  ];

const { t } = useTranslation();

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
    <div className='min-h-screen'>
                  <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
                  </header>

 <main className='pt-46'>


     <HeroSection slides={heroSlides} />
      <br/>
      <br/>
      <div>
                <SolutionsSection
      />

      </div>
   
    <TrackingPlatformSection 
      title={t('trackingPlatform.title')}
      buttonText={t('trackingPlatform.buttonText')}
      images={{
        loc1: loca1,
        loc2: loca2,
        ordi1: ordi1,
        phonegps: phonegps
      }}
    />
    <br/>
    <br/>
    
    <ServicesSection
      />

       <div>
      <RealBanner 
        titlePart1="Des réalisations à la hauteur de vos"
        highlightWord="espérances"
        titlePart2=""
      />
      <div className=''>
           <ServicesCarousel services={services} />
      </div>
    
    </div>

    <div>
         <SmartBuilding
      title={t('smartBuild.title')}
      buttonText={t('smartBuild.buttonText')}
      images={{
    
        loc2: st1,
        ordi1: st2,
        phonegps: s
      }}
    />
    </div>

    <div className='mt-20 '>
            <BlogBanner 
        titlePart1="Restez à jour sur nos "
        highlightWord="actualités"
        titlePart2=" en consultant notre blog"
      />
    </div>

    <div>
      <BlogCarousel services={blog}></BlogCarousel>
    </div>

  

    <div className='mt-20'>
         <BlogBanner 
        titlePart1=" Ce que dise nos clients de leur "
        highlightWord="experience"
        titlePart2=" avec vous"
      />
    
    </div>

    <div>
      <TestimonialsCarousel></TestimonialsCarousel>
    </div>



 </main>

 <Footer/> 
 
    </div>


  

    </>
  )
}

export default HomePage