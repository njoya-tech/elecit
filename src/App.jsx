import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/acceuil/HomePage'
import ProjetsPage from './pages/projets/ProjetsPage';
import Carriere from './pages/carriere/Carriere';
import LanguageSwitcher from './components/features/LanguageSwitcher'
import SmartBuildingPage from './pages/solution/SmartBuildingPage';
import FabriMecaPage from './pages/solution/FabriMecaPage';
import GpsTracking from './pages/solution/GpsTracking';
import JobOffers from './pages/job/JobOffers';
import Entreprise from "./pages/l'entreprise/Entreprise"
import Contact from './pages/contact/Contact';
import DataProcessing from './pages/solution/DataProcessing';
import ControlPage from './pages/solution/ControlPage';
import BureauPage from './pages/bureau\'etude/BureauPage';
import SavPage from "./pages/sav/SavPage"
import BlogPage from './pages/blog/BlogPage';
import JobOfferFormOnlyModal from './components/Carriere/jobOfferformonlyModal';
import JobOffersOnly from './pages/job/JobOffersOnly';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projets" element={<ProjetsPage />} />
        <Route path="/carriere" element={<Carriere />} />
        <Route path="/solutions/smart-building" element={<SmartBuildingPage />} />
        <Route path="/solutions/fabrication-mecanique" element={<FabriMecaPage />} />
        <Route path="/solutions/gps-tracking" element={<GpsTracking />} />
        <Route path="/carriere/job" element={<JobOffers />} />
        <Route path="/carriere/job-Only" element={<JobOffersOnly />} />
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/solutions/it-data-processing" element={<DataProcessing />} />
        <Route path="/solutions/controle-acces-securite" element={<ControlPage />} />
        <Route path="/solutions/bureau-etude" element={<BureauPage />} />
        <Route path="/solutions/sav" element={<SavPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;