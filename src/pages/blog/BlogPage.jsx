import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import BlogHero from "../../components/Blog/BlogHero.jsx";
import BlogCards from "../../components/Blog/BlogCards.jsx";
import BlogDetail from "../../components/Blog/BlogDetail.jsx";

const BlogPage = () => {
  const { postId } = useParams(); // Get postId from URL
  const navigate = useNavigate(); // For navigation
  const [activeCategory, setActiveCategory] = useState("Tous les postes");

  // Handle when a blog card is clicked
  const handlePostClick = (clickedPostId) => {
    navigate(`/blog/${clickedPostId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle going back to blog list
  const handleBack = (category) => {
    navigate("/blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // If category is provided, set it as active
    if (category) {
      setActiveCategory(category);
    }
  };

  return (
    <div className=" w-screen relative w-full min-h-screen">
      {/* Navbar - Fixed with proper mobile height */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <NavBar />
      </div>

      <main className="w-full">
        {/* HERO — FULL WIDTH WITH MARGINS */}
        <section className="pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-20">
          <BlogHero height="60vh sm:65vh md:70vh lg:75vh" />
        </section>

        {/* CONTENT SECTIONS — CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <section className="py-8 sm:py-10 md:py-12 lg:py-16">
            {/* CONDITIONAL RENDERING: Show BlogDetail OR BlogCards */}
            {postId ? (
              // If postId exists in URL, show detail page
              <BlogDetail postId={postId} onBack={handleBack} />
            ) : (
              // If no postId in URL, show cards list
              <BlogCards
                onPostClick={handlePostClick}
                initialCategory={activeCategory}
              />
            )}
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

export default BlogPage;
