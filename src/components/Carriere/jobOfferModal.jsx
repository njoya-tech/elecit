import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg'


const JobOfferModal = ({ offer, onClose }) => {
    
  const { t } = useTranslation();
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    sex: '',
    day: '',
    month: '',
    year: '',
    position: offer.title || '',
    motivation: '',
    cvFile: null,
  });

  // ******************************************************
  // LOGIQUE DE BLOCAGE DU DÉFILEMENT (scroll lock)
  // ******************************************************
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []); 

  // ******************************************************

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données de candidature soumises:", formData);
  };

  return (
    <div 
      className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-70 flex items-start lg:items-center justify-center z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-2xl w-full lg:max-w-6xl my-4 lg:my-0 mx-2 sm:mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Conteneur Flex pour les deux colonnes */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* COLONNE 1 : Détails de l'offre (gauche) */}
          <div className="w-full lg:w-1/2 flex flex-col max-h-[50vh] lg:max-h-[90vh] overflow-y-auto">
            
            {/* En-tête du modal */}
            <div 
              className="p-4 sm:p-6 border-b flex items-start justify-between flex-shrink-0"
              style={{ backgroundColor: MY_COLORS.primaryBlue }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.img 
                  src={rail} 
                  alt="engrenage" 
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 break-words">{offer.title}</h2>
                  <p className="text-sm sm:text-base text-white opacity-90 break-words">{offer.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white text-2xl sm:text-3xl hover:opacity-70 transition-opacity flex-shrink-0 ml-2"
              >
                ×
              </button>
            </div>
            
            {/* Contenu des détails (Scrollable) */}
            <div className="p-4 sm:p-6 lg:p-8 flex-grow overflow-y-auto">
              
              {/* Informations clés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.typePoste')}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">{offer.type}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.lieuPoste')}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">{offer.location}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.datePublication')}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">{offer.publicationDate}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.validJusquau')}
                  </p>
                  <p className="text-sm sm:text-base text-gray-800">{offer.validUntil}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: MY_COLORS.black }}>
                  {t('jobOffers.modal.description')}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {offer.description}
                </p>
              </div>

              {/* Responsabilités */}
              {offer.responsibilities && (
                <div className="mb-6 sm:mb-8">
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.responsibilities')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {offer.responsibilities}
                  </p>
                </div>
              )}

              {/* Activités */}
              {offer.activities && offer.activities.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.activities')}
                  </h3>
                  <ul className="space-y-2">
                    {offer.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span style={{ color: MY_COLORS.secondaryGreen }} className="flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base text-gray-700">{activity}</span> 
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Profil recherché */}
              {offer.profile && (
                <div className="mb-6 sm:mb-8">
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.profile')}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {offer.profile}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* COLONNE 2 : Formulaire de candidature (droite) */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l max-h-[50vh] lg:max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6" style={{ color: MY_COLORS.primaryBlue }}>
              {t('jobOffers.modal.formTitle')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.namePlaceholder')}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.lastName')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.lastNamePlaceholder')}
                  required
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.emailPlaceholder')}
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.phonePlaceholder')}
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Sexe */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.sex')}</label>
                <div className="flex gap-4 sm:gap-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Masculin"
                      checked={formData.sex === 'Masculin'}
                      onChange={handleFormChange}
                      required
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm sm:text-base text-gray-700">{t('jobOffers.modal.male')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="Féminin"
                      checked={formData.sex === 'Féminin'}
                      onChange={handleFormChange}
                      required
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-sm sm:text-base text-gray-700">{t('jobOffers.modal.female')}</span>
                  </label>
                </div>
              </div>

              {/* Date de naissance */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.dateOfBirth')}</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <input type="text" name="day" value={formData.day} onChange={handleFormChange} placeholder={t('jobOffers.modal.day')} required className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500" />
                  <input type="text" name="month" value={formData.month} onChange={handleFormChange} placeholder={t('jobOffers.modal.month')} required className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500" />
                  <input type="text" name="year" value={formData.year} onChange={handleFormChange} placeholder={t('jobOffers.modal.year')} required className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
              </div>

              {/* Poste demandé */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.position')}</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.positionPlaceholder')}
                  required
                  readOnly={!!offer.title} 
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100" 
                />
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.motivation')}</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.motivationPlaceholder')}
                  required
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.joinCV')}</label>
                <input
                  type="file"
                  name="cvFile"
                  onChange={handleFormChange}
                  required
                  className="hidden" 
                  id="cv-upload"
                />
                <label 
                  htmlFor="cv-upload" 
                  className="inline-block px-3 sm:px-4 py-2 text-sm sm:text-base border border-dashed border-gray-400 rounded-lg cursor-pointer text-gray-600 hover:border-blue-500 transition-colors break-all"
                >
                  {formData.cvFile ? formData.cvFile.name : t('jobOffers.modal.addFile')}
                </label>
              </div>

              {/* Bouton de soumission */}
              <div className="flex justify-center pt-2 pb-4">
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-white font-bold text-base sm:text-lg transition-all w-full sm:w-auto"
                  style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen; }}
                >
                  {t('jobOffers.modal.sendApplication')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default JobOfferModal;