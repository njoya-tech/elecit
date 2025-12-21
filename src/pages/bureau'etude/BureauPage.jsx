import React from 'react'
import BureauHero from '../../components/BureauEtude/BureauHero';
import BureauCards from '../../components/BureauEtude/BureauCards';
import BureauCarousel from '../../components/BureauEtude/BureauCarousel';
import NavBar from '../../components/features/NavBar';
import Footer from '../../components/features/Footer';


const BureauPage = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/*---NAVBAR-----*/}

      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - FULL WIDTH, NO CONTAINER*/}

        <section className="pt-20 lg:px-20  ">
          <BureauHero height="75vh" />
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <section className="pt-0 lg:mt-20 ">
            <BureauCards />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <BureauCarousel />
          </section>
        </div>

        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
}

export default BureauPage
