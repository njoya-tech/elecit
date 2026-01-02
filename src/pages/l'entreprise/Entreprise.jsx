import React from "react";
import Hero from "../../components/Hero/Hero.jsx";
import NavBar from "../../components/features/NavBar.jsx";
import ElecITCarouselCard from "../../components/HeroTest.jsx";
import EntrepriseCards from "../../components/EntrepriseCompo/EntrepriseCards.jsx";
import EntrepriseTeam from "../../components/EntrepriseCompo/EntrepriseTeam.jsx";
import EntrepriseAcc from "../../components/EntrepriseCompo/EntrepriseAcc.jsx";
import EntreprisePartner from "../../components/EntrepriseCompo/EntreprisePartner.jsx";
import Footer from "../../components/features/Footer.jsx";

 

const Entreprise = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* NAVBAR - Fixed with background */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH WITH MARGINS */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <Hero height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* CONTENT SECTIONS - CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Cards Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <EntrepriseCards />
          </section>

          {/* Team Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <EntrepriseTeam />
          </section>

          {/* Acc Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <EntrepriseAcc />
          </section>

          {/* Partner Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <EntreprisePartner />
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Entreprise;