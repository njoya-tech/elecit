import React from "react";
import NavBar from "../../components/features/NavBar";
import HeroData from "../../components/DataProcessingCompo/HeroData";
import CardAvantage from "../../components/DataProcessingCompo/CardAvantage";
import CardDonnes from "../../components/DataProcessingCompo/CardDonnes";
import CardInfo from "../../components/DataProcessingCompo/CardInfo";
import CardProject from "../../components/DataProcessingCompo/CardProject";
import Footer from "../../components/features/Footer";

const DataProcessing = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* ================= HERO ================= */}
        {/* SAME RESPONSIVE LOGIC AS SavPage */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <HeroData height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* ================= MAIN CONTAINER ================= */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          
          {/* ===== INFO SECTION ===== */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <CardInfo />
          </section>

          {/* ===== DONNÉES SECTION ===== */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <CardDonnes />
          </section>

          {/* ===== AVANTAGES SECTION ===== */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <CardAvantage />
          </section>

          {/* ===== PROJECT SECTION ===== */}
          <section className="pt-12 md:pt-16 lg:pt-20">
            <CardProject />
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

export default DataProcessing;
