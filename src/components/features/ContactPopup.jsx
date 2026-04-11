import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { logo } from '../../assets';

const MY_COLORS = {
  primaryBlue: '#006F95',
  green: '#7EA72E',
  white: '#FFFFFF',
};

// ── Types de vue du popup ──────────────────────────────────────────────────
// 'none' | 'whatsapp' | 'message' | 'chatbot'

const ContactPopup = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('whatsapp'); // vue active dans le popup
  const [message, setMessage] = useState('');

  // Chargement du script Elfsight une seule fois
  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setView('whatsapp'); // reset à la fermeture
  };

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/237650263982`, '_blank');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const url = `https://wa.me/237650263982?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setMessage('');
      setView('whatsapp');
    }
  };

  // ── Boutons de navigation (footer) ─────────────────────────────────────
  const tabs = [

    {
      id: 'message',
      label: t('contact.popup.tabMessage', 'WhatsApp'),
      color: MY_COLORS.green,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      label: t('contact.popup.tabChat', 'Chat direct'),
      color: MY_COLORS.primaryBlue,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
  ];

  // ── Contenu principal selon la vue ─────────────────────────────────────
  const renderBody = () => {
    if (view === 'chatbot') {
      return (
        <div className="flex flex-col" style={{ height: 320 }}>
          <div
            className="elfsight-app-b6e57170-d5c5-4450-8d00-a06c04dfa4c5 flex-1 w-full"
            data-elfsight-app-lazy
          />
        </div>
      );
    }

    if (view === 'message') {
      return (
        <div className="p-4 flex flex-col gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('contact.popup.messagePlaceholder', 'Votre message...')}
            className="w-full p-3 text-sm rounded-xl resize-none focus:outline-none focus:ring-2"
            style={{
              border: `1.5px solid ${MY_COLORS.green}`,
              color: '#00121C',
              minHeight: 100,
            }}
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setView('whatsapp')}
              className="flex-1 py-2 rounded-full text-sm font-semibold border-2 hover:bg-gray-50 transition"
              style={{ borderColor: MY_COLORS.green, color: MY_COLORS.green }}
            >
              {t('contact.popup.leftButton', 'Retour')}
            </button>
            <button
              onClick={handleSendMessage}
              className="flex-1 py-2 rounded-full text-white text-sm font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: MY_COLORS.green }}
            >
              {t('contact.popup.rightButton', 'Envoyer')}
            </button>
          </div>
        </div>
      );
    }

    // Vue par défaut : whatsapp / accueil
    return (
      <div className="p-4 flex flex-col gap-4">
        <p className="text-sm text-gray-600 bg-gray-100 rounded-xl px-4 py-3 leading-relaxed">
          {t('contact.popup.availability', 'Disponible lun–ven, 8h–18h. Réponse rapide garantie.')}
        </p>
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-3 rounded-full text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          style={{ backgroundColor: MY_COLORS.green }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {t('contact.popup.openWhatsApp', 'Ouvrir WhatsApp')}
        </button>
      </div>
    );
  };

  // ── Rendu ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 px-5 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2 z-50 text-sm sm:text-base"
        style={{ backgroundColor: MY_COLORS.green }}
        aria-label="Ouvrir le contact"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {t('contact.floatingButton', 'Nous contacter')}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay cliquable */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            />

            {/* Popup
                - Mobile  : pleine largeur, collé en bas (bottom sheet)
                - Desktop : largeur fixe 340px, ancré en bas à droite
            */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className={[
                'fixed z-[70] bg-white overflow-hidden shadow-2xl',
                // Mobile : bottom sheet pleine largeur
                'bottom-0 left-0 right-0 rounded-t-2xl',
                // Desktop : popup ancré en bas à droite
                'sm:bottom-24 sm:left-auto sm:right-8 sm:w-[340px] sm:rounded-2xl',
              ].join(' ')}
              role="dialog"
              aria-modal="true"
              aria-label="Contact"
            >
              {/* ── Header ─────────────────────────────────────── */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 relative">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-11 h-11 rounded-full object-contain flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                    {t('contact.popup.title', 'Contactez-nous')}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {t('contact.popup.subtitle', 'Réponse rapide garantie')}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
                  aria-label="Fermer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Corps (vue active) ──────────────────────────── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                >
                  {renderBody()}
                </motion.div>
              </AnimatePresence>

              {/* ── Footer : onglets de navigation ─────────────── */}
              <div className="border-t border-gray-100 px-4 py-3">
                <div className="flex gap-2 justify-center">
                  {tabs.map((tab) => {
                    const isActive = view === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setView(tab.id)}
                        className="flex flex-col items-center gap-1 flex-1 py-2 px-1 rounded-xl transition"
                        style={{
                          backgroundColor: isActive ? tab.color : '#F3F4F6',
                          color: isActive ? MY_COLORS.white : tab.color,
                        }}
                        aria-pressed={isActive}
                        aria-label={tab.label}
                      >
                        {tab.icon}
                        <span className="text-[10px] font-semibold leading-tight text-center">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactPopup;