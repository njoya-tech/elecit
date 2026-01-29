import HomePage from './pages/acceuil/HomePage';
import ProjetsPage from './pages/projets/ProjetsPage';
import ProjetsDetail from './pages/projets/ProjetsDetail';
import Carriere from './pages/carriere/Carriere';
import Entreprise from "./pages/l'entreprise/Entreprise";
import Contact from './pages/contact/Contact';
import BlogPage from './pages/blog/BlogPage';
import BlogDetailPage from './components/Blog/BlogDetailPage.jsx';

// Solutions
import SmartBuildingPage from "./pages/solution/SmartBuildingPage";
import FabriMecaPage from "./pages/solution/FabriMecaPage";
import GpsTracking from "./pages/solution/GpsTracking";
import DataProcessing from "./pages/solution/DataProcessing";
import ControlPage from "./pages/solution/ControlPage";
import BureauPage from "./pages/bureau'etude/BureauPage";
import SavPage from "./pages/sav/SavPage";

// Jobs
import JobOffers from "./pages/job/JobOffers";
import JobOffersOnly from "./pages/job/JobOffersOnly";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projets" element={<ProjetsPage />} />
        <Route path="/projets/:id" element={<ProjetsDetail />} />
        <Route path="/carriere" element={<Carriere />} />

        {/* Solutions */}
        <Route path="/solutions/smart-building" element={<SmartBuildingPage />} />
        <Route path="/solutions/fabrication-mecanique" element={<FabriMecaPage />} />
        <Route path="/solutions/gps-tracking" element={<GpsTracking />} />
        <Route path="/solutions/it-data-processing" element={<DataProcessing />} />
        <Route path="/solutions/controle-acces-securite" element={<ControlPage />} />
        <Route path="/solutions/bureau-etude" element={<BureauPage />} />
        <Route path="/solutions/sav" element={<SavPage />} />

        {/* Company */}
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/contacts" element={<Contact />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:postId" element={<BlogDetailPage />} />

        {/* Jobs */}
        <Route path="/carriere/job" element={<JobOffers />} />
        <Route path="/carriere/job-only" element={<JobOffersOnly />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
