// JobOffersList.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg'

const JobOffersList = ({ offers }) => {
  const { t } = useTranslation();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [filters, setFilters] = useState({
    poste: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });

  // Filtrer les offres
  const filteredOffers = offers.filter(offer => {
    const matchPoste = !filters.poste || offer.title.toLowerCase().includes(filters.poste.toLowerCase());
    const matchLocation = !filters.location || offer.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchDateFrom = !filters.dateFrom || new Date(offer.publicationDate) >= new Date(filters.dateFrom);
    const matchDateTo = !filters.dateTo || new Date(offer.publicationDate) <= new Date(filters.dateTo);
    
    return matchPoste && matchLocation && matchDateFrom && matchDateTo;
  });

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

  return (
    <div className="w-full py-16 px-4 bg-gray-50">
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
              <input
                type="text"
                name="poste"
                value={filters.poste}
                onChange={handleFilterChange}
                placeholder={t('jobOffers.filterPostePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ focusRing: MY_COLORS.primaryBlue }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('jobOffers.filterLocation')}
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder={t('jobOffers.filterLocationPlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              />
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
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
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
                  onClick={() => setSelectedOffer(offer)}
                  className="px-8 py-3 rounded-full text-white font-semibold transition-all"
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
      </div>

      {/* Modal de détails */}
      {selectedOffer && (
        <JobOfferModal 
          offer={selectedOffer} 
          onClose={() => setSelectedOffer(null)} 
        />
      )}
    </div>
  );
};

// JobOfferModal.jsx
const JobOfferModal = ({ offer, onClose }) => {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed inset-0 bg-transaparent backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête du modal */}
        <div 
          className="p-6 border-b flex items-start justify-between"
          style={{ backgroundColor: MY_COLORS.primaryBlue }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="25" stroke={MY_COLORS.secondaryGreen} strokeWidth="3" fill="none"/>
                {[...Array(12)].map((_, i) => (
                  <rect
                    key={i}
                    x="48"
                    y="10"
                    width="4"
                    height="15"
                    fill={MY_COLORS.secondaryGreen}
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
              </svg>
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {offer.title}
              </h2>
              <p className="text-white opacity-90">{offer.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        </div>

        {/* Contenu du modal */}
        <div className="p-8">
          {/* Informations clés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.typePoste')}
              </p>
              <p className="text-gray-800">{offer.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.lieuPoste')}
              </p>
              <p className="text-gray-800">{offer.location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.datePublication')}
              </p>
              <p className="text-gray-800">{offer.publicationDate}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.validJusquau')}
              </p>
              <p className="text-gray-800">{offer.validUntil}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: MY_COLORS.black }}
            >
              {t('jobOffers.modal.description')}
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {offer.description}
            </p>
          </div>

          {/* Responsabilités */}
          {offer.responsibilities && (
            <div className="mb-8">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: MY_COLORS.black }}
              >
                {t('jobOffers.modal.responsibilities')}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {offer.responsibilities}
              </p>
            </div>
          )}

          {/* Activités */}
          {offer.activities && (
            <div className="mb-8">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: MY_COLORS.black }}
              >
                {t('jobOffers.modal.activities')}
              </h3>
              <ul className="space-y-2">
                {offer.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span style={{ color: MY_COLORS.secondaryGreen }}>•</span>
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Profil recherché */}
          {offer.profile && (
            <div className="mb-8">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: MY_COLORS.black }}
              >
                {t('jobOffers.modal.profile')}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {offer.profile}
              </p>
            </div>
          )}

          {/* Bouton de candidature */}
          <div className="flex justify-center mt-8">
            <button
              className="px-12 py-4 rounded-full text-white font-bold text-lg transition-all"
              style={{ backgroundColor: MY_COLORS.secondaryGreen }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen;
              }}
            >
              {t('jobOffers.modal.applyButton')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobOffersList;