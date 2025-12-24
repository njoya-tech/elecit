import React from 'react'
import SmartBuildingHero from '../../components/SmartBuilding/SmartBuildingHero'
import SmartFeatureCarousel from '../../components/SmartBuilding/SmartFeatureCarousel'
import NavBar from '../../components/features/NavBar'
import Footer from '../../components/features/Footer'
import SmartBander from '../../components/SmartBuilding/smartBander'
import InterfaceCommandeCarousel from '../../components/SmartBuilding/InterfaceCommandeCarousel'
import { useState } from 'react'
import Prestations from '../../components/SmartBuilding/Prestations'
import SmartBander2 from '../../components/SmartBuilding/SmartBander2'
import FormRoundSmart from '../../components/SmartBuilding/FormRoundSmart'
const SmartBuildingPage = () => {
       
  const [activeTab, setActiveTab] = useState('smartHome');

 
  return (
    <>
    <div className='min-h-screen'>
       <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
       </header>

        <main className='pt-46'>

        
          <div>
            <SmartBuildingHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <SmartFeatureCarousel activeTab={activeTab} />
          </div>

           {/* <div className="min-h-screen" style={{ backgroundColor: '#2c3e50' }} >
      <InterfaceCommandeCarousel />
    </div> */}
    <div>
      <SmartBander></SmartBander>
    </div>

    <div>
      <Prestations/>
    </div>

    {/* <div  className=''>
      <SmartBander2></SmartBander2>
    </div> */}

         <div>
          <FormRoundSmart className=''></FormRoundSmart>
         </div>
     
     
        </main>
<Footer></Footer>
    </div>
    </>
  )
}

export default SmartBuildingPage