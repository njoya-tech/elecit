import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg'

const JobOfferModal = ({ offer, onClose }) => {
    
  const { t } = useTranslation();
  
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

  // Scroll vers le haut lors de l'ouverture
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {t('jobOffers.modal.back') || 'Retour aux offres'}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* En-tête */}
          <div 
            className="p-6 sm:p-8 lg:p-10"
            style={{ backgroundColor: MY_COLORS.primaryBlue }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.img 
                src={rail} 
                alt="engrenage" 
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 break-words">
                  {offer.title}
                </h1>
                <p className="text-base sm:text-lg text-white opacity-90 break-words">
                  {offer.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Conteneur Flex pour les deux colonnes */}
          <div className="flex flex-col lg:flex-row">
            {/* COLONNE 1 : Détails de l'offre */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r">
              {/* Informations clés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.typePoste')}
                  </p>
                  <p className="text-base text-gray-800">{offer.type}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.lieuPoste')}
                  </p>
                  <p className="text-base text-gray-800">{offer.location}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.datePublication')}
                  </p>
                  <p className="text-base text-gray-800">{offer.publicationDate}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: MY_COLORS.primaryBlue }}>
                    {t('jobOffers.modal.validJusquau')}
                  </p>
                  <p className="text-base text-gray-800">{offer.validUntil}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
                  {t('jobOffers.modal.description')}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {offer.description}
                </p>
              </div>

              {/* Responsabilités */}
              {offer.responsibilities && (
                <div className="mb-8">
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.responsibilities')}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {offer.responsibilities}
                  </p>
                </div>
              )}

              {/* Activités */}
              {offer.activities && offer.activities.length > 0 && (
                <div className="mb-8">
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.activities')}
                  </h3>
                  <ul className="space-y-3">
                    {offer.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span style={{ color: MY_COLORS.secondaryGreen }} className="flex-shrink-0 text-xl">•</span>
                        <span className="text-base text-gray-700">{activity}</span> 
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Profil recherché */}
              {offer.profile && (
                <div className="mb-8">
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{ color: MY_COLORS.black }}
                  >
                    {t('jobOffers.modal.profile')}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {offer.profile}
                  </p>
                </div>
              )}
            </div>
            
            {/* COLONNE 2 : Formulaire de candidature */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-gray-50">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.formTitle')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.namePlaceholder')}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.lastName')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.lastNamePlaceholder')}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder={t('jobOffers.modal.emailPlaceholder')}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder={t('jobOffers.modal.phonePlaceholder')}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Sexe */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">{t('jobOffers.modal.sex')}</label>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="sex"
                        value="Masculin"
                        checked={formData.sex === 'Masculin'}
                        onChange={handleFormChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 text-base text-gray-700">{t('jobOffers.modal.male')}</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="sex"
                        value="Féminin"
                        checked={formData.sex === 'Féminin'}
                        onChange={handleFormChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 text-base text-gray-700">{t('jobOffers.modal.female')}</span>
                    </label>
                  </div>
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.dateOfBirth')}</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="text" name="day" value={formData.day} onChange={handleFormChange} placeholder={t('jobOffers.modal.day')} required className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="month" value={formData.month} onChange={handleFormChange} placeholder={t('jobOffers.modal.month')} required className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="year" value={formData.year} onChange={handleFormChange} placeholder={t('jobOffers.modal.year')} required className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                {/* Poste demandé */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.position')}</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.positionPlaceholder')}
                    required
                    readOnly={!!offer.title} 
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100" 
                  />
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.motivation')}</label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.motivationPlaceholder')}
                    required
                    rows="4"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.joinCV')}</label>
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
                    className="inline-block px-4 py-3 text-base border border-dashed border-gray-400 rounded-lg cursor-pointer text-gray-600 hover:border-blue-500 transition-colors break-all"
                  >
                    {formData.cvFile ? formData.cvFile.name : t('jobOffers.modal.addFile')}
                  </label>
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg text-white font-bold text-lg transition-all w-full sm:w-auto"
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
    </div>
  );
}

export default JobOfferModal;