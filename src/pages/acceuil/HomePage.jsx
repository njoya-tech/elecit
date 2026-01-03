/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
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
  const { t } = useTranslation();

  // Récupération des traductions pour services
  const servicesData = t('servicesCarousel.services', { returnObjects: true });
  const serviceImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
  ];

  // Fusion traductions + images pour services
  const services = Array.isArray(servicesData) 
    ? servicesData.map((service, index) => ({
        ...service,
        image: serviceImages[index]
      }))
    : [];

  // Récupération des articles de blog - AVEC PROTECTION
  const blogArticles = t('blog.articles', { returnObjects: true });
  const blog = Array.isArray(blogArticles) ? blogArticles : [];

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
            <SolutionsSection />
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
          
          <ServicesSection />

          <div>
            <RealBanner 
              titlePart1={t('realBanner.titlePart1')}
              highlightWord={t('realBanner.highlightWord')}
              titlePart2={t('realBanner.titlePart2')}
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

          <div className='mt-20'>
            <BlogBanner 
              titlePart1={t("blogBanner.titlePart1")}
              highlightWord={t("blogBanner.highlightWord")}
              titlePart2={t("blogBanner.titlePart2")}
            />
          </div>

          <div>
            <BlogCarousel services={blog} />
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
    </>
  )
}

export default HomePage