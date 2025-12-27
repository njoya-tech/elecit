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
      className="max-w-[1200px] mx-auto cursor-pointer px-4 sm:px-6 lg:px-8" 
    >
      {/* Horizontal Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* LEFT SIDE: Featured Image */}
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE: Post Details */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={featuredPost.author.avatar}
                alt={featuredPost.author.name}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-xs sm:text-sm text-gray-900">
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
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          {/* Category Badge */}
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
            {featuredPost.category}
          </p>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {featuredPost.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-7 md:mb-8">
            {featuredPost.excerpt}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-4 sm:mb-5 md:mb-6"></div>

          {/* Engagement Metrics & Like */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsShareModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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