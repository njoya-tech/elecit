import React from "react";
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import SavHero from "../../components/sav/SavHero.jsx";
import SavCards from "../../components/sav/SavCards.jsx";
import SavGreenCards from "../../components/sav/SavGreenCards.jsx";

const ControlPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/*---NAVBAR-----*/}

      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}

        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <SavHero height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <SavCards />
          </section>

          <section className="py-0 sm:py-0 md:py-12 lg:py-0">
            <SavGreenCards />
          </section>
        </div>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default ControlPage;
