import React, { useEffect, useState } from "react";
import { IMAGES } from "../../asset/assets";

const BLOG_POSTS = [
  {
    id: 4,
    image: IMAGES.IMG1,
    title:
      "Irrigation intelligente : la technologie au service de l'agriculture durable",
    excerpt:
      "L'agriculture camerounaise, moteur de l'économie nationale, est confrontée à un défi de taille...",
  },
  {
    id: 5,
    image: IMAGES.IMG2,
    title:
      "Du métal brut à l'innovation : comment nous façonnons des infrastructures durables",
    excerpt:
      "Transformer une matière brute en un produit innovant et fonctionnel, voilà l'art de la métallurgie moderne...",
  },
  {
    id: 6,
    image: IMAGES.IMG3,
    title:
      "Data Processing et sécurité : protéger l'or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d'informations sensibles...",
  },
  {
    id: 7,
    image: IMAGES.IMG4,
    title:
      "Data Processing et sécurité : protéger l'or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d'informations sensibles...",
  },
  {
    id: 8,
    image: IMAGES.IMG5,
    title:
      "Data Processing et sécurité : protéger l'or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d'informations sensibles...",
  },
  {
    id: 9,
    image: IMAGES.IMG6,
    title:
      "Data Processing et sécurité : protéger l'or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d'informations sensibles...",
  },
];

const BlogContact = () => {
  const [page, setPage] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Responsive posts per page
  const [postsPerPage, setPostsPerPage] = useState(3);

  // Update posts per page based on screen size
  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.innerWidth < 768) {
        setPostsPerPage(1); // Mobile: 1 post
      } else if (window.innerWidth < 1024) {
        setPostsPerPage(2); // Tablet: 2 posts
      } else {
        setPostsPerPage(3); // Desktop: 3 posts
      }
    };

    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);
    return () => window.removeEventListener("resize", updatePostsPerPage);
  }, []);

  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage);

  const startIndex = page * postsPerPage;
  const visiblePosts = BLOG_POSTS.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // animation wrapper
  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      nextPage();
      setAnimate(false);
    }, 300);
  };

  const handlePrev = () => {
    setAnimate(true);
    setTimeout(() => {
      prevPage();
      setAnimate(false);
    }, 300); // Fixed from 3000ms to 300ms
  };

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [page, totalPages]);

  return (
    <section className="w-full bg-white py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
            Restez à jour sur nos{" "}
            <span className="text-[#00729B]">actualités</span> en consultant
            notre blog
          </h2>
        </div>

        {/* Cards wrapper */}
        <div className="relative px-4 sm:px-0">
          {/* Cards grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 transition-all 
            duration-300 transform ${
              animate
                ? "-translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="relative bg-white border border-[#00729B] rounded-md shadow-sm flex flex-col hover:shadow-md transition-shadow duration-200 mt-8"
              >
                {/* Number badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="h-12 w-12 rounded-full bg-[#00729B] text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {post.id}
                  </div>
                </div>

                {/* Image */}
                <div className="h-40 sm:h-48 md:h-52 w-full overflow-hidden rounded-t-md">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col">
                  <h3
                    className={`font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 text-center transition-all duration-500 transform line-clamp-3
                     ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "100ms" }}
                   >
                    {post.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-1 text-center transition-all duration-500 transform line-clamp-3
                       ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "200ms" }}
                   >
                    {post.excerpt}
                  </p>

                  <button
                    className={`mt-auto inline-flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#00729B] text-white text-xs sm:text-sm font-semibold hover:bg-[#005d7e] active:bg-[#004a63] transition-all duration-200 transform
                     ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "300ms" }}
                   >
                    Lire plus
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Left arrow - hidden on mobile */}
          <button
            aria-label="Previous page"
            onClick={handlePrev}
            className="hidden lg:flex items-center justify-center h-10 w-10 xl:h-12 xl:w-12 rounded-full bg-white border-2 border-[#00729B] shadow-md
                       absolute top-1/2 -translate-y-1/2 hover:bg-[#00729B] hover:text-white focus:outline-none transition-colors duration-200 text-2xl font-bold text-[#00729B]"
            style={{ zIndex: 30, left: "-60px" }}
          >
            ‹
          </button>

          {/* Right arrow - hidden on mobile */}
          <button
            aria-label="Next page"
            onClick={handleNext}
            className="hidden lg:flex items-center justify-center h-10 w-10 xl:h-12 xl:w-12 rounded-full bg-white border-2 border-[#00729B] shadow-md
                       absolute top-1/2 -translate-y-1/2 hover:bg-[#00729B] hover:text-white focus:outline-none transition-colors duration-200 text-2xl font-bold text-[#00729B]"
            style={{ zIndex: 30, right: "-60px" }}
          >
            ›
          </button>

          {/* Mobile navigation arrows */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <button
              aria-label="Previous page"
              onClick={handlePrev}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-[#00729B] shadow-md hover:bg-[#00729B] hover:text-white transition-colors duration-200 text-2xl font-bold text-[#00729B]"
            >
              ‹
            </button>
            <button
              aria-label="Next page"
              onClick={handleNext}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-[#00729B] shadow-md hover:bg-[#00729B] hover:text-white transition-colors duration-200 text-2xl font-bold text-[#00729B]"
            >
              ›
            </button>
          </div>
        </div>

        {/* Dots pagination */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                page === index ? "w-8 bg-[#00729B]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogContact;