import React from "react";
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import ControlHero from "../../components/ControlD'access/ControlHero.jsx";
import ControlCards from "../../components/ControlD'access/ControlCards.jsx";
import ControlCarousel from "../../components/ControlD'access/ControlCarousel.jsx";

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
          <ControlHero height="75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-0 lg:mt-20 ">
            <ControlCards />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <ControlCarousel />
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
