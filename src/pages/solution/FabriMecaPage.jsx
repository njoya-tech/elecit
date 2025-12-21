import React from 'react'
import FabriMecaHero from '../../components/FabriMeca/FabriMecaHero'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
import fa1 from '../../assets/fa1.jpg'
import ExpertiseSection from '../../components/FabriMeca/ExpertiseSection'
import casq from '../../assets/casq.svg'
import rail from '../../assets/rail.svg'
import pieces from '../../assets/pieces.svg'
import engins from '../../assets/engins.svg'
import machines from '../../assets/machines.svg'
import c2 from '../../assets/c2.jpg'
import Bander from '../../components/FabriMeca/Bander'
import PrestationsProductionPage from '../../components/FabriMeca/PrestationProductionPage'
import photo from '../../assets/photo.jpg'
import Bander2 from '../../components/FabriMeca/Bander2'
import FoRound from '../../components/FabriMeca/FoRound'

const FabriMecaPage = () => {
  const expertiseData = {
    title: "Nos domaines d'expertise",
    subtitle: "Nous offrons des solutions globales pour la conception, la fabrication et l'assemblage de pièces métalliques et mécaniques, ainsi que d'engins roulants et de contenants, alliant qualité et précision.",
    headerIcon: casq,
    gearIcon: rail,
    expertises: [
      {
        icon: engins,
        title: "Engins roulants",
        description: "Conception et fabrication de chariots, remorques, plateformes motorisées ou manuelles.",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
        imagePosition: "right"
      },
      {
        icon: machines,
        title: "Machines",
        description: "Machines industrielles, sanitaires et commerciales, conçues selon vos besoins spécifiques",
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop",
        imagePosition: "left"
      },
      {
        icon: pieces,
        title: "Infrastructures & Pièces métalliques",
        description: "Structures métalliques, escaliers, garde-corps, pièces mécaniques usinées ou soudées.",
        image: c2,
        imagePosition: "right"
      }
    ]
  };

  const prestationsData = {
    title: "Prestations associées",
    subtitle: "Nos prestations couvrent l'ensemble du processus de fabrication mécanique et métallique, de l'étude technique au revêtement final, pour garantir des réalisations fiables, durables et adaptées à chaque besoin.",
    icon: casq,
    prestations: [
      {
        number: "1",
        title: "Conception &\nBureau d'études",
        description: "Modélisation 3D et simulation numérique, plans de fabrication sur mesure, Prototypage rapide."
      },
      {
        number: "2",
        title: "Fabrication &\nAssemblage",
        description: "Fraisage, soudure, découpe Laser, usinage, montage des structures métalliques en atelier ou sur site."
      },
      {
        number: "3",
        title: "Traitements\n& Finitions",
        description: "revêtement de surface (peinture, anodisation, galvanisation); contrôle qualité et métrologie."
      }
    ]
  };

  const productionData = {
    title: "Notre champ de production",
    icon: rail,
    decorIcon: rail,
    items: [
      {
        title: "CAB ATELIER",
        image: photo
      },
      {
        title: "BORNE NUMÉRIQUE",
        image: photo
      },
      {
        title: "MINI TRACTEUR",
        image: photo
      },
      {
        title: "STRUCTURE MÉTALLIQUE",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop"
      }
    ]
  };



  return (
    <>
    <div className='min-h-screen'>
       <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
       </header>

        <main className='pt-46'>

    <div>
           <FabriMecaHero
             title1="FabriMeca.heroTitle1"
  subtitle="FabriMeca.heroSubtitle"
  subtitle2="FabriMeca.heroSubtitle2"
  buttonText="FabriMeca.heroButtonText"
  bgImage={fa1}
           ></FabriMecaHero>
    </div>

    <div className=''>
<ExpertiseSection data={expertiseData} />
    </div>

    <div className=''>
      <Bander></Bander>
    </div>

    <div>
     <PrestationsProductionPage prestationsData={prestationsData} productionData={productionData} />
    </div>
        
        <div  className='lg:mb-130 md:mb-100 sm:mb-60 -mb-2'>
          <Bander2></Bander2>
        </div>

        <div>
          <FoRound></FoRound>
        </div>
        
        </main>
<Footer></Footer>
    </div>
    </>
  )
}

export default FabriMecaPage