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
      {/* Navbar - Fixed with proper mobile height */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO — FULL WIDTH WITH MARGINS */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <HeroContact height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* CONTENT SECTIONS — CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Formula Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <FormulaContact />
          </section>

          {/* Location Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            <LocationContact />
          </section>

          {/* Blog Section */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
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