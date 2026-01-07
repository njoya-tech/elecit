import React from "react";
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import ControlHero from "../../components/ControlD'access/ControlHero.jsx";
import ControlCards from "../../components/ControlD'access/ControlCards.jsx";
import ControlCarousel from "../../components/ControlD'access/ControlCarousel.jsx";

const ControlPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* ================= HERO ================= */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <ControlHero height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          
          {/* ===== CARDS SECTION ===== */}
          <section >
            <ControlCards />
          </section>

          {/* ===== CAROUSEL SECTION ===== */}
          <section >
            <ControlCarousel />
          </section>

        </div>

        {/* ================= FOOTER ================= */}
        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default ControlPage;
