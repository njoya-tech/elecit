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
      className="max-w-[1200px] mx-auto cursor-pointer" 
    >
      {/* Horizontal Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* LEFT SIDE: Featured Image */}
        <div className="relative h-[300px] lg:h-[400px]">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE: Post Details */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Author Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={featuredPost.author.avatar}
                alt={featuredPost.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm text-gray-900">
                  {featuredPost.author.name}
                </p>
                <p className="text-xs text-gray-500">
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
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>

          {/* Category Badge */}
          <p className="text-sm text-gray-600 mb-4 font-medium">
            {featuredPost.category}
          </p>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {featuredPost.title}
          </h2>

          {/* Excerpt */}
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            {featuredPost.excerpt}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6"></div>

          {/* Engagement Metrics & Like */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setIsShareModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
