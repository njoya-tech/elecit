import React, { useState } from 'react'
import NavBar from "../../components/features/NavBar.jsx";
import Footer from "../../components/features/Footer.jsx";
import BlogHero from '../../components/Blog/BlogHero.jsx';
import BlogCards from '../../components/Blog/BlogCards.jsx';
import BlogDetail from '../../components/Blog/BlogDetail.jsx';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tous les postes');

  const handleBack = (category) => {
    setSelectedPost(null);
    // If category is provided, set it as active
    if (category) {
      setActiveCategory(category);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
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
            {selectedPost ? (
              // If selectedPost has a value, show detail page
              <BlogDetail 
                postId={selectedPost} 
                onBack={handleBack}
              />
            ) : (
              // If selectedPost is null, show cards list
              <BlogCards 
                onPostClick={(postId) => setSelectedPost(postId)}
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
}

export default BlogPage