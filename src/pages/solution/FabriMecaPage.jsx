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
import an14 from '../../assets/new/an14.jpg'
import fab1 from '../../assets/new/fab1.jpg'
import fa2 from '../../assets/new/fa2.jpg'
import fab8 from '../../assets/new/fab8.jpg'
import fab9 from '../../assets/new/fab9.png'
import fab10 from '../../assets/new/fab10.png'
import fab11 from '../../assets/new/fab11.JPG'
import fab12 from '../../assets/new/fab12.jpg'
import fab13 from '../../assets/new/fab13.jpg'
import fab14 from '../../assets/new/fab14.jpeg'
import fab15 from '../../assets/new/fab15.png'

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
        image: fa2,
        imagePosition: "right"
      },
      {
        icon: machines,
        title: t('fabriMeca.expertise.items.machines.title'),
        description: t('fabriMeca.expertise.items.machines.description'),
        image: fab1,
        imagePosition: "left"
      },
      {
        icon: pieces,
        title: t('fabriMeca.expertise.items.pieces.title'),
        description: t('fabriMeca.expertise.items.pieces.description'),
        image: an14,
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
        image: fa2
      },
      {
        title: t('fabriMeca.production.items.benne'),
        image: fab10
      },
      {
        title: t('fabriMeca.production.items.borneNumerique'),
        image: fab13
      },
      {
        title: t('fabriMeca.production.items.porteEngins'),
        image: fab14
      },
      {
        title: t('fabriMeca.production.items.presseBrique'),
        image: fab11
      },
      {
        title: t('fabriMeca.production.items.broyeurMarteau'),
        image: fab12
      },
      {
        title: t('fabriMeca.production.items.structureMetallique'),
        image: fab9
      },
      {
        title: t('fabriMeca.production.items.camionFrigo'),
        image: fab8
      },
      {
        title: t('fabriMeca.production.items.PlateauRidelle'),
        image: fab15
      },
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