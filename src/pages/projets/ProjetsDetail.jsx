import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/features/NavBar';
import Footer from '../../components/features/Footer';
import MobileBankProject from '../../components/ProjetsPage/MobileBankProject';

const ProjetsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID/slug depuis l'URL
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

// ✅ useEffect corrigé (supprimez id des dépendances si pas utilisé)
useEffect(() => {
  const storedProject = sessionStorage.getItem('selectedProject');
  
  if (storedProject) {
    try {
      const project = JSON.parse(storedProject);
      setProjectData(project);
    } catch (error) {
      console.error('❌ Erreur parsing projet:', error);
      navigate('/projets');
    }
  } else {
    navigate('/projets');
  }
  
  setLoading(false);
}, [navigate]); // ✅ Supprimé 'id'


  const handleClose = () => {
    // Nettoyer le sessionStorage
    sessionStorage.removeItem('selectedProject');
    // Retourner à la page projets
    navigate('/projets');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Chargement...</div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Projet non trouvé</div>
      </div>
    );
  }

  return (
    <>
      <div className='min-h-screen pt-15'>
        <header className='fixed top-0 left-0 right-0 z-50'>
          <NavBar />
        </header>

        <main className='pt-20 pb-20'>
          <MobileBankProject 
            projectData={projectData} 
            onClose={handleClose} 
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ProjetsDetail;