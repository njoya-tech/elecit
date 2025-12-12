import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const ContactPopup = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showMessageInput, setShowMessageInput] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleOpenWhatsApp = () => {
    const phoneNumber = '237650416640';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const phoneNumber = '237650416640';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setShowMessageInput(false);
    }
  };

  return (
    <>
      {/* Bouton Contactez-nous flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 px-6 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2 z-50"
        style={{ backgroundColor: MY_COLORS.green }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {t('footer.contact.floatingButton')}
      </motion.button>

      {/* Popup de contact */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden"
              style={{ maxHeight: '500px' }}
            >
              {/* Header */}
              <div className="relative p-4 bg-gradient-to-r from-gray-50 to-white border-b">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-12 h-12 rounded-full object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {t('footer.contact.popup.title')}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {t('footer.contact.popup.subtitle')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              {!showMessageInput ? (
                <div className="p-6">
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {t('footer.contact.popup.availability')}
                  </p>

                  <button
                    onClick={handleOpenWhatsApp}
                    className="w-full py-3 rounded-full text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {t('footer.contact.popup.openWhatsApp')}
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('footer.contact.popup.messagePlaceholder')}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 text-sm"
                      style={{ borderColor: MY_COLORS.green }}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowMessageInput(false)}
                      className="flex-1 py-2 rounded-full border-2 font-semibold hover:bg-gray-50 transition text-sm"
                      style={{ borderColor: MY_COLORS.green, color: MY_COLORS.green }}
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="flex-1 py-2 rounded-full text-white font-semibold hover:opacity-90 transition text-sm"
                      style={{ backgroundColor: MY_COLORS.green }}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              )}

              {/* Footer avec icônes */}
              <div className="border-t p-4 bg-gray-50">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowMessageInput(false)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow hover:shadow-md transition"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowMessageInput(true)}
                    className="flex items-center justify-center w-12 h-12 rounded-full shadow hover:shadow-md transition"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
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