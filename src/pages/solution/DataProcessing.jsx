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
      {/*---NAVBAR-----*/}

      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}

        <section className="pt-20 lg:px-20  ">
          <HeroData height="75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-0 lg:mt-20 ">
            <CardInfo />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <CardDonnes />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20 pb-12">
            <CardAvantage />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <CardProject />
          </section>
        </div>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default DataProcessing;
