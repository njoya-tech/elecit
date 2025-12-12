import React from "react";
import NavBar from "../../components/features/NavBar";
import HeroSection from "../../components/ProjetsPage/HeroSection";

const ProjetsPage = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </header>

      <main className="pt-46">
        <div>
          <HeroSection></HeroSection>
        </div>
      </main>
    </div>
  );
};

export default ProjetsPage;
