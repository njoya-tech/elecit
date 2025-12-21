import React from 'react';
import { MY_COLORS } from '../../constants/colors';

const CategorySidebar = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <aside className="w-full lg:w-80 bg-white rounded-lg p-6">
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left px-4 py-3 text-base font-bold transition-all duration-300 rounded-lg ${
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
      </nav>
    </aside>
  );
};

export default CategorySidebar;