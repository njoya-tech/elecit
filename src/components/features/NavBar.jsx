import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';
import { MY_COLORS } from '../../utils/colors';

const NavBar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { key: 'nav.accueil', path: '/' },
    { key: 'nav.entreprise', path: '/entreprise' },
    { key: 'nav.solutions', path: '/solutions' },
    { key: 'nav.projets', path: '/projets' },
    { key: 'nav.filiales', path: '/filiales' },
    { key: 'nav.blog', path: '/blog' },
    { key: 'nav.carriere', path: '/carriere' },
    { key: 'nav.contacts', path: '/contacts' }
  ];

  return (
    <nav className="shadow-sm p-3" style={{background: MY_COLORS.white}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo centré sur mobile, à gauche sur desktop */}
          <div className="hidden md:flex flex-shrink-0 mx-auto md:mx-0">
            <img src={logo} alt="ElecIT Engineering Logo" className="h-20 w-auto" />
          </div>

          {/* Navigation Desktop - cachée sur mobile */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <a 
                  key={item.key}
                  href={item.path}
                  className="font-semibold transition-colors duration-200 text-sm lg:text-base font-montserrat"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    color: hoveredIndex === index ? MY_COLORS.green : MY_COLORS.black,
                    transition: 'color 0.2s'
                  }}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>


      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-start px-4 pt-3">
            <img src={logo} alt="ElecIT Engineering Logo" className="h-12 w-auto" />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <a 
                key={item.key}
                href={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;