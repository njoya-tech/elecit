/* eslint-disable no-unsafe-finally */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MY_COLORS } from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import {
  fetchAllPosts,
  fetchFeaturedPost,
  getAssetUrl,
  getTranslation,
} from "../../../src/services/blog.js";

const BlogCards = ({ onPostClick, initialCategory }) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    onPostClick(post.id);
  };

  // Category key mapping (internal logic stays in French keys)
  const categoryKeys = {
    "Tous les postes": "all",
    "Smart spaces": "smartSpaces",
    "Atelier d'Ingéniosité": "workshop",
    "More Than Track": "moreThanTrack",
    "Sécurité avancée": "advancedSecurity",
    "Tool box meeting": "toolBoxMeeting",
    "Vie d'entreprise": "companyLife",
  };

  // Get translated category labels
  const categoryLabels = useMemo(
    () => ({
      "Tous les postes": t("blogPage.categories.all"),
      "Smart spaces": t("blogPage.categories.smartSpaces"),
      "Atelier d'Ingéniosité": t("blogPage.categories.workshop"),
      "More Than Track": t("blogPage.categories.moreThanTrack"),
      "Sécurité avancée": t("blogPage.categories.advancedSecurity"),
      "Tool box meeting": t("blogPage.categories.toolBoxMeeting"),
      "Vie d'entreprise": t("blogPage.categories.companyLife"),
    }),
    [t]
  );

  // Internal categories (stay the same for logic)
  const mainCategoriesKeys = [
    "Tous les postes",
    "Smart spaces",
    "Atelier d'Ingéniosité",
    "More Than Track",
  ];

  const dropdownCategoriesKeys = [
    "Sécurité avancée",
    "Tool box meeting",
    "Vie d'entreprise",
  ];

  const [activeCategory, setActiveCategory] = useState(
    initialCategory || "Tous les postes"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

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

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
    });
  };

  // Fetch posts from Directus
  useEffect(() => {
    let isActive = true;
    const loadPosts = async () => {
      console.log("Current i18n language:", i18n.language);

      try {
        setLoading(true);
        setError(null);

        // Fetch posts based on active category
        const directusPosts = await fetchAllPosts({
          category: activeCategory,
          limit: 100,
        });

        console.log("First post from Directus:", directusPosts[0]);
        if (directusPosts[0]?.translations) {
          console.log("Translations array:", directusPosts[0].translations);
        }

        // Transform Directus data to match component structure
        // IMPORTANT: We call getTranslation() ONCE per post to get the entire translated post
        // Then we extract the fields we need from that translated version
        const transformedPosts = directusPosts.map((post) => {
          console.log("Calling getTranslation with language:", i18n.language);

          // Step 1: Get the translated version of the entire post based on current language
          // This function looks at post.translations array and finds a match for i18n.language
          // If it finds one, it returns a new post object with title, excerpt, and content replaced
          // If no translation exists for this language, it just returns the original post unchanged
          const translatedPost = getTranslation(post, i18n.language);
          // ADD THIS TO SEE WHAT CAME BACK
          console.log("Original title:", post.title);
          console.log("Translated title:", translatedPost.title);
          console.log(
            "Are they different?",
            post.title !== translatedPost.title
          );

          // Step 2: Now build our display object using the translated post
          // At this point, translatedPost.title is already in the correct language
          // Same with translatedPost.excerpt and translatedPost.content
          return {
            id: translatedPost.id,
            title: translatedPost.title, // Already translated if translation exists
            excerpt: translatedPost.excerpt, // Already translated if translation exists
            category: translatedPost.category?.name || "",
            image: getAssetUrl(translatedPost.cover_image),
            views: translatedPost.views || 0,
            comments: translatedPost.comments_count || 0,
            liked: false,
            author: {
              name: translatedPost.author?.full_name || "Unknown Author",
              avatar:
                getAssetUrl(translatedPost.author?.avatar) ||
                "https://i.pravatar.cc/150?img=1",
              date: formatDate(translatedPost.created_at),
            },
          };
        });

        setPosts(transformedPosts);

        // Fetch featured post for category views
        if (activeCategory !== "Tous les postes") {
          const featured = await fetchFeaturedPost(activeCategory);
          if (!isActive) return;

          if (featured) {
            // Same pattern here: translate the entire featured post first
            // then extract the fields we need from the translated version
            const translatedFeatured = getTranslation(featured, i18n.language);

            setFeaturedPost({
              id: translatedFeatured.id,
              title: translatedFeatured.title, // Already translated
              excerpt: translatedFeatured.excerpt, // Already translated
              image: getAssetUrl(translatedFeatured.cover_image),
              views: translatedFeatured.views || 0,
              comments: translatedFeatured.comments_count || 0,
              authorName:
                translatedFeatured.author?.full_name || "Unknown Author",
              avatar:
                getAssetUrl(translatedFeatured.author?.avatar) ||
                "https://i.pravatar.cc/150?img=1",
              date: formatDate(translatedFeatured.created_at),
            });
          } else if (transformedPosts.length > 0) {
            // Fallback to first post if no featured post
            // Note: transformedPosts are already translated, so we can use them directly
            const firstPost = transformedPosts[0];
            setFeaturedPost({
              id: firstPost.id,
              title: firstPost.title,
              excerpt: firstPost.excerpt,
              image: firstPost.image,
              views: firstPost.views,
              comments: firstPost.comments,
              authorName: firstPost.author.name,
              avatar: firstPost.author.avatar,
              date: firstPost.author.date,
            });
          }
        }
      } catch (err) {
        if (!isActive) return;
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    loadPosts();
    return () => {
      isActive = false;
    };
  }, [activeCategory, i18n.language]);

  // ------------------- PAGINATION LOGIC -------------------
  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: MY_COLORS.secondaryGreen }}
            ></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: MY_COLORS.secondaryGreen }}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!loading && posts.length === 0) {
    return (
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No posts available in this category.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* BLOCK 1: Category Navigation */}
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <nav className="flex items-center justify-start lg:justify-center gap-4 md:gap-6 lg:gap-8 pb-3 overflow-x-auto lg:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-300 lg:scrollbar-hide px-3 lg:px-0">
            {/* Main Categories */}
            {mainCategoriesKeys.map((categoryKey) => (
              <button
                key={categoryKey}
                onClick={() => handleCategoryChange(categoryKey)}
                className={`text-sm sm:text-base md:text-lg font-bold px-2 sm:px-3 py-2 whitespace-nowrap transition-colors duration-300 -shrink-0 ${
                  activeCategory === categoryKey
                    ? "text-green-600"
                    : "text-black hover:text-gray-600"
                }`}
                style={{
                  color:
                    activeCategory === categoryKey
                      ? MY_COLORS.secondaryGreen
                      : "#000",
                }}
              >
                {categoryLabels[categoryKey]}
              </button>
            ))}

            {/* Plus Dropdown */}
            <div className="relative -shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-bold px-3 py-2 hover:text-gray-600 transition-colors whitespace-nowrap"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                <span>{t("blogPage.categories.more")}</span>
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

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="fixed lg:absolute bottom-60 lg:top-full right-4 lg:right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100] lg:z-50">
                  {dropdownCategoriesKeys.map((categoryKey) => (
                    <button
                      key={categoryKey}
                      onClick={() => handleCategoryChange(categoryKey)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeCategory === categoryKey
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                      style={{
                        color:
                          activeCategory === categoryKey
                            ? MY_COLORS.secondaryGreen
                            : "#000",
                      }}
                    >
                      {categoryLabels[categoryKey]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* BLOCK 2 & 3: Show Featured Post OR Blog Cards Grid */}
        {activeCategory !== "Tous les postes" && featuredPost ? (
          // FEATURED POST VIEW
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div
              onClick={() => onPostClick && onPostClick(featuredPost.id)}
              className="max-w-[1200px] mx-auto cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 sm:h-[280px] md:h-[300px] lg:h-[400px]">
                  <img
                    src={
                      featuredPost.image ||
                      "https://via.placeholder.com/800x400"
                    }
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <img
                        src={featuredPost.avatar}
                        alt={featuredPost.authorName}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover -shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          {featuredPost.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {featuredPost.date}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600 -shrink-0 ml-2"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
                    {categoryLabels[activeCategory]}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                    {featuredPost.excerpt}
                  </p>

                  <div className="border-t border-gray-200 mb-4 sm:mb-6"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span>
                        {featuredPost.views}{" "}
                        {featuredPost.views === 1
                          ? t("blogPage.cards.view")
                          : t("blogPage.cards.views")}
                      </span>
                      <span>
                        {featuredPost.comments}{" "}
                        {featuredPost.comments === 1
                          ? t("blogPage.cards.comment")
                          : t("blogPage.cards.comments")}
                      </span>
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
          // BLOG CARDS GRID
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col select-none"
              >
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden shrink-0">
                  <img
                    src={post.image || "https://via.placeholder.com/500x400"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.author.date}
                        </p>
                      </div>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2 p-1">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mb-2">
                    {categoryLabels[post.category]}
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 flex-1 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-none">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3 sm:gap-4">
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

                    <button
                      className={`transition-colors duration-300 shrink-0 ${
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

        {/* BLOCK 4: Pagination */}
        {activeCategory === "Tous les postes" && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-10 sm:mt-12 px-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-1.5 sm:p-2 min-w-10 h-10 rounded-lg transition-all duration-300 shrink-0 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={t("blogPage.cards.previous")}
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

            <div
              className="flex items-center gap-1 sm:gap-2 overflow-x-auto 
            pb-1 scrollbar-hide flex-1 max-w-full"
            >
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="min-w-9 h-10 px-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base text-gray-600 hover:bg-gray-100 font-medium shrink-0"
                    style={{ color: "#000" }}
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-1.5 text-gray-400 text-xs sm:text-sm shrink-0">
                      ...
                    </span>
                  )}
                </>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(
                  2,
                  Math.min(totalPages - 1, currentPage + (i - 2))
                );
                return pageNum;
              })
                .filter((page, idx, arr) => arr.indexOf(page) === idx)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-9 h-10 px-2.5 rounded-lg transition-all duration-300 shrink-0 ${
                      currentPage === page
                        ? "font-bold text-lg shadow-md bg-green-50 border-2 border-green-200"
                        : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
                    }`}
                    style={{
                      color:
                        currentPage === page
                          ? MY_COLORS.secondaryGreen
                          : "#000",
                    }}
                  >
                    {page}
                  </button>
                ))}

              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-1.5 text-gray-400 text-xs sm:text-sm shrink-0">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="min-w-9 h-10 px-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base text-gray-600 hover:bg-gray-100 font-medium shrink-0"
                    style={{ color: "#000" }}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className={`p-1.5 sm:p-2 min-w-10 h-10 rounded-lg transition-all duration-300 shrink-0 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={t("blogPage.cards.next")}
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
