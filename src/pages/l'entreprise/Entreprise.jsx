/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Hero from "../../components/Hero/Hero.jsx";
import NavBar from "../../components/features/NavBar.jsx";
import ElecITCarouselCard from "../../components/HeroTest.jsx";
import EntrepriseCards from "../../components/EntrepriseCompo/EntrepriseCards.jsx";
import EntrepriseTeam from "../../components/EntrepriseCompo/EntrepriseTeam.jsx";
import EntrepriseAcc from "../../components/EntrepriseCompo/EntrepriseAcc.jsx";
import EntreprisePartner from "../../components/EntrepriseCompo/EntreprisePartner.jsx";
import Footer from "../../components/features/Footer.jsx";

const Entreprise = () => {
  // Animation variants for slide down effect
  const slideDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };

  // Animation for sections that trigger on scroll
  const slideDownOnScroll = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* NAVBAR - Fixed with background */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      >
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO - Animates on page load */}
        <motion.section
          className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20"
          initial="hidden"
          animate="visible"
          variants={slideDown}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Hero height="60vh sm:65vh md:70vh lg:75vh" />
        </motion.section>

        {/* CONTENT SECTIONS - CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Cards Section - Animates on scroll into view */}
          <section>
            <ElecITCarouselCard />
          </section>

          {/* Cards Section - Animates on scroll into view */}
          <section
            
          >
            <EntrepriseCards />
          </section>

          {/* Team Section - Animates on scroll into view */}
          <section
           
          >
            <EntrepriseTeam />
          </section>

          {/* Acc Section - Animates on scroll into view */}
          <section
           
          >
            <EntrepriseAcc />
          </section>

          {/* Partner Section - Animates on scroll into view */}
          <section
           
          >
            <EntreprisePartner />
          </section>
        </div>

        {/* FOOTER - Animates on scroll into view */}
        <motion.footer
          className="mt-0 p-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideDownOnScroll}
        >
          <Footer />
        </motion.footer>
      </main>
    </div>
  );
};

export default Entreprise;