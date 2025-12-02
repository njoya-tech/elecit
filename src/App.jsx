import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/acceuil/HomePage'
import LanguageSwitcher from './components/features/LanguageSwitcher'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageSwitcher />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;