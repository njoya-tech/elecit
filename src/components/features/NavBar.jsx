import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';
import { MY_COLORS } from '../../utils/colors';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const NavBar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const dropdownRef = useRef(null);

  const solutionsItems = [
    { key: 'submenus.solutions.smartBuilding', path: '/solutions/smart-building' },
    { key: 'submenus.solutions.mechanicalFabrication', path: '/solutions/fabrication-mecanique' },
    { key: 'submenus.solutions.gpsTracking', path: '/solutions/gps-tracking' },
    { key: 'submenus.solutions.itDataProcessing', path: '/solutions/it-data-processing' },
    { key: 'submenus.solutions.accessControlSecurity', path: '/solutions/controle-acces-securite' },
    { key: 'submenus.solutions.designOffice', path: '/solutions/bureau-etude' },
    { key: 'submenus.solutions.afterSalesService', path: '/solutions/sav' }
  ];

  const subsidiariesItems = [
    { key: 'submenus.subsidiaries.foczou', path: '/filiales/foczou' },
    { key: 'submenus.subsidiaries.mangoSmart', path: '/filiales/mango-smart' },
    { key: 'submenus.subsidiaries.moreThanTrack', path: '/filiales/more-than-track' }
  ];

  const navItems = [
    { key: 'nav.accueil', path: '/' },
    { key: 'nav.entreprise', path: '/entreprise' },
    { key: 'nav.solutions', path: '/solutions', dropdown: solutionsItems },
    { key: 'nav.projets', path: '/projets' },
    { key: 'nav.filiales', path: '/filiales', dropdown: subsidiariesItems },
    { key: 'nav.blog', path: '/blog' },
    { key: 'nav.carriere', path: '/carriere' },
    { key: 'nav.contacts', path: '/contacts' }
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setHoveredIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <LanguageSwitcher />

      <nav className="shadow-sm p-2 sm:p-3" style={{ background: MY_COLORS.white }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="ElecIT Engineering Logo" 
                className="h-12 w-auto sm:h-16 md:h-20" 
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 ml-6 xl:ml-10">
              <div className="flex items-center gap-3 xl:gap-6" ref={dropdownRef}>
                
                {navItems.map((item, index) => (
                  <div key={item.key} className="relative">
                    
                    {/* Items with dropdown */}
                    {item.dropdown ? (
                      <div
                        onMouseEnter={() => {
                          setHoveredIndex(index);
                          setOpenDropdown(item.key);
                        }}
                        onMouseLeave={() => {
                          setHoveredIndex(null);
                          setOpenDropdown(null);
                        }}
                      >
                        <button
                          className="font-semibold text-xs lg:text-sm xl:text-base font-montserrat flex items-center gap-1"
                          style={{
                            color: hoveredIndex === index || openDropdown === item.key ? MY_COLORS.green : MY_COLORS.black
                          }}
                        >
                          {t(item.key)}
                          <svg
                            className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {openDropdown === item.key && (
                          <div className="absolute top-full left-0 mt-2 w-56 xl:w-64 bg-white rounded-md shadow-lg py-2 z-50 border">
                            {item.dropdown.map(sub => (
                              <a
                                key={sub.key}
                                href={sub.path}
                                className="block px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-50 font-montserrat"
                                onMouseEnter={(e) => e.target.style.color = MY_COLORS.green}
                                onMouseLeave={(e) => e.target.style.color = MY_COLORS.black}
                              >
                                {t(sub.key)}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.path}
                        className="font-semibold text-xs lg:text-sm xl:text-base font-montserrat"
                        style={{
                          color: hoveredIndex === index ? MY_COLORS.green : MY_COLORS.black
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {t(item.key)}
                      </a>
                    )}

                  </div>
                ))}

              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">

              {navItems.map(item => (
                <div key={item.key}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.key)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {t(item.key)}
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileDropdowns[item.key] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {mobileDropdowns[item.key] && (
                        <div className="pl-4 bg-gray-50 rounded-md mt-1 py-1 space-y-1">
                          {item.dropdown.map(sub => (
                            <a
                              key={sub.key}
                              href={sub.path}
                              className="block px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-white"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {t(sub.key)}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.key)}
                    </a>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}

      </nav>
    </>
  );
};

export default NavBar;