import React from 'react'
import RecruitmentHero from '../../components/Carriere/RecruitmentHero';
import RecruitmentProcess from '../../components/Carriere/RecruitmentProcess';
import Footer from '../../components/features/Footer'
import NavBar from '../../components/features/NavBar';
import bgImage from '../../assets/bgImage.jpg'
import JobOffersList from '../../components/Carriere/jobOffersList';
import FormRoundCar from '../../components/Carriere/formRoundCar';


const Carriere = () => {

    const jobOffersData = [
  {
    id: 1,
    title: "Ingénieur en mécatronique",
    subtitle: "INGENIEUR EN MECATRONIQUE INDUSTRIELLE",
    location: "Akwa Beach, Douala, Cameroun",
    type: "Stage professionnel",
    publicationDate: "12 février 2025",
    validUntil: "28 février 2025",
    tags: ["CDD", "fabrication mécanique"],
    description: "Nous sommes à la recherche d'un stagiaire professionnel technicien en mécatronique industrielle talentueux pour rejoindre notre équipe et contribuer à la réalisation des projets passionnants. Si vous êtes passionné par cet emploi, ce poste est le vôtre, avec possibilité d'embauche.",
    responsibilities: "Concevoir et produire les solutions innovantes selon le cahier de charge.",
    activities: [
      "Analyser le schéma et le tableau électrique",
      "Contribuer à l'installation des équipements électriques"
    ],
    profile: "Diplôme en mécatronique industrielle ou équivalent..."
  },
   {
    id: 2,
    title: "Ingénieur devOps",
    subtitle: "INGENIEUR ",
    location: "Akwa Beach, Douala, Cameroun",
    type: "Stage professionnel",
    publicationDate: "12 février 2025",
    validUntil: "28 février 2025",
    tags: ["CDD", "fabrication mécanique"],
    description: "Nous sommes à la recherche d'un stagiaire professionnel technicien en mécatronique industrielle talentueux pour rejoindre notre équipe et contribuer à la réalisation des projets passionnants. Si vous êtes passionné par cet emploi, ce poste est le vôtre, avec possibilité d'embauche.",
    responsibilities: "Concevoir et produire les solutions innovantes selon le cahier de charge.",
    activities: [
      "Analyser le schéma et le tableau électrique",
      "Contribuer à l'installation des équipements électriques"
    ],
    profile: "Diplôme en mécatronique industrielle ou équivalent..."
  }
];


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
    <div className='min-h-screen'>
       <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
       </header>

        <main className='pt-46'>
                     <div>
      <RecruitmentHero
        title1="recruitment.heroTitle1"
        title2="recruitment.heroTitle2"
        subtitle="recruitment.heroSubtitle"
        bgImage={bgImage}
      />
      <RecruitmentProcess steps={processSteps} />
    </div>

    <div className='lg:mb-130 md:mb-100 sm:mb-60 -mb-20'>
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