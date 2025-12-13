import React, { useEffect, useState } from "react";
import { IMAGES } from "../../asset/assets";

const BLOG_POSTS = [
  {
    id: 4,
    image: IMAGES.IMG1,
    title:
      "Irrigation intelligente : la technologie au service de l’agriculture durable",
    excerpt:
      "L’agriculture camerounaise, moteur de l’économie nationale, est confrontée à un défi de taille...",
  },
  {
    id: 5,
    image: IMAGES.IMG2,
    title:
      "Du métal brut à l’innovation : comment nous façonnons des infrastructures durables",
    excerpt:
      "Transformer une matière brute en un produit innovant et fonctionnel, voilà l’art de la métallurgie moderne...",
  },
  {
    id: 6,
    image: IMAGES.IMG3,
    title:
      "Data Processing et sécurité : protéger l’or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d’informations sensibles...",
  },
  {
    id: 7,
    image: IMAGES.IMG4,
    title:
      "Data Processing et sécurité : protéger l’or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d’informations sensibles...",
  },
  {
    id: 8,
    image: IMAGES.IMG5,
    title:
      "Data Processing et sécurité : protéger l’or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d’informations sensibles...",
  },
  {
    id: 9,
    image: IMAGES.IMG6,
    title:
      "Data Processing et sécurité : protéger l’or numérique de votre entreprise",
    excerpt:
      "Chaque entreprise génère quotidiennement des volumes considérables d’informations sensibles...",
  },
];

const BlogContact = () => {
  const [page, setPage] = useState(0);
  const [animate, setAnimate] = useState(false);

  const postsPerPage = 3;
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
    }, 3000);
  };

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Restez à jour sur nos{" "}
            <span className="text-[#00729B]">actualités</span> en consultant
            notre blog
          </h2>
        </div>

        {/* Cards wrapper - relative so arrows can position against it */}
        <div className="relative">
          {/* Cards grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 transition-all 
            duration-300 transform ${
              animate
                ? "-translate-x-10 opacity-0"
                : "translate-x-10 opacity-100"
            }`}
          >
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="relative bg-white border border-[#00729B] rounded-md shadow-sm flex flex-col"
              >
                {/* Number badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="h-12 w-12 rounded-full bg-[#00729B] text-white flex items-center justify-center text-lg font-bold">
                    {post.id}
                  </div>
                </div>

                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3
                    className={`font-semibold text-base md:text-lg mb-3 text-center transition-all duration-500 transform
                     ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "100ms" }}
                   >
                    {post.title}
                  </h3>

                  <p
                    className={`text-sm text-gray-600 mb-4 flex-1 text-center transition-all duration-500 transform
                       ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "200ms" }}
                   >
                    {post.excerpt}
                  </p>

                  <button
                    className={`mt-auto inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#00729B] text-white text-sm font-semibold hover:bg-[#005d7e] transition-all duration-500 transform
                     ${animate ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ transitionDelay: "300ms" }}
                   >
                    Lire plus
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Left arrow - vertically centered on the cards area */}
          <button
            aria-label="Previous page"
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white border border-gray-300 shadow-md
                       absolute top-1/2 -translate-y-1/2 -translate-x-1/2 hover:bg-gray-50 focus:outline-none"
            style={{ zIndex: 30, left: "-100px" }}
          >
            ‹
          </button>

          {/* Right arrow - vertically centered on the cards area */}
          <button
            aria-label="Next page"
            onClick={handleNext}
            className="hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white border border-gray-300 shadow-md
                       absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hover:bg-gray-50 focus:outline-none"
            style={{ zIndex: 30, right: "-100px" }}
          >
            ›
          </button>
        </div>

        {/* Dots centered under the cards */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                page === index ? "w-8 bg-[#00729B]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogContact;
