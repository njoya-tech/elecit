/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from "../../constants/colors";

const BlogDetail = ({ postId, onBack }) => {
  const { t } = useTranslation();
  
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const menuRef = useRef(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get post data from translations
  const postsData = t('blogPage.posts', { returnObjects: true });
  const postData = Array.isArray(postsData) ? postsData.find(p => p.id === postId) : null;

  // Sample blog post data (will come from Directus later)
  const post = postData ? {
    id: postId,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    author: {
      name: postData.author.name,
      avatar: "https://i.pravatar.cc/150?img=1",
      date: postData.author.date,
      readTime: `1 ${t('blogPage.detail.readTime')}`,
    },
    category: postData.category,
    title: postData.title,
    content: postData.content ? `
      <h2>${postData.content.heading1}</h2>
      <p>${postData.content.paragraph1}</p>
      <p>${postData.content.listIntro}</p>
      <ul>
        ${postData.content.listItems.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p>${postData.content.paragraph2}</p>
      
      <h2>${postData.content.heading2}</h2>
      <p>${postData.content.paragraph3}</p>
      <p>${postData.content.paragraph4}</p>
    ` : '',
    views: 4,
    comments: 0,
  } : null;

  if (!post) {
    return <div className="text-center py-12">Post not found</div>;
  }

  // Categories for top navigation
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    onBack(category);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <section className="w-full bg-white min-h-screen">
      {/* TOP CATEGORY NAVIGATION - Responsive */}
      <nav className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 py-4 sm:py-6 px-4 sm:px-0 border-b border-gray-200 overflow-x-auto sm:overflow-visible scrollbar-thin scrollbar-thumb-gray-300 sm:scrollbar-hide">
        {/* Main Categories */}
        {mainCategoriesKeys.map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => handleCategoryClick(categoryKey)}
            className="text-sm sm:text-base md:text-lg font-medium px-2 sm:px-3 py-2 whitespace-nowrap transition-colors duration-300 shrink-0"
            style={{
              color:
                post.category === categoryKey ? MY_COLORS.secondaryGreen : "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = MY_COLORS.secondaryGreen;
            }}
            onMouseLeave={(e) => {
              if (post.category !== categoryKey) {
                e.currentTarget.style.color = "#000";
              }
            }}
          >
            {categoryLabels[categoryKey]}
          </button>
        ))}

        {/* Plus Dropdown */}
        <div className="relative shrink-0" ref={categoryDropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-lg font-medium px-3 py-2 transition-colors duration-300 whitespace-nowrap"
            style={{ color: MY_COLORS.secondaryGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <span>{t('blogPage.categories.more')}</span>
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
            <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-40">
              {dropdownCategoriesKeys.map((categoryKey) => (
                <button
                  key={categoryKey}
                  onClick={() => {
                    handleCategoryClick(categoryKey);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    post.category === categoryKey
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    color:
                      post.category === categoryKey
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

      {/* MAIN CONTENT CONTAINER - Responsive */}
      <div className="max-w-[900px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        {/* AUTHOR INFO & META - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p
                className="font-bold text-xs sm:text-sm truncate"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                {post.author.name}
              </p>
              <p className="text-xs text-gray-600">
                {post.author.date} · {post.author.readTime}
              </p>
            </div>
          </div>

          {/* Three-dot menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-0"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setIsShareModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('blogPage.detail.share')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TITLE - Responsive typography */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
          {post.title}
        </h1>

        {/* FEATURED IMAGE - Responsive */}
        <div className="w-full mb-8 sm:mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* BLOG CONTENT - Responsive prose */}
        <article className="prose prose-lg sm:prose-xl max-w-none mb-8 sm:mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* ADDITIONAL IMAGE */}
        <div className="w-full mb-6 sm:mb-8">
          <img
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200"
            alt="Interior design"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* CATEGORY TAG */}
        <div className="mb-6 sm:mb-8">
          <a
            href="#"
            className="inline-block text-sm font-medium text-black underline hover:text-gray-600"
          >
            {categoryLabels[post.category]}
          </a>
        </div>

        {/* SOCIAL SHARE BUTTONS - Responsive */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
          {/* Facebook */}
          <button className="text-gray-600 hover:text-blue-600 transition-colors p-2" aria-label={t('blogPage.detail.shareModal.facebook')}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>

          {/* Twitter/X */}
          <button className="text-gray-600 hover:text-gray-900 transition-colors p-2" aria-label={t('blogPage.detail.shareModal.twitter')}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </button>

          {/* LinkedIn */}
          <button className="text-gray-600 hover:text-blue-700 transition-colors p-2" aria-label={t('blogPage.detail.shareModal.linkedin')}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>

          {/* Copy Link */}
          <button onClick={handleCopyLink} className="text-gray-600 hover:text-gray-900 transition-colors p-2" aria-label={t('blogPage.detail.shareModal.copyLink')}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>

        {/* ENGAGEMENT METRICS & LIKE - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-gray-200 gap-4 sm:gap-0">
          <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <span>
              {post.views} {post.views === 1 ? t('blogPage.cards.view') : t('blogPage.cards.views')}
            </span>
            <span>
              {post.comments} {post.comments === 1 ? t('blogPage.cards.comment') : t('blogPage.cards.comments')}
            </span>
          </div>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 transition-all duration-300 p-2 sm:p-0 ${
              isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* COMMENTS SECTION - Responsive */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
            {t('blogPage.detail.commentsTitle')}
          </h3>

          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            {/* Comment Input Box */}
            <div className="border border-gray-300 rounded-lg p-3 sm:p-4 mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('blogPage.detail.commentPlaceholder')}
                className="w-full min-h-20 outline-none resize-none text-gray-700 text-sm sm:text-base px-3 py-2"
              />

              {/* Comment Toolbar - Responsive */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-3 pt-3 border-t border-gray-200 gap-3 sm:gap-0">
                {/* Left Side: Icons */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-2" aria-label="Add emoji">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-2" aria-label="Upload image">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>

                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-2" aria-label="Add GIF">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </button>

                  <button className="text-gray-500 hover:text-gray-700 transition-colors p-2" aria-label="Upload video">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex items-center justify-end gap-3 sm:gap-4">
                  <button
                    onClick={() => setComment("")}
                    className="text-sm font-medium hover:underline whitespace-nowrap"
                    style={{ color: MY_COLORS.secondaryGreen }}
                  >
                    {t('blogPage.detail.cancel')}
                  </button>

                  <button
                    onClick={() => {
                      console.log("Comment:", comment);
                      setComment("");
                    }}
                    disabled={!comment.trim()}
                    className="px-4 sm:px-6 py-2 rounded-md font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: comment.trim()
                        ? MY_COLORS.secondaryGreen
                        : "#9ca3af",
                    }}
                  >
                    {t('blogPage.detail.publish')}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                {t('blogPage.detail.login')}
              </a>{" "}
              {t('blogPage.detail.loginPrompt')}
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL - Fully Responsive */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-4 sm:mx-auto p-6 sm:p-8 relative animate-[fadeIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('blogPage.detail.shareModal.title')}
            </h3>

            {/* Social Media Icons Grid - Responsive */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Facebook */}
              <button className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {t('blogPage.detail.shareModal.facebook')}
                </span>
              </button>

              {/* Twitter */}
              <button className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {t('blogPage.detail.shareModal.twitter')}
                </span>
              </button>

              {/* LinkedIn */}
              <button className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {t('blogPage.detail.shareModal.linkedin')}
                </span>
              </button>

              {/* WhatsApp */}
              <button className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {t('blogPage.detail.shareModal.whatsapp')}
                </span>
              </button>
            </div>

            {/* Copy Link Section - Responsive */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                {t('blogPage.detail.shareModal.copyLink')}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-600 bg-gray-50 min-h-10"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white transition-colors whitespace-nowrap shrink-0 mt-2 sm:mt-0"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                >
                  {copySuccess ? t('blogPage.detail.shareModal.copied') : t('blogPage.detail.shareModal.copy')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD TAILWIND PROSE STYLES - Responsive */}
      <style jsx>{`
        .prose {
          max-width: none;
        }
        .prose h2 {
          font-size: 1.5rem;
          line-height: 1.4;
        }
        @media (min-width: 640px) {
          .prose h2 {
            font-size: 1.875rem;
          }
        }
        @media (min-width: 1024px) {
          .prose h2 {
            font-size: 2.25rem;
          }
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.6;
          font-size: 1rem;
        }
        @media (min-width: 640px) {
          .prose p {
            font-size: 1.125rem;
            line-height: 1.75;
          }
        }
        .prose strong {
          font-weight: 700;
          color: #000;
        }
        .prose ul {
          list-style-type: disc;
          margin-left: 1.25rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .prose ul {
            margin-left: 1.5rem;
          }
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        @media (min-width: 640px) {
          .prose li {
            line-height: 1.75;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Custom scrollbar for mobile nav */}
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
};

export default BlogDetail;