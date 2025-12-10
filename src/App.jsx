import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/acceuil/HomePage'
import ProjetsPage from './pages/projets/ProjetsPage';
import Carriere from './pages/carriere/Carriere';
import LanguageSwitcher from './components/features/LanguageSwitcher'
import SmartBuildingPage from './pages/solution/SmartBuildingPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element={<HomePage />} />
        < Route path='/projets' element={<ProjetsPage/>} />
        < Route path='/carriere' element={<Carriere/>} />
        < Route path= '/solutions/smart-building' element={<SmartBuildingPage/>} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;