// src/App.jsx
import React from "react";
import Entreprise from "./pages/l'entreprise/Entreprise";
import HeroTest from "./components/HeroTest";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/acceuil/HomePage";
import LanguageSwitcher from "./components/features/LanguageSwitcher";
function App() {
  return (
    <div className="App">
      <Entreprise />
    </div>
  );
}

export default App;
