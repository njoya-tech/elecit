import React from "react";
import NavBar from "../../components/features/NavBar";
import Footer from "../../components/features/Footer";

const Security = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/*---NAVBAR-----*/}

      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}
        {/* <section className="pt-20 lg:px-20">
          <HeroData height="75vh" />
        </section> */}

        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Security;
