import React, { useState, useRef, useEffect, useEffectEvent } from "react";
import { MY_COLORS } from "../../constants/colors";

const BlogCards = ({ onPostClick, initialCategory = "Tous les postes" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Main categories visible in navigation
  const mainCategories = [
    "Tous les postes",
    "Smart spaces",
    "Atelier d'Ingéniosité",
    "More Than Track",
  ];

  // Additional categories in dropdown
  const dropdownCategories = [
    "Sécurité avancée",
    "Tool box meeting",
    "Vie d'entreprise",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryChange = useEffectEvent((category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  });

  useEffect(() => {
    handleCategoryChange(initialCategory);
  }, [initialCategory]);

  // Sample blog posts data (will come from Directus later)
  const [post] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Tool box meeting",
      title: "Le bâtiment qui s'adapte à vous",
      excerpt: "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 2,
      comments: 0,
      liked: false,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Sécurité avancée",
      title: "Du métal brut à l'innovation technologie",
      excerpt: "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 3,
      comments: 0,
      liked: false,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Vie d'entreprise",
      title: "Le bâtiment qui s'adapte à vous",
      excerpt: "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 12,
      comments: 0,
      liked: false,
    },
  ]);

  // ------------------- PAGINATION LOGIC -------------------
  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(post.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = post.slice(startIndex, endIndex);

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
     {/* BLOCK 1: Category Navigation - Scrollable on mobile/tablet, centered on desktop */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <nav className="flex items-center justify-start lg:justify-center gap-4 md:gap-6 lg:gap-8 pb-3 overflow-x-auto lg:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 lg:scrollbar-hide px-3 lg:px-0">
            {/* Main Categories */}
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm sm:text-base md:text-lg font-bold px-2 sm:px-3 py-2 whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${
                  activeCategory === category
                    ? "text-green-600"
                    : "text-black hover:text-gray-600"
                }`}
                style={{
                  color: activeCategory === category ? MY_COLORS.secondaryGreen : "#000",
                }}
              >
                {category}
              </button>
            ))}

            {/* Plus Dropdown */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-bold px-3 py-2 hover:text-gray-600 transition-colors whitespace-nowrap"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                <span>Plus</span>
                <svg
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Fixed positioning on mobile/tablet to prevent scrolling */}
              {isDropdownOpen && (
                <div className="fixed lg:absolute bottom-60
                 lg:top-full right-4 
                 lg:right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl
                  border border-gray-200 py-2 z-[100] lg:z-50">
                  {dropdownCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                      style={{
                        color:
                          activeCategory === category
                            ? MY_COLORS.secondaryGreen
                            : "#000",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
        {/* BLOCK 2 & 3: Show Featured Post OR Blog Cards Grid based on category */}
        {activeCategory !== "Tous les postes" ? (
          // FEATURED POST VIEW for specific categories
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div
              onClick={() => onPostClick && onPostClick(1)}
              className="max-w-[1200px] mx-auto cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* LEFT: Image - Responsive height */}
                <div className="relative h-48 sm:h-[280px] md:h-[300px] lg:h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                    alt="Featured post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT: Details - Responsive padding */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <img
                        src="https://i.pravatar.cc/150?img=1"
                        alt="Author"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          Therese Egoutou
                        </p>
                        <p className="text-xs text-gray-500">17 nov.</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
                    {activeCategory}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    Le bâtiment qui s'adapte à vous
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                    Tout projet commence par une idée, mais c'est la conception
                    qui transforme cette idée en solution réelle.
                  </p>

                  <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span>2 vues</span>
                      <span>0 commentaire</span>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // BLOG CARDS GRID for "Tous les postes" - Responsive heights
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onPostClick && onPostClick(post.id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col"
              >
                {/* Featured Image - Responsive height */}
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content - Flexible height */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  {/* Author Info - Responsive */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">{post.author.date}</p>
                      </div>
                    </div>

                    {/* Three-dot menu */}
                    <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2 p-1">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Category Badge */}
                  <p className="text-xs text-gray-500 mb-2">{post.category}</p>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 flex-1 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-none">
                    {post.excerpt}
                  </p>

                  {/* Engagement Metrics */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Views */}
                      <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{post.views}</span>
                      </div>

                      {/* Comments */}
                      <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      className={`transition-colors duration-300 flex-shrink-0 ${
                        post.liked
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill={post.liked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BLOCK 4: Pagination - Responsive with ellipsis logic */}
        {activeCategory === "Tous les postes" && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-10 sm:mt-12 px-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-1.5 sm:p-2 min-w-[40px] h-10 rounded-lg transition-all duration-300 flex-shrink-0 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Numbers - Smart ellipsis */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1 max-w-full">
              {/* First page + ellipsis */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="min-w-[36px] h-10 px-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base text-gray-600 hover:bg-gray-100 font-medium flex-shrink-0"
                    style={{ color: "#000" }}
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-1.5 text-gray-400 text-xs sm:text-sm flex-shrink-0">...</span>
                  )}
                </>
              )}

              {/* Nearby pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(2, Math.min(totalPages - 1, currentPage + (i - 2)));
                return pageNum;
              })
                .filter((page, idx, arr) => arr.indexOf(page) === idx)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[36px] h-10 px-2.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                      currentPage === page
                        ? "font-bold text-lg shadow-md bg-green-50 border-2 border-green-200"
                        : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
                    }`}
                    style={{
                      color: currentPage === page ? MY_COLORS.secondaryGreen : "#000",
                    }}
                  >
                    {page}
                  </button>
                ))}

              {/* Last page + ellipsis */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-1.5 text-gray-400 text-xs sm:text-sm flex-shrink-0">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="min-w-[36px] h-10 px-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base text-gray-600 hover:bg-gray-100 font-medium flex-shrink-0"
                    style={{ color: "#000" }}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-1.5 sm:p-2 min-w-[40px] h-10 rounded-lg transition-all duration-300 flex-shrink-0 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogCards;
