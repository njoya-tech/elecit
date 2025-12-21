import React, { useState, useRef, useEffect } from 'react';
import { MY_COLORS } from '../../constants/colors';

// DROPDOWN COMPONENT for "Plus" button
export const CategoryDropdown = ({ categories, onCategorySelect, activeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-base md:text-lg font-bold transition-colors hover:opacity-80"
        style={{ color: MY_COLORS.secondaryGreen }}
      >
        <span>Plus</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategorySelect(category);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-green-50'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                color: activeCategory === category ? MY_COLORS.secondaryGreen : '#000',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// SIDEBAR COMPONENT for category list (like in Image 3)
export const CategorySidebar = ({ categories, onCategorySelect, activeCategory }) => {
  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
      
      <nav className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-green-50 shadow-sm'
                : 'hover:bg-gray-50'
            }`}
            style={{
              color: activeCategory === category ? MY_COLORS.secondaryGreen : '#000',
            }}
          >
            {category}
          </button>
        ))}
      </nav>
    </aside>
  );
};

// EXAMPLE USAGE IN BlogCards.jsx
export const BlogCardsWithDropdown = () => {
  const [activeCategory, setActiveCategory] = useState('Tous les postes');

  // All categories including hidden ones
  const mainCategories = [
    'Tous les postes',
    'Smart spaces',
    "Atelier d'Ingéniosité",
    'More Than Track',
  ];

  const dropdownCategories = [
    'Sécurité avancée',
    'Tool box meeting',
    "Vie d'entreprise",
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* CATEGORY NAVIGATION */}
        <nav className="flex items-center justify-center gap-8 mb-12 flex-wrap">
          {/* Main Categories */}
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-base md:text-lg font-bold transition-colors duration-300 ${
                activeCategory === category
                  ? 'text-green-600'
                  : 'text-black hover:text-gray-600'
              }`}
              style={{
                color: activeCategory === category ? MY_COLORS.secondaryGreen : '#000',
              }}
            >
              {category}
            </button>
          ))}
          
          {/* Dropdown for Additional Categories */}
          <CategoryDropdown
            categories={dropdownCategories}
            onCategorySelect={setActiveCategory}
            activeCategory={activeCategory}
          />
        </nav>

        {/* Main Content Area */}
        <div className="flex-1">
          <p className="text-center text-gray-500 py-20">
            Content for: <strong>{activeCategory}</strong>
          </p>
        </div>

      </div>
    </section>
  );
};