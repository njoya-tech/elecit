// JobOffersList.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg'

const JobOffersList = ({ offers }) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [filters, setFilters] = useState({
    poste: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Nombre d'offres par page

  // Filtrer les offres
  const filteredOffers = offers.filter(offer => {
    const matchPoste = !filters.poste || offer.title.toLowerCase().includes(filters.poste.toLowerCase());
    const matchLocation = !filters.location || offer.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchDateFrom = !filters.dateFrom || new Date(offer.publicationDate) >= new Date(filters.dateFrom);
    const matchDateTo = !filters.dateTo || new Date(offer.publicationDate) <= new Date(filters.dateTo);
    
    return matchPoste && matchLocation && matchDateFrom && matchDateTo;
  });

  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  // Fonction pour naviguer vers la page de détails
  const handleViewOffer = (offer) => {
    navigate('/carriere/job', { state: { offer } });
  };

  // Fonction pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // UN SEUL useEffect pour réinitialiser à la page 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const resetFilters = () => {
    setFilters({
      poste: '',
      location: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const uniqueTitles = [
    '',
    ...new Set(offers.map(offer => offer.title))
  ];

  const uniqueLocations = [
    '',
    ...new Set(offers.map(offer => offer.location))
  ];

  return (
    <div className="w-full mx-auto py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec icône */}
        <div className="flex items-center justify-between mb-12 relative ">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: MY_COLORS.primaryBlue }}
          >
            {t('jobOffers.title')}
          </h2>
         <div className="absolute lg:-top-10 left-250 z-30">
                 <motion.img 
                  style={{ color: MY_COLORS.primaryBlue }}
                   src={rail} 
                   alt="engrenage" 
                   className="w-40 h-30"
                   animate={{ rotate: 360 }}
                   transition={{ 
                     duration: 6, 
                     ease: "linear", 
                     repeat: Infinity 
                   }}
                 />
               </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 
            className="text-xl font-semibold mb-4"
            style={{ color: MY_COLORS.black }}
          >
            {t('jobOffers.filterTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('jobOffers.filterPoste')}
              </label>
              <select
                name="poste"
                value={filters.poste}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ focusRing: MY_COLORS.primaryBlue }}
              >
                {uniqueTitles.map((title, index) => (
                  <option key={index} value={title}>
                    {title === '' ? 'Tous': title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('jobOffers.filterLocation')}
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              >
                {uniqueLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location === '' ? 'Tous' : location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('jobOffers.filterDateFrom')}
              </label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('jobOffers.filterDateTo')}
              </label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-6 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ 
                color: MY_COLORS.primaryBlue,
                border: `2px solid ${MY_COLORS.primaryBlue}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue;
                e.currentTarget.style.color = MY_COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = MY_COLORS.primaryBlue;
              }}
            >
              {t('jobOffers.resetFilters')}
            </button>
          </div>
        </div>

        {/* Liste des offres */}
        <div className="space-y-4">
          {filteredOffers.length > 0 ? (
            currentOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: MY_COLORS.black }}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-gray-600">
                    {offer.location}, {offer.publicationDate}, {offer.tags?.join(', ')}
                  </p>
                </div>
                <button
                  onClick={() => handleViewOffer(offer)}
                  className="px-10 py-1 text-sm rounded-full text-white font-semibold transition-all"
                  style={{ backgroundColor: MY_COLORS.primaryBlue }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue;
                  }}
                >
                  {t('jobOffers.viewButton')}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('jobOffers.noResults')}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOffers.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: currentPage === 1 ? '#e5e7eb' : MY_COLORS.primaryBlue,
                color: currentPage === 1 ? '#9ca3af' : MY_COLORS.white
              }}
            >
              {t('jobOffers.previous') || 'Précédent'}
            </button>

            <div className="flex gap-2 flex-wrap justify-center">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className="w-10 h-10 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: currentPage === pageNumber ? MY_COLORS.primaryBlue : 'white',
                      color: currentPage === pageNumber ? MY_COLORS.white : MY_COLORS.black,
                      border: `2px solid ${currentPage === pageNumber ? MY_COLORS.primaryBlue : '#e5e7eb'}`
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: currentPage === totalPages ? '#e5e7eb' : MY_COLORS.primaryBlue,
                color: currentPage === totalPages ? '#9ca3af' : MY_COLORS.white
              }}
            >
              {t('jobOffers.next') || 'Suivant'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOffersList;