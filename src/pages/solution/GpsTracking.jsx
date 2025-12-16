import React from 'react'
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
import { useTranslation } from 'react-i18next'
import Gbander from '../../components/GpsTracking/Gbander'
import st1 from '../../assets/st1.png';
import st2 from '../../assets/st2.png';
import st3 from '../../assets/st3.png';
import s from '../../assets/s.png'
import loca1 from '../../assets/loca1.png';
import loca2 from '../../assets/loca2.png';
import ordi1 from '../../assets/ordi1.png';
import phonegps from '../../assets/phonegps.png';
import Ground from '../../components/GpsTracking/Ground'



const GpsTracking = () => {

  const domaineData = {
    title: "Nos domaines d'intervention",
    subtitle: "Des solutions pensées pour le suivi précis, l'analyse approfondie et l'optimisation durable de votre flotte de véhicules et de l'ensemble de vos actifs, le tout de manière centralisée au sein d'une plateforme unique.",
  headerIcon: casq,
  gearIcon: rail,
  expertises: [
      {
        title: "Tracking par Vidéosurveillance-chauffeurs",
        description: "Suivi en temps réel via caméra en cabine des opérations menées par les chauffeurs et de leur itinéraire de déplacement.",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
        imagePosition: "right"
      },
      {
        title: "Tracking des Objets de Valeur",
        description: "Suivi en temps réel discret et sécurisé de biens sensibles (conteneur, valise, coffre fort…) via mini GPS portable, rechargeable",
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop",
        imagePosition: "left"
      },
      {
        title: "Gestion de Flottes",
        description: "Suivi GPS en temps réel, gestion centralisée de l'ensemble de la flotte via la plateforme, optimisation des trajets, création des alertes.",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop",
        imagePosition: "right"
      },
      {
        title: "Solutions Antivols",
        description: "Système de blocage moteur à distance via plateforme, alertes, protection active des véhicules.",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=500&fit=crop",
        imagePosition: "left"
      },
      {
        title: "Tracking par badge",
        description: "Solution de géolocalisation individuelle via badge intelligent adaptée au suivi de personnes âgées ou vulnérables, des enfants, des travailleurs isolés…",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=500&fit=crop",
        imagePosition: "right"
      },
      {
        title: "Gestion des Rapports",
        description: "Génération des rapports périodiques (journal de bord, trajets, anomalies, consommation..)/ Export des rapports sous format EXCEL, PDF, images, vidéos.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        imagePosition: "left"
      }
    ]
  };
      const { t } = useTranslation();
  
  const translations = {
    title: t('whyChooseUs.title'),
    subtitle: t('whyChooseUs.subtitle'),
    feature1: t('whyChooseUs.feature1'),
    feature2: t('whyChooseUs.feature2'),
    feature3: t('whyChooseUs.feature3'),
    feature4: t('whyChooseUs.feature4'),
    feature5: t('whyChooseUs.feature5'),
    feature6: t('whyChooseUs.feature6')
  };
  return (
    <>
    <div className='min-h-screen'>
         <header className='fixed top-0 left-0 right-0 z-50'>
               <NavBar></NavBar>
         </header>
     <main className='pt-46'>
             <div>
              <GpThero
                title1="gpsT.titlehero"
                subtitle="gpsT.descriptionhero"
               
                buttonText="gpsT.buttonhero"
                bgImage={gps1}
              
              
              ></GpThero> 
             </div>

             <div>
                <DomaineInter data={domaineData}></DomaineInter>
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
             <div className='mb-130'>
              <WhyChooseUs translations={translations} />;
             </div>

             <div>
              <Ground></Ground>
             </div>
     </main>
           <Footer></Footer>
    </div>
    </>
  )
}

export default GpsTracking