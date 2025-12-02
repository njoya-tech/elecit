import React from 'react'
import LanguageSwitcher from '../../components/features/LanguageSwitcher'
import NavBar from '../../components/features/NavBar'
const HomePage = () => {
  return (
    <>
    
    <LanguageSwitcher/>

     <NavBar/>

    <div className='text-green-600 font-montserrat   flex justify-center  '>HomePage</div>

    </>
  )
}

export default HomePage