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

      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}

        <section className="pt-20 lg:px-20  ">
          <SavHero height="75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-0 lg:mt-20 ">
            <SavCards />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
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
