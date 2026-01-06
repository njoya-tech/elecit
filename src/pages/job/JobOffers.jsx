import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobOfferModal from '../../components/Carriere/jobOfferModal';
import NavBar from '../../components/features/NavBar';
import Footer from '../../components/features/Footer';

const JobOffers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state || {};

  // Si pas d'offre, rediriger vers la page carrière
  React.useEffect(() => {
    if (!offer) {
      navigate('/carriere');
    }
  }, [offer, navigate]);

  const handleClose = () => {
    navigate('/carriere'); // ou la route de votre liste d'offres
  };

  if (!offer) {
    return null; // ou un loader
  }

  return (
    <>
      <div className='min-h-screen'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-50 pb-20'> {/* Ajuster selon la hauteur de votre NavBar */}
          <JobOfferModal offer={offer} onClose={handleClose} />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobOffers;