import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/acceuil/HomePage'
import ProjetsPage from './pages/projets/ProjetsPage';
import LanguageSwitcher from './components/features/LanguageSwitcher'
import Entreprise from "./pages/l'entreprise/Entreprise"
import Contact from './pages/contact/Contact';
import DataProcessing from './pages/solution/DataProcessing';
import ControlPage from './pages/solution/ControlPage';
import BureauPage from './pages/bureau\'etude/BureauPage';
import SavPage from "./pages/sav/SavPage"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element={<HomePage />} />
        < Route path='/projets' element={<ProjetsPage/>} />
        < Route path='/entreprise' element={<Entreprise/>} />
        < Route path='/contacts' element={<Contact/>} />
        < Route path='/solutions/it-data-processing' element={<DataProcessing/>} />
        < Route path='/solutions/controle-acces-securite' element={<ControlPage/>} />
        < Route path='/solutions/bureau-etude' element={<BureauPage/>} />
        < Route path='/solutions/sav' element={<SavPage/>} />
           
      </Routes>
    </BrowserRouter>
  );
}

export default App;
