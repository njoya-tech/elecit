import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MY_COLORS } from '../../utils/colors';
import { motion } from 'framer-motion';
import rail from '../../assets/rail.svg';
import SpontaneousApplicationsService from '../../services/spontaneous-applications.service';

const JobOfferFormOnlyModal = ({ onClose }) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sex: '',
    day: '',
    month: '',
    year: '',
    position: '',
    motivation: '',
    cvFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));

    // Réinitialiser les erreurs lors de la modification
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Réinitialiser les états
    setSubmitStatus(null);
    setErrorMessage('');
    setValidationErrors([]);

    // 1. Validation côté client
    const validation = SpontaneousApplicationsService.validateFormData(formData);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setSubmitStatus('error');
      return;
    }

    // 2. Vérifier si candidature spontanée récente (optionnel)
    const hasRecent = await SpontaneousApplicationsService.hasRecentSpontaneousApplication(
      formData.email,
      30 // 30 jours
    );

    if (hasRecent) {
      setErrorMessage(
        t('jobOffers.modal.recentSpontaneousApplication') || 
        'Vous avez déjà envoyé une candidature spontanée récemment. Veuillez patienter avant d\'en soumettre une nouvelle.'
      );
      setSubmitStatus('error');
      return;
    }

    // 3. Soumettre la candidature spontanée
    setIsSubmitting(true);

    try {
      const result = await SpontaneousApplicationsService.submitSpontaneousApplication(formData);

      if (result.success) {
        setSubmitStatus('success');
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            sex: '',
            day: '',
            month: '',
            year: '',
            position: '',
            motivation: '',
            cvFile: null,
          });
          setSubmitStatus(null);
        }, 3000);

      } else {
        setErrorMessage(result.message || t('jobOffers.modal.submitError'));
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('❌ Erreur soumission:', error);
      setErrorMessage(t('jobOffers.modal.submitError') || 'Erreur lors de l\'envoi');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-5">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        {onClose && (
          <button
            onClick={onClose}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t('jobOffers.modal.back') || 'Retour'}
          </button>
        )}

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
                  {t('recruitment.spontaneousTitle') || 'Candidature Spontanée'}
                </h1>
                <p className="text-base sm:text-lg text-white opacity-90 break-words">
                  {t('recruitment.spontaneousSubtitle') || 'Rejoignez notre équipe et faites partie de l\'aventure'}
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire centré */}
          <div className="w-full p-6 sm:p-8 lg:p-12 bg-gray-50 flex justify-center">
            <div className="w-full max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: MY_COLORS.primaryBlue }}>
                {t('jobOffers.modal.formTitle') || 'Formulaire de Candidature'}
              </h2>

              {/* Messages de statut */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="font-semibold">✅ {t('jobOffers.modal.submitSuccess') || 'Candidature envoyée avec succès !'}</p>
                  <p className="text-sm mt-1">{t('jobOffers.modal.submitSuccessMessage') || 'Nous vous contacterons bientôt.'}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-semibold">❌ {errorMessage || t('jobOffers.modal.submitError')}</p>
                  {validationErrors.length > 0 && (
                    <ul className="mt-2 text-sm space-y-1">
                      {validationErrors.map((error, idx) => (
                        <li key={idx}>• {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Prénom */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('jobOffers.modal.name') || 'Prénom'}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.namePlaceholder') || 'Jean'}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                  />
                </div>

                {/* Nom de famille */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('jobOffers.modal.lastName') || 'Nom de famille'}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.lastNamePlaceholder') || 'Dupont'}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 text-base text-gray-700">{t('jobOffers.modal.female')}</span>
                    </label>
                  </div>
                </div>

                {/* Date de naissance */}
                <div>
  <label className="block text-sm font-medium mb-2 text-gray-700">
    {t('jobOffers.modal.dateOfBirth')}
    <span className="text-xs text-gray-500 ml-2 font-normal">
      (ex: 15 / 03 / 1990)
    </span>
  </label>
  <div className="grid grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      name="day" 
                      value={formData.day} 
                      onChange={handleFormChange} 
                      placeholder={t('jobOffers.modal.day')} 
                      required 
                      maxLength="2"
                      disabled={isSubmitting}
                      className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200" 
                    />
                    <input 
                      type="text" 
                      name="month" 
                      value={formData.month} 
                      onChange={handleFormChange} 
                      placeholder={t('jobOffers.modal.month')} 
                      required 
                      maxLength="2"
                      disabled={isSubmitting}
                      className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200" 
                    />
                    <input 
                      type="text" 
                      name="year" 
                      value={formData.year} 
                      onChange={handleFormChange} 
                      placeholder={t('jobOffers.modal.year')} 
                      required 
                      maxLength="4"
                      disabled={isSubmitting}
                      className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200" 
                    />
                  </div>
                </div>

                {/* Poste souhaité - MODIFIABLE */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('jobOffers.modal.position') || 'Poste souhaité'}
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleFormChange}
                    placeholder={t('jobOffers.modal.positionPlaceholder') || "Ex: Développeur Full Stack, Chef de projet..."}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
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
                    rows="6"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
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
                    disabled={isSubmitting}
                    accept=".pdf,.doc,.docx"
                    className="hidden" 
                    id="cv-upload"
                  />
                  <label 
                    htmlFor="cv-upload" 
                    className={`inline-block w-full px-4 py-3 text-base border-2 border-dashed border-gray-400 rounded-lg cursor-pointer text-gray-600 hover:border-blue-500 transition-colors text-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {formData.cvFile ? (
                      <span className="text-green-600 font-medium">✓ {formData.cvFile.name}</span>
                    ) : (
                      t('jobOffers.modal.addFile') || '📎 Cliquez pour ajouter votre CV'
                    )}
                  </label>
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-lg text-white font-bold text-lg transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: MY_COLORS.secondaryGreen }}
                    onMouseEnter={(e) => { 
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = MY_COLORS.primaryBlue; 
                    }}
                    onMouseLeave={(e) => { 
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = MY_COLORS.secondaryGreen; 
                    }}
                  >
                    {isSubmitting 
                      ? (t('jobOffers.modal.sending') || 'Envoi en cours...') 
                      : (t('jobOffers.modal.sendApplication') || 'Envoyer ma candidature')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobOfferFormOnlyModal;