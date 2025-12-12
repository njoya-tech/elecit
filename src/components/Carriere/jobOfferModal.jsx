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
    sex: '', // 'Masculin' ou 'Féminin'
    day: '',
    month: '',
    year: '',
    position: offer.title || '', // Pré-remplir avec le poste de l'offre
    motivation: '',
    cvFile: null,
  });

  // ******************************************************
  // LOGIQUE DE BLOCAGE DU DÉFILEMENT (scroll lock)
  // ******************************************************
  useEffect(() => {
    // 1. Désactiver le défilement sur le body lorsque le modal est monté
    document.body.style.overflow = 'hidden';

    // 2. Rétablir le défilement lorsque le composant est démonté (fermeture du modal)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []); 

  // ******************************************************

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      // Gère les fichiers (CV) et les autres types de champs
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données de candidature soumises:", formData);
    // Ajoutez ici la logique de soumission API (e.g., axios.post('/api/apply', formData))
    // Après une soumission réussie, vous pouvez appeler onClose()
    // onClose(); 
  };

  return (
    <div 
      // L'overflow-y-auto est ici pour centrer le modal si la fenêtre est trop petite
      className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        // max-h-[95vh] et overflow-hidden gèrent le scroll interne du modal
        className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Conteneur Flex pour les deux colonnes */}
        <div className="flex h-full">
          {/* COLONNE 1 : Détails de l'offre (gauche) */}
          <div className="w-1/2 overflow-y-auto max-h-[95vh] flex flex-col">
            
            {/* En-tête du modal (Identique) */}
            <div 
              className="p-6 border-b flex items-start justify-between flex-shrink-0"
              style={{ backgroundColor: MY_COLORS.primaryBlue }}
            >
              <div className="flex items-center gap-4">
                <motion.img 
                  src={rail} 
                  alt="engrenage" 
                  className="w-20 h-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{offer.title}</h2>
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
            
            {/* Contenu des détails (Scrollable) */}
            <div className="p-8 flex-grow">
              
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
                <h3 className="text-xl font-bold mb-4" style={{ color: MY_COLORS.black }}>
                  {t('jobOffers.modal.description')}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {offer.description}
                </p>
              </div>

              {/* Responsabilités (Affiché si la donnée existe) */}
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

              {/* Activités (Affiché si la donnée existe) */}
              {offer.activities && offer.activities.length > 0 && (
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

              {/* Profil recherché (Affiché si la donnée existe) */}
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
            </div>
          </div>
          
          {/* COLONNE 2 : Formulaire de candidature (droite) */}
          <div className="w-1/2 p-8 border-l max-h-[95vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: MY_COLORS.primaryBlue }}>
              {t('jobOffers.modal.formTitle')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.namePlaceholder')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Prénom */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.lastName')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.lastNamePlaceholder')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.emailPlaceholder')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Téléphone (Simplifié) */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.phonePlaceholder')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Sexe */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">{t('jobOffers.modal.sex')}</label>
                <div className="flex gap-6">
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
                    <span className="ml-2 text-gray-700">{t('jobOffers.modal.male')}</span>
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
                    <span className="ml-2 text-gray-700">{t('jobOffers.modal.female')}</span>
                  </label>
                </div>
              </div>

              {/* Date de naissance */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.dateOfBirth')}</label>
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" name="day" value={formData.day} onChange={handleFormChange} placeholder={t('jobOffers.modal.day')} required className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" />
                  <input type="text" name="month" value={formData.month} onChange={handleFormChange} placeholder={t('jobOffers.modal.month')} required className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" />
                  <input type="text" name="year" value={formData.year} onChange={handleFormChange} placeholder={t('jobOffers.modal.year')} required className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
              </div>

              {/* Poste demandé (Pré-rempli) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.position')}</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.positionPlaceholder')}
                  required
                  readOnly={!!offer.title} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100" 
                />
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.motivation')}</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleFormChange}
                  placeholder={t('jobOffers.modal.motivationPlaceholder')}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('jobOffers.modal.joinCV')}</label>
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
                  className="inline-block px-4 py-2 border border-dashed border-gray-400 rounded-lg cursor-pointer text-gray-600 hover:border-blue-500 transition-colors"
                >
                  {formData.cvFile ? formData.cvFile.name : t('jobOffers.modal.addFile')}
                </label>
              </div>

              {/* Bouton de soumission */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg text-white font-bold text-lg transition-all"
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