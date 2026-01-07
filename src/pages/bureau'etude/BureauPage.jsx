import React from "react";
import NavBar from "../../components/features/NavBar";
import Footer from "../../components/features/Footer";

import BureauHero from "../../components/BureauEtude/BureauHero";
import BureauCards from "../../components/BureauEtude/BureauCards";
import BureauCarousel from "../../components/BureauEtude/BureauCarousel";

const BureauPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* ================= HERO ================= */}
        {/* Same logic as SavPage */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <BureauHero height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          
          {/* ===== CARDS SECTION ===== */}
          <section >
            <BureauCards />
          </section>

          {/* ===== CAROUSEL SECTION ===== */}
          <section >
            <BureauCarousel />
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

export default BureauPage;
