import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  // expertiseData avec traductions
  const expertiseData = {
    title: t('fabriMeca.expertise.title'),
    subtitle: t('fabriMeca.expertise.subtitle'),
    headerIcon: casq,
    gearIcon: rail,
    expertises: [
      {
        icon: engins,
        title: t('fabriMeca.expertise.items.engins.title'),
        description: t('fabriMeca.expertise.items.engins.description'),
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
        imagePosition: "right"
      },
      {
        icon: machines,
        title: t('fabriMeca.expertise.items.machines.title'),
        description: t('fabriMeca.expertise.items.machines.description'),
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop",
        imagePosition: "left"
      },
      {
        icon: pieces,
        title: t('fabriMeca.expertise.items.pieces.title'),
        description: t('fabriMeca.expertise.items.pieces.description'),
        image: c2,
        imagePosition: "right"
      }
    ]
  }

  // prestationsData avec traductions
  const prestationsData = {
    title: t('fabriMeca.prestations.title'),
    subtitle: t('fabriMeca.prestations.subtitle'),
    icon: casq,
    prestations: [
      {
        number: "1",
        title: t('fabriMeca.prestations.items.conception.title'),
        description: t('fabriMeca.prestations.items.conception.description')
      },
      {
        number: "2",
        title: t('fabriMeca.prestations.items.fabrication.title'),
        description: t('fabriMeca.prestations.items.fabrication.description')
      },
      {
        number: "3",
        title: t('fabriMeca.prestations.items.traitements.title'),
        description: t('fabriMeca.prestations.items.traitements.description')
      }
    ]
  }

  // productionData avec traductions
  const productionData = {
    title: t('fabriMeca.production.title'),
    icon: rail,
    decorIcon: rail,
    items: [
      {
        title: t('fabriMeca.production.items.citernes'),
        image: photo
      },
      {
        title: t('fabriMeca.production.items.borneNumerique'),
        image: photo
      },
      {
        title: t('fabriMeca.production.items.benne'),
        image: photo
      },
      {
        title: t('fabriMeca.production.items.camionFrigo'),
        image: photo
      },
      {
        title: t('fabriMeca.production.items.structureMetallique'),
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop"
      }
    ]
  }

  return (
    <>
      <div className='min-h-screen'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-46'>
          <div>
            <FabriMecaHero
              title1={t('FabriMeca.heroTitle1')}
              subtitle={t('FabriMeca.heroSubtitle')}
              subtitle2={t('FabriMeca.heroSubtitle2')}
              buttonText={t('FabriMeca.heroButtonText')}
              bgImage={fa1}
            />
          </div>

          <div className=''>
            <ExpertiseSection data={expertiseData} />
          </div>

          <div className=''>
            <Bander />
          </div>

          <div>
            <PrestationsProductionPage 
              prestationsData={prestationsData} 
              productionData={productionData} 
            />
          </div>
          
          <div className=''>
            <Bander2 />
          </div>

          <div>
            <FoRound />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default FabriMecaPage