import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobOfferModal from '../../components/Carriere/jobOfferModal';
import JobOfferFormOnlyModal from '../../components/Carriere/jobOfferformonlyModal';
import NavBar from '../../components/features/NavBar';
import Footer from '../../components/features/Footer';

const JobOffersOnly = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className='min-h-screen'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-50 pb-20'> {/* Ajuster selon la hauteur de votre NavBar */}
     
     <JobOfferFormOnlyModal/>



        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobOffersOnly;