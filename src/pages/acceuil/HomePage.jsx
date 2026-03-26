/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
import BlogCarousel from '../../components/HomePage/BlogCaroussel'
import BlogBanner from '../../components/HomePage/BlogBanner'
import SmartBuilding from '../../components/HomePage/SmartBuilding'
import HeroSection from '../../components/HomePage/HeroSection'
import ServicesSection from '../../components/HomePage/ServicesSection'
import RealBanner from '../../components/HomePage/RealBanner'
import ServicesCarousel from '../../components/HomePage/ServicesCarousel'
import TrackingPlatformSection from '../../components/HomePage/TrackingPlatformSection'
import TestimonialsCarousel from '../../components/HomePage/TestimonialsCarousel'
import SolutionsSection from '../../components/HomePage/SolutionsSection'
import { slide1_home, slide2_home, slide3_home, loca1, loca2, ordi1, c2, st1, st2, st3, s, phonegps, an9, an5, bm3, an10, projet1, an8, an11, an12 } from '../../assets'

const HomePage = () => {
  const { t } = useTranslation();

  // Services pour ServicesCarousel (ces données restent locales)
  const services = useMemo(() => {
    const servicesData = t('servicesCarousel.services', { returnObjects: true });
    const serviceImages = [bm3, an5, an8, c2, an10, an9, projet1, an12, an11];
    
    return servicesData.map((service, index) => ({
      ...service,
      image: serviceImages[index]
    }));
  }, [t]);

  const heroSlides = useMemo(() => [
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
      title4: 'hero.slide3.title4'
    }
  ], []);

  const trackingImages = useMemo(() => ({
    loc1: loca1,
    loc2: loca2,
    ordi1: ordi1,
    phonegps: phonegps
  }), []);

  const smartBuildingImages = useMemo(() => ({
    loc2: st1,
    ordi1: st2,
    phonegps: s
  }), []);

  return (
    <div className='min-h-screen'>
      {/* Header fixe */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm'>
        <NavBar/>
      </header>

      <main className='pt-40'>
    
        <HeroSection slides={heroSlides} />
        <br/>
        <br/>
        
        <div>
          <SolutionsSection />
        </div>
     
        <TrackingPlatformSection 
          title={t('trackingPlatform.title')}
          buttonText={t('trackingPlatform.buttonText')}
          images={trackingImages}
        />
        <br/>
        <br/>
        
        <ServicesSection />

        <div>
          <RealBanner 
            titlePart1={t('realBanner.titlePart1')}
            highlightWord={t('realBanner.highlightWord')}
            titlePart2={t('realBanner.titlePart2')}
          />
          <div>
            <ServicesCarousel services={services} />
          </div>
        </div>

        <div>
          <SmartBuilding
            title={t('smartBuild.title')}
            buttonText={t('smartBuild.buttonText')}
            images={smartBuildingImages}
          />
        </div>

        {/* Section Blog avec données Directus */}
        <div className='mt-20'>
          <BlogBanner 
            titlePart1={t("blogBanner.titlePart1")}
            highlightWord={t("blogBanner.highlightWord")}
            titlePart2={t("blogBanner.titlePart2")}
          />
        </div>

        {/* ✅ BlogCarousel charge maintenant ses propres données depuis Directus */}
        <div>
          <BlogCarousel />
        </div>

        <div className='mt-20'>
          <BlogBanner 
            titlePart1={t("testimonialsBanner.titlePart1")}
            highlightWord={t("testimonialsBanner.highlightWord")}
            titlePart2={t("testimonialsBanner.titlePart2")}
          />
        </div>

        <div>
          <TestimonialsCarousel />
        </div>
      </main>

      <Footer/> 
    </div>
  )
}

export default HomePage