/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors";

const BlogFeaturedPost = ({ category, onPostClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample featured post for the selected category
  const featuredPost = {
    id: 1,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    author: {
      name: "Therese Egoutou",
      avatar: "https://i.pravatar.cc/150?img=1",
      date: "17 nov.",
    },
    category: category,
    title: "Le bâtiment qui s'adapte à vous",
    excerpt:
      "Tout projet commence par une idée, mais c'est la conception qui transforme cette idée en solution réelle.",
    views: 2,
    comments: 0,
    liked: false,
  };

  return (
    <div
      onClick={() => onPostClick && onPostClick(featuredPost.id)}
      className="w-full cursor-pointer px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12"
    >
      {/* Horizontal Layout Container - Perfect responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-[1200px] mx-auto">
        {/* LEFT SIDE: Featured Image - Responsive heights */}
        <div className="relative h-48 sm:h-[280px] md:h-[320px] lg:h-[380px] xl:h-[450px]">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE: Post Details - Responsive padding */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
          {/* Author Info - Responsive */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <img
                src={featuredPost.author.avatar}
                alt={featuredPost.author.name}
                className="w-8 h-8 sm:w-9 md:w-10 lg:w-11 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                  {featuredPost.author.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {featuredPost.author.date}
                </p>
              </div>
            </div>

            {/* Three-dot menu */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle menu click
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 flex-shrink-0 ml-2"
            >
              <svg className="w-4 h-4 sm:w-5 md:w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          {/* Category Badge */}
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4 font-medium">
            {featuredPost.category}
          </p>

          {/* Title - Responsive typography */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight line-clamp-3 md:line-clamp-2">
            {featuredPost.title}
          </h2>

          {/* Excerpt - Responsive */}
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-7 lg:mb-8 line-clamp-3 sm:line-clamp-4">
            {featuredPost.excerpt}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex-shrink-0"></div>

          {/* Engagement Metrics & Like - Fixed positioning */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 md:pt-4">
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>{featuredPost.views} vues</span>
              <span>{featuredPost.comments} commentaire</span>
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Toggle like state
              }}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Menu Dropdown - Responsive */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors p-1 mt-1 mr-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-40 sm:w-44 md:w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShareModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors block"
                >
                  Partager le post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFeaturedPost;
