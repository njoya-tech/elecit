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
      {/*---NAVBAR-----*/}

      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}

        <section className="pt-20 lg:px-20  ">
          <Hero height="75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-0 lg:mt-20 ">
            <EntrepriseCards />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <EntrepriseTeam />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-px">
            <EntrepriseAcc />
          </section>
          <section className="pt-12 md:pt-16 lg:pt-20">
            <EntreprisePartner />
          </section>
        </div>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Entreprise;
