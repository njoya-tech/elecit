import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { MY_COLORS } from '../../utils/colors';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const NavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileDropdowns({});
    setOpenDropdown(null);
    setHoveredIndex(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setHoveredIndex(null);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const menuButton = document.getElementById('mobile-menu-button');
        if (menuButton && !menuButton.contains(event.target)) {
          setIsMenuOpen(false);
          setMobileDropdowns({});
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null);
    setHoveredIndex(null);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdowns({});
  };

  return (
    <>
      <LanguageSwitcher />

      <nav className="shadow-sm p-2 sm:p-3" style={{ background: MY_COLORS.white }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('/')}>
              <img 
                src={logo} 
                alt="ElecIT Engineering Logo" 
                className="h-10 w-auto sm:h-12 md:h-16 lg:h-20" 
              />
            </div>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 ml-4 xl:ml-10">
              <div className="flex items-center gap-2 xl:gap-6" ref={dropdownRef}>
                
                {navItems.map((item, index) => (
                  <div key={item.key} className="relative">
                    
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
                            color: hoveredIndex === index || openDropdown === item.key ? MY_COLORS.green : MY_COLORS.black,
                            transition: 'color 0.2s',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer'
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
                          <div className="absolute top-full left-0 mt-2 w-52 xl:w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                            {item.dropdown.map(subItem => (
                              <div
                                key={subItem.key}
                                onClick={() => handleNavigation(subItem.path)}
                                className="block px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-montserrat cursor-pointer"
                                onMouseEnter={(e) => e.target.style.color = MY_COLORS.green}
                                onMouseLeave={(e) => e.target.style.color = MY_COLORS.black}
                              >
                                {t(subItem.key)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => handleNavigation(item.path)}
                        className="font-semibold transition-colors duration-200 text-xs lg:text-sm xl:text-base font-montserrat whitespace-nowrap cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                          color: hoveredIndex === index ? MY_COLORS.green : MY_COLORS.black,
                          transition: 'color 0.2s'
                        }}
                      >
                        {t(item.key)}
                      </div>
                    )}

                  </div>
                ))}

              </div>
            </div>

            {/* Navigation Tablet */}
            <div className="hidden md:flex lg:hidden items-center justify-center flex-1 ml-3">
              <div className="flex items-center gap-1.5" ref={dropdownRef}>
                {navItems.map((item, index) => (
                  <div key={item.key} className="relative">
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
                          className="font-semibold text-xs font-montserrat flex items-center gap-1 whitespace-nowrap px-0.5"
                          style={{
                            color: hoveredIndex === index || openDropdown === item.key ? MY_COLORS.green : MY_COLORS.black,
                            transition: 'color 0.2s',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {t(item.key)}
                          <svg
                            className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.key ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openDropdown === item.key && (
                          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                            {item.dropdown.map(subItem => (
                              <div
                                key={subItem.key}
                                onClick={() => handleNavigation(subItem.path)}
                                className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-montserrat cursor-pointer"
                                onMouseEnter={(e) => e.target.style.color = MY_COLORS.green}
                                onMouseLeave={(e) => e.target.style.color = MY_COLORS.black}
                              >
                                {t(subItem.key)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => handleNavigation(item.path)}
                        className="font-semibold text-xs font-montserrat whitespace-nowrap px-0.5 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                          color: hoveredIndex === index ? MY_COLORS.green : MY_COLORS.black,
                          transition: 'color 0.2s'
                        }}
                      >
                        {t(item.key)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div 
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-200 mt-2"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">

              {navItems.map(item => (
                <div key={item.key}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.key)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                        <div className="pl-4 space-y-1 bg-gray-50 rounded-md mt-1 py-1">
                          {item.dropdown.map(subItem => (
                            <div
                              key={subItem.key}
                              onClick={() => {
                                handleNavigation(subItem.path);
                                closeMobileMenu();
                              }}
                              className="block px-3 py-2 rounded-md text-xs sm:text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-white transition-colors duration-200 cursor-pointer"
                            >
                              {t(subItem.key)}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      onClick={() => {
                        handleNavigation(item.path);
                        closeMobileMenu();
                      }}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                      {t(item.key)}
                    </div>
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