import { lazy, Suspense } from "react";
import { BrowserRouter , Route, HashRouter, Routes } from "react-router-dom";
import MobileBankProject from './components/ProjetsPage/MobileBankProject';
import ProjetsDetail from './pages/projets/ProjetsDetail';

// Core pages
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

function App() {
  return (
    <HashRouterRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <span className="text-gray-500 text-sm"></span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets" element={<ProjetsPage />} />
          <Route path="/projets/:id" element={<ProjetsDetail />} />
          <Route path="/carriere" element={<Carriere />} />

          {/* Solutions */}
          <Route
            path="/solutions/smart-building"
            element={<SmartBuildingPage />}
          />
          <Route
            path="/solutions/fabrication-mecanique"
            element={<FabriMecaPage />}
          />
          <Route
            path="/solutions/gps-tracking"
            element={<GpsTracking />}
          />

          {/* IT Data Processing — list page */}
          <Route
            path="/solutions/it-data-processing"
            element={<DataProcessing />}
          />
          {/* IT Data Processing — individual project detail page */}
          <Route
            path="/solutions/it-data-processing/:projectId"
            element={<ProjectDetail />}
          />

          <Route
            path="/solutions/controle-acces-securite"
            element={<ControlPage />}
          />
          <Route
            path="/solutions/bureau-etude"
            element={<BureauPage />}
          />
          <Route path="/solutions/sav" element={<SavPage />} />

          {/* Company */}
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/contacts" element={<Contact />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPage />} />

          {/* Jobs */}
          <Route path="/carriere/job" element={<JobOffers />} />
          <Route path="/carriere/job-only" element={<JobOffersOnly />} />
        </Routes>
      </Suspense>
    </HashRouterRouter>
  );
}

export default App;

