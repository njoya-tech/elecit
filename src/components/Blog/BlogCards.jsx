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
// Add initialCategory as dependency


  // Sample blog posts data (will come from Directus later)
  const [post] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Tool box meeting",
      title: "Le bâtiment qui s'adapte à vous",
      excerpt:
        "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 2,
      comments: 0,
      liked: false,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Sécurité avancée",
      title: "Du métal brut à l'innovation",
      excerpt:
        "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 0,
      comments: 0,
      liked: false,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
      author: {
        name: "Therese Egoutou",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "19 nov.",
      },
      category: "Vie d'entreprise",
      title: "Le bâtiment qui s'adapte à vous",
      excerpt:
        "Tout projet commence par une idée, mais c'est la conception qui transforme cett...",
      views: 0,
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
    <section className="w-full py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* BLOCK 1: Category Navigation Tabs */}
        <nav className="flex items-center justify-center gap-8 mb-12 flex-wrap">
          {/* Main Categories */}
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                activeCategory === category
                  ? "text-green-600"
                  : "text-black hover:text-gray-600"
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

          {/* Plus Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-base md:text-lg font-bold hover:text-gray-600 transition-colors"
              style={{ color: MY_COLORS.secondaryGreen }}
            >
              <span>Plus</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
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

        {/* BLOCK 2 & 3: Show Featured Post OR Blog Cards Grid based on category */}
        {activeCategory !== "Tous les postes" ? (
          // FEATURED POST VIEW for specific categories
          <div className="mb-12">
            {/* Featured Post Component */}
            <div
              onClick={() => onPostClick && onPostClick(1)}
              className="max-w-[1200px] mx-auto cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* LEFT: Image */}
                <div className="relative h-[300px] lg:h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                    alt="Featured post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT: Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/150?img=1"
                        alt="Author"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          Therese Egoutou
                        </p>
                        <p className="text-xs text-gray-500">17 nov.</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 
                        2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    {activeCategory}
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    Le bâtiment qui s'adapte à vous
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed mb-8">
                    Tout projet commence par une idée, mais c'est la conception
                    qui transforme cette idée en solution réelle.
                  </p>

                  <div className="border-t border-gray-200 mb-6"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>2 vues</span>
                      <span>0 commentaire</span>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 
                         0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // BLOG CARDS GRID for "Tous les postes"
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onPostClick && onPostClick(post.id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Featured Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.author.date}
                        </p>
                      </div>
                    </div>

                    {/* Three-dot menu */}
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 
                      0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Category Badge */}
                  <p className="text-xs text-gray-500 mb-2">{post.category}</p>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Engagement Metrics */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      {/* Views */}
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          className="w-5 h-5"
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
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 
                          7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-sm">{post.views}</span>
                      </div>

                      {/* Comments */}
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 
                          9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 
                          3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      className={`transition-colors duration-300 ${
                        post.liked
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
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

        {/* BLOCK 4: Pagination - Only show for "Tous les postes" */}
        {activeCategory === "Tous les postes" && (
          <div className="flex items-center justify-center gap-4 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="w-6 h-6"
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

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] h-10 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? "font-bold text-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    style={{
                      color:
                        currentPage === page
                          ? MY_COLORS.secondaryGreen
                          : undefined,
                      fontWeight: currentPage === page ? "bold" : "normal",
                    }}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <svg
                className="w-6 h-6"
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
