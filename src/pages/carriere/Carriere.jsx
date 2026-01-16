import React, { useEffect, useState } from 'react'
import RecruitmentHero from '../../components/Carriere/RecruitmentHero';
import RecruitmentProcess from '../../components/Carriere/RecruitmentProcess';
import Footer from '../../components/features/Footer'
import NavBar from '../../components/features/NavBar';
import LanguageSwitcher from '../../components/features/LanguageSwitcher';
import bgImage from '../../assets/bgImage.jpg'
import JobOffersList from '../../components/Carriere/jobOffersList';
import FormRoundCar from '../../components/Carriere/formRoundCar';
import car from '../../assets/car.png'
import jobOffersServices from '../../services/jobOffers.services';
import { useTranslation } from 'react-i18next'

const Carriere = () => {
  const { i18n }= useTranslation();
  const [jobOffersData, setJobOffersData ] = useState([]);
  const [ loading, setLoading] = useState(true)

  // Charger les offres depuis Directus
  useEffect(() => {
    const fetchJobOffers = async () => {
      setLoading(true);
      try {
        const offers = await jobOffersServices.getJobOffers(i18n.language);
        setJobOffersData(offers);
        console.log('✅ Job Offers chargées:', offers);
      } catch (error) {
        console.error('❌ Erreur chargement job offers:', error);
        setJobOffersData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, [i18n.language]); 

  const processSteps = [
    {
      title: 'recruitment.step1Title',
      description: 'recruitment.step1Description'
    },
    {
      title: 'recruitment.step2Title',
      description: 'recruitment.step2Description'
    },
    {
      title: 'recruitment.step3Title',
      description: 'recruitment.step3Description'
    },
    {
      title: 'recruitment.step4Title',
      description: 'recruitment.step4Description'
    },
    {
      title: 'recruitment.step5Title',
      description: 'recruitment.step5Description'
    }
  ];

  return (
    <div className="relative w-full min-h-screen">
      {/* ✅ NAVBAR FIXED avec background */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      {/* ✅ MAIN avec padding-top PRÉCIS */}
      <main className="w-full pt-20 sm:pt-24 md:pt-28">
        {/* ✅ HERO avec margins */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-20">
          <RecruitmentHero
            title1="recruitment.heroTitle1"
            title2="recruitment.heroTitle2"
            subtitle="recruitment.heroSubtitle"
            bgImage={car}
          />
        </section>

        {/* ✅ CONTAINER STABLE max-w-7xl */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <section className="py-12">
            <RecruitmentProcess steps={processSteps} />
          </section>

          <section className="py-12 mb-20">
            <JobOffersList offers={jobOffersData} />
          </section>

          <section className="py-12">
            <FormRoundCar />
          </section>
        </div>

        {/* ✅ FOOTER */}
        <Footer />
      </main>
    </div>
  );
}

export default Carriere;
