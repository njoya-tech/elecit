import React, { useState, useRef, useEffect } from "react";
import { MY_COLORS } from "../../constants/colors";

const BlogDetail = ({ postId, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const menuRef = useRef(null);

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

  // Sample blog post data (will come from Directus later)
  const post = {
    id: postId,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
    author: {
      name: "Therese Egoutou",
      avatar: "https://i.pravatar.cc/150?img=1",
      date: "19 nov.",
      readTime: "1 min de lecture",
    },
    category: "Tool box meeting",
    title: "Le bâtiment qui s'adapte à vous",
    content: `
      <h2>Une conception intelligente dès la base</h2>
      <p>Tout projet commence par une idée, mais c'est la <strong>conception</strong> qui transforme cette idée en solution réelle. Grâce à la <strong>Conception Assistée par Ordinateur (CAO)</strong>, nous modélisons les pièces et structures avec une précision millimétrique. Cette étape permet :</p>
      <ul>
        <li>d'anticiper les contraintes mécaniques,</li>
        <li>d'optimiser les formes et épaisseurs,</li>
        <li>de réduire les pertes de matière,</li>
        <li>et d'assurer la conformité avant même la fabrication.</li>
      </ul>
      <p>Nous gagnons ainsi en <strong>efficacité</strong>, en <strong>coût</strong> et en <strong>qualité globale</strong>.</p>
      
      <h2>Comment nous façonnons des infrastructures durables</h2>
      <p>Le métal, matériau millénaire, est l'un des piliers majeurs de l'évolution humaine. Des premiers outils artisanaux jusqu'aux structures industrielles modernes, il accompagne chaque étape du progrès. Mais aujourd'hui, les enjeux ont évolué : face aux défis environnementaux, à l'exigence de durabilité et à la recherche constante de performance, le travail du métal ne peut plus se limiter à la simple fabrication. Il doit s'adapter, s'optimiser et innover.</p>
      <p>Chez <strong>ElecIT ENGINEERING</strong>, nous faisons du métal bien plus qu'une matière première : nous en faisons une <strong>solution d'ingénierie durable</strong>, pensée pour durer.</p>
    `,
    views: 4,
    comments: 0,
  };

  // Categories for top navigation
  const mainCategories = [
    "Tous les postes",
    "Smart spaces",
    "Atelier d'Ingéniosité",
    "More Than Track",
  ];

  const dropdownCategories = [
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
    // Go back to blog list with selected category
    onBack(category);
  };

  return (
    <section className="w-full bg-white">
      {/* TOP CATEGORY NAVIGATION */}
      <nav className="flex items-center justify-center gap-8 py-6 flex-wrap border-b border-gray-200">
        {/* Main Categories */}
        {mainCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="text-base font-medium text-black transition-colors duration-300"
            style={{
              color:
                post.category === category ? MY_COLORS.secondaryGreen : "#000",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = MY_COLORS.secondaryGreen;
            }}
            onMouseLeave={(e) => {
              if (post.category !== category) {
                e.currentTarget.style.color = "#000";
              }
            }}
          >
            {category}
          </button>
        ))}

        {/* Plus Dropdown */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-base font-medium transition-colors duration-300"
            style={{ color: MY_COLORS.secondaryGreen }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
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
                    handleCategoryClick(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    post.category === category
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    color:
                      post.category === category
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

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* AUTHOR INFO & META */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p
                className="font-bold text-sm"
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

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
          {post.title}
        </h1>

        {/* FEATURED IMAGE */}
        <div className="w-full mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* BLOG CONTENT */}
        <article className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* ADDITIONAL IMAGE (if any) */}
        <div className="w-full mb-12">
          <img
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200"
            alt="Interior design"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* CATEGORY TAG */}
        <div className="mb-8">
          <a
            href="#"
            className="inline-block text-sm font-medium text-black underline hover:text-gray-600"
          >
            {post.category}
          </a>
        </div>

        {/* SOCIAL SHARE BUTTONS */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {/* Facebook */}
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>

          {/* Twitter/X */}
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </button>

          {/* LinkedIn */}
          <button className="text-gray-600 hover:text-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>

          {/* Copy Link */}
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>
        </div>

        {/* ENGAGEMENT METRICS & LIKE */}
        <div className="flex items-center justify-between mb-12 pb-12 border-b border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{post.views} vues</span>
            <span>{post.comments} commentaire</span>
          </div>

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 transition-all duration-300 ${
              isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill={isLiked ? "currentColor" : "none"}
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

        {/* COMMENTS SECTION */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-black mb-6">Commentaires</h3>

          <div className="border-t border-gray-200 pt-6">
            {/* Comment Input Box */}
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Rédigez un commentaire..."
                className="w-full min-h-[80px] outline-none resize-none text-gray-700 text-base"
              />

              {/* Comment Toolbar */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                {/* Left Side: Icons */}
                <div className="flex items-center gap-3">
                  {/* Emoji Icon */}
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  {/* Image Upload Icon */}
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  {/* GIF Icon */}
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
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
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                      />
                    </svg>
                  </button>

                  {/* Video Icon */}
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Cancel/Annuler Link */}
                  <button
                    onClick={() => setComment("")}
                    className="text-sm font-medium hover:underline"
                    style={{ color: MY_COLORS.secondaryGreen }}
                  >
                    Annuler
                  </button>

                  {/* Publish/Publier Button */}
                  <button
                    onClick={() => {
                      // Handle comment submission
                      console.log("Comment:", comment);
                      setComment("");
                    }}
                    disabled={!comment.trim()}
                    className="px-6 py-2 rounded-md font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                    style={{
                      backgroundColor: comment.trim()
                        ? MY_COLORS.secondaryGreen
                        : "#9ca3af",
                    }}
                  >
                    Publier
                  </button>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-sm text-gray-600">
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: MY_COLORS.secondaryGreen }}
              >
                Se connecter
              </a>{" "}
              pour publier en tant que membre
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={() => setIsShareModalOpen(false)} // Click backdrop to close
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-[fadeIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            {/* Close Button */}
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Partager ce post
            </h3>

            {/* Social Media Icons Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Facebook */}
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Facebook
                </span>
              </button>

              {/* Twitter */}
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Twitter
                </span>
              </button>

              {/* LinkedIn */}
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  LinkedIn
                </span>
              </button>

              {/* WhatsApp */}
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  WhatsApp
                </span>
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Ou copier le lien
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Lien copié !");
                  }}
                  className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                >
                  Copier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD TAILWIND PROSE STYLES */}
      <style jsx>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #000;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: #374151;
        }
        .prose strong {
          font-weight: 700;
          color: #000;
        }
        .prose ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
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
      `}</style>
    </section>
  );
};

export default BlogDetail;
