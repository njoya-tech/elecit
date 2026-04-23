import { lazy, Suspense } from "react";
import { BrowserRouter , Route, HashRouter, Routes } from "react-router-dom";
import MobileBankProject from './components/ProjetsPage/MobileBankProject';
import ProjetsDetail from './pages/projets/ProjetsDetail';

import CataloguePage from './pages/catalogue/CataloguePage';

const HomePage = lazy(() => import("./pages/acceuil/HomePage"));
const ProjetsPage = lazy(() => import("./pages/projets/ProjetsPage"));

const Carriere = lazy(() => import("./pages/carriere/Carriere"));
const Entreprise = lazy(() => import("./pages/l'entreprise/Entreprise"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const BlogDetailPage = lazy(() =>
  import("./components/Blog/BlogDetailPage.jsx")
);

// Solutions
const SmartBuildingPage = lazy(() =>
  import("./pages/solution/SmartBuildingPage")
);
const FabriMecaPage = lazy(() =>
  import("./pages/solution/FabriMecaPage")
);
const GpsTracking = lazy(() =>
  import("./pages/solution/GpsTracking")
);
const DataProcessing = lazy(() =>
  import("./pages/solution/DataProcessing")
);
const ControlPage = lazy(() =>
  import("./pages/solution/ControlPage")
);
const BureauPage = lazy(() =>
  import("./pages/bureau'etude/BureauPage")
);
const SavPage = lazy(() => import("./pages/sav/SavPage"));

// IT Data Processing — Project Detail page
const ProjectDetail = lazy(() =>
  import("./components/DataProcessingCompo/ProjectDetail")
);

// Jobs
const JobOffers = lazy(() => import("./pages/job/JobOffers"));
const JobOffersOnly = lazy(() => import("./pages/job/JobOffersOnly"));

const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    background: '#fff'
  }}>
    <style>{`
      .rl-wrap { position: relative; width: 72px; height: 72px; }
      .rl-ring { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid transparent; }
      .rl-outer { border-top-color: #7DA837; border-right-color: #7DA837; animation: rl-spin 1.2s cubic-bezier(.4,0,.2,1) infinite; }
      .rl-mid { inset: 10px; border-top-color: #7EA72E; border-left-color: #7EA72E; animation: rl-spin .9s cubic-bezier(.4,0,.2,1) infinite reverse; }
      .rl-inner { inset: 22px; border: 2px solid transparent; border-top-color: #7DA837; animation: rl-spin 1.5s cubic-bezier(.4,0,.2,1) infinite; opacity: .6; }
      .rl-dot { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      .rl-dot-i { width: 6px; height: 6px; border-radius: 50%; background: #7DA837; animation: rl-pulse 1.2s ease-in-out infinite; }
      .rl-track { width: 120px; height: 2px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
      .rl-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg,#7DA837,#7EA72E,#7DA837); background-size: 240px 100%; animation: rl-slide 1.4s ease-in-out infinite; }
      .rl-label { font-size: 12px; color: #9ca3af; letter-spacing: .08em; animation: rl-fade 1.4s ease-in-out infinite; }
      @keyframes rl-spin { to { transform: rotate(360deg); } }
      @keyframes rl-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.5);opacity:.4} }
      @keyframes rl-slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(240px)} }
      @keyframes rl-fade { 0%,100%{opacity:.4} 50%{opacity:1} }
    `}</style>
    <div className="rl-wrap">
      <div className="rl-ring rl-outer" />
      <div className="rl-ring rl-mid" />
      <div className="rl-ring rl-inner" />
      <div className="rl-dot"><div className="rl-dot-i" /></div>
    </div>
    
   
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjetsPage />} />
          <Route path="/projets/:id" element={<ProjetsDetail />} />
          <Route path="/carriere" element={<Carriere />} />
          <Route path="/solutions/smart-building" element={<SmartBuildingPage />} />
          <Route path="/solutions/fabrication-mecanique" element={<FabriMecaPage />} />
          <Route path="/solutions/gps-tracking" element={<GpsTracking />} />
          <Route path="/solutions/it-data-processing" element={<DataProcessing />} />
          <Route path="/solutions/it-data-processing/:projectId" element={<ProjectDetail />} />
          <Route path="/solutions/controle-acces-securite" element={<ControlPage />} />
          <Route path="/solutions/bureau-etude" element={<BureauPage />} />
          <Route path="/solutions/sav" element={<SavPage />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPage />} />
          <Route path="/carriere/job" element={<JobOffers />} />
          <Route path="/carriere/job-only" element={<JobOffersOnly />} />

          < Route path="/catalogue" element={<CataloguePage/>}/>
          {/* <ChatBotPopup />  */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;