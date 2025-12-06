import React from "react";
import Hero from "../../components/Hero/Hero.jsx";
import NavBar from "../../components/features/NavBar.jsx";
import ElecITCarouselCard from "../../components/HeroTest.jsx";
import EntrepriseCards from "../../components/EntrepriseCompo/EntrepriseCards.jsx";
import EntrepriseTeam from "../../components/EntrepriseCompo/EntrepriseTeam.jsx";
import EntrepriseAcc from "../../components/EntrepriseCompo/EntrepriseAcc.jsx";
import EntreprisePartner from "../../components/EntrepriseCompo/EntreprisePartner.jsx";
const Entreprise = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation - full bleed (cancels parent padding) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      {/* Hero Section */}
      <main className="w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <section className="pt-8 md:pt-16 lg:pt-20 lg:-mt-20">
            <Hero />
          </section>

          {/* Carousel / second section */}
          <section className="pt-8 md:pt-12 lg:pt-16">
            <ElecITCarouselCard />
          </section>
        </div>

        {/* Entreprise Cards Section - Full Width */}
        <section className="w-full pt-8 md:pt-12 lg:pt-16">
          <EntrepriseCards />
        </section>

        {/* Team Section - Full Width */}
        <section className="w-full pt-8 md:pt-12 lg:pt-16">
          <EntrepriseTeam />
        </section>

        {/* Acc Section - Full Width */}
        <section className="w-full pt-8 md:pt-12 lg:pt-6">
          <EntrepriseAcc />
        </section>

        <section className="w-full pt-8 md:pt-12 lg:pt-16">
          <EntreprisePartner />
        </section>
      </main>
    </div>
  );
};

export default Entreprise;
