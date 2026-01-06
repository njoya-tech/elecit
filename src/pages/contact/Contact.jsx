import React from "react";
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import HeroContact from "../../components/ContactCompo/HeroContact.jsx";
import LocationContact from "../../components/ContactCompo/LocationContact.jsx";
import FormulaContact from "../../components/ContactCompo/FormulaContact.jsx";
import BlogContact from "../../components/ContactCompo/BlogContact.jsx";

const Contact = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO — FULL WIDTH, NO CONTAINER */}
        <section className="pt-20 lg:px-20">
          <HeroContact height="75vh" />
        </section>

        {/* CONTENT SECTIONS — CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <section className="pt-12 md:pt-16 lg:pt-20 pb-12">
            <FormulaContact />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <LocationContact />
          </section>

          <section className="pt-12 md:pt-16 lg:pt-20">
            <BlogContact />
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-0 p-0">
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Contact;
