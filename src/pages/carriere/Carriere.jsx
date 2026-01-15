import React, { useEffect, useState } from 'react'
import RecruitmentHero from '../../components/Carriere/RecruitmentHero';
import RecruitmentProcess from '../../components/Carriere/RecruitmentProcess';
import Footer from '../../components/features/Footer'
import NavBar from '../../components/features/NavBar';
import bgImage from '../../assets/bgImage.jpg'
import JobOffersList from '../../components/Carriere/jobOffersList';
import FormRoundCar from '../../components/Carriere/FormRoundCar';
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
    <>
    <div className='min-h-screen '>
       <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
       </header>

        <main className='pt-46'>
                    <div>
      <RecruitmentHero
        title1="recruitment.heroTitle1"
        title2="recruitment.heroTitle2"
        subtitle="recruitment.heroSubtitle"
        bgImage={car}
      />
      
    </div>
         
    <div>
           <RecruitmentProcess steps={processSteps} />
    </div>

    <div className='lg:mb-20 md:mb-100 sm:mb-60 -mb-20'>
        <JobOffersList offers={jobOffersData} />
    </div>
 
    <div>
        <FormRoundCar></FormRoundCar>
    </div>
        </main>
    </div>
 <Footer/> 
    
    </>
  );
}

export default Carriere