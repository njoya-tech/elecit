import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/features/LanguageSwitcher";
import NavBar from "../../components/features/NavBar";
import ImageWithTextOverlay from "../../components/ImageWithTextOverlay";
import BlogCarousel from "../../components/HomePage/BlogCaroussel";
import BlogBanner from "../../components/HomePage/BlogBanner";

import SmartBuilding from "../../components/HomePage/SmartBuilding";
import HeroSection from "../../components/HomePage/HeroSection";
import slide1_home from "../../assets/slide1_home.jpg";
import slide2_home from "../../assets/slide2_home.jpg";
import slide3_home from "../../assets/slide3_home.jpg";

import SolutionsSection from "../../components/HomePage/SolutionsSection";

const HomePage = () => {
  const { t } = useTranslation();

  // Récupération des traductions
  const servicesData = t("servicesCarousel.services", { returnObjects: true });
  const serviceImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  ];

  // Fusion traductions + images
  const services = servicesData.map((service, index) => ({
    ...service,
    image: serviceImages[index],
  }));

  const blog = t("blog.articles", { returnObjects: true });

  const heroSlides = [
    {
      image: slide1_home,
      subtitle: "hero.subtitle",
      title: "hero.slide1.title",
      highlighted: "hero.slide1.highlighted",
      title2: "hero.slide1.title2",
      highlighted2: "hero.slide1.highlighted2",
      title3: "hero.slide1.title3",
    },
    {
      image: slide2_home,
      subtitle: "hero.subtitle",
      title: "hero.slide2.title",
      highlighted: "hero.slide2.highlighted",
      title2: "hero.slide2.title2",
      highlighted2: "hero.slide2.highlighted2",
      title3: "hero.slide2.title3",
    },
    {
      image: slide3_home,
      subtitle: "hero.subtitle",
      title: "hero.slide3.title",
      highlighted: "hero.slide3.highlighted",
      title2: "hero.slide3.title2",
      highlighted2: "hero.slide3.highlighted2",
      title3: "hero.slide3.title3",
    },
  ];

  return (
    <>
      <LanguageSwitcher />

      <NavBar />

      <HeroSection slides={heroSlides} />
      <br />
      <br />
      <div>
        <SolutionsSection />
      </div>

      {/* <section className='relative w-full max-w-lg mx-auto'>
        <div className='absolute inset'>

        </div>
      </section>
      <div className='text-green-600 font-montserrat   flex justify-center  '>HomePage</div>
      <ImageWithTextOverlay></ImageWithTextOverlay> */}
    </>
  );
};

export default HomePage;
