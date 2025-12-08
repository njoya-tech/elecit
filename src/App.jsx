import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/acceuil/HomePage'
import ProjetsPage from './pages/projets/ProjetsPage';
import LanguageSwitcher from './components/features/LanguageSwitcher'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element={<HomePage />} />
        < Route path='/projets' element={<ProjetsPage/>} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;