import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobOfferFormOnlyModal from '../../components/Carriere/jobOfferformonlyModal';
import NavBar from '../../components/features/NavBar';
import Footer from '../../components/features/Footer';

const JobOffersOnly = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/carriere'); // Retour vers la page carrière
  };

  return (
    <>
      <div className='min-h-screen'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-50 pb-20'>
          <JobOfferFormOnlyModal onClose={handleClose} />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobOffersOnly;