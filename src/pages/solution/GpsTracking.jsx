import React from 'react'
import { useTranslation } from 'react-i18next'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
import GpThero from '../../components/GpsTracking/GpThero'
import gps1 from '../../assets/gps1.jpg'
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
import DomaineInter from '../../components/GpsTracking/DomaineInter'
import WhyChooseUs from '../../components/GpsTracking/WhyChooseUs'
import Gbander from '../../components/GpsTracking/Gbander'
import st1 from '../../assets/st1.png'
import st2 from '../../assets/st2.png'
import st3 from '../../assets/st3.png'
import s from '../../assets/s.png'
import loca1 from '../../assets/loca1.png'
import loca2 from '../../assets/loca2.png'
import ordi1 from '../../assets/ordi1.png'
import phonegps from '../../assets/phonegps.png'
import Ground from '../../components/GpsTracking/Ground'
import t9 from '../../assets/new/t9.jpg'
import t8 from '../../assets/new/t8.jpg'
import t7 from '../../assets/new/t7.png'
import t6 from '../../assets/new/t6.png'
import t5 from '../../assets/new/t5.png'
import t4 from '../../assets/new/t4.png'
import t3 from '../../assets/new/t3.png'
import t1 from '../../assets/new/t1.jpg'




const GpsTracking = () => {
  const { t } = useTranslation()

  // domaineData avec traductions
  const domaineData = {
    title: t('gpsT.domaines.title'),
    subtitle: t('gpsT.domaines.subtitle'),
    headerIcon: casq,
    gearIcon: rail,
    expertises: [
      {
        title: t('gpsT.domaines.items.videoSurveillance.title'),
        description: t('gpsT.domaines.items.videoSurveillance.description'),
        image: t9,
        imagePosition: "right"
      },
      {
        title: t('gpsT.domaines.items.objetsValeur.title'),
        description: t('gpsT.domaines.items.objetsValeur.description'),
        image: t1,
        imagePosition: "left"
      },
      {
        title: t('gpsT.domaines.items.gestionFlottes.title'),
        description: t('gpsT.domaines.items.gestionFlottes.description'),
        image: t8,
        imagePosition: "right"
      },
      {
        title: t('gpsT.domaines.items.antivol.title'),
        description: t('gpsT.domaines.items.antivol.description'),
        image: t4,
        imagePosition: "left"
      },
      {
        title: t('gpsT.domaines.items.badge.title'),
        description: t('gpsT.domaines.items.badge.description'),
        image: t6,
        imagePosition: "right"
      },
      {
        title: t('gpsT.domaines.items.conduiteAssistee.title'),
        description: t('gpsT.domaines.items.conduiteAssistee.description'),
        image: t5,
        imagePosition: "left"
      },
      {
        title: t('gpsT.domaines.items.carburant.title'),
        description: t('gpsT.domaines.items.carburant.description'),
        image: t3,
        imagePosition: "right"
      },
      {
        title: t('gpsT.domaines.items.rapports.title'),
        description: t('gpsT.domaines.items.rapports.description'),
        image: t7,
        imagePosition: "left"
      }
    ]
  }

  // translations pour WhyChooseUs
  const translations = {
    title: t('whyChooseUs.title'),
    subtitle: t('whyChooseUs.subtitle'),
    feature1: t('whyChooseUs.feature1'),
    feature2: t('whyChooseUs.feature2'),
    feature3: t('whyChooseUs.feature3'),
    feature4: t('whyChooseUs.feature4'),
    feature5: t('whyChooseUs.feature5'),
    feature6: t('whyChooseUs.feature6')
  }

  return (
    <>
      <div className='min-h-screen'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-46'>
          <div>
            <GpThero
              title1={t('gpsT.titlehero')}
              subtitle={t('gpsT.descriptionhero')}
              buttonText={t('gpsT.buttonhero')}
              bgImage={gps1}
            />
          </div>

          <div>
            <DomaineInter data={domaineData} />
          </div>
                    
          <div>
            <Gbander
              images={{
                loc1: loca1,
                loc2: loca2,
                ordi1: ordi1,
                phonegps: phonegps
              }}
              casqIcon={casq}
            />
          </div>

          <div>
            <WhyChooseUs translations={translations} />
          </div>

          <div>
            <Ground />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default GpsTracking