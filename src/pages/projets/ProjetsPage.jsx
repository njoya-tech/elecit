import React from 'react'
import NavBar from '../../components/features/NavBar'
import HeroSection from '../../components/ProjetsPage/HeroSection'
import ProjectsSection from '../../components/ProjetsPage/ProjectsSection'
import FormRound from '../../components/ProjetsPage/FormRound'
import Footer from '../../components/features/Footer'


const ProjetsPage = () => {
  return (
    <div className='min-h-screen'>
       <header className='fixed top-0 left-0 right-0 z-50'>

                         <NavBar/>
       </header>

        <main className='pt-46 '>
              
              <div>
                <HeroSection></HeroSection>
              </div>

              <div className='lg:mb-130 md:mb-100 sm:mb-60 -mb-20 '>
                <ProjectsSection></ProjectsSection>
              </div>

              <div>
                <FormRound></FormRound>
              </div>

        </main>
    
    
 <Footer/> 
    
    </div>
  )
}

export default ProjetsPage