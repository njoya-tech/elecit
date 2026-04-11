// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next';

// const MY_COLORS = {
//   primaryBlue: '#006F95',
//   white: '#FFFFFF',
// };

// const ChatBotPopup = () => {
//   const { t } = useTranslation();
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://elfsightcdn.com/platform.js';
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <>
//       <motion.button
//         onClick={() => setIsOpen(true)}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 px-4 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2 z-50 text-sm sm:text-base"
//         style={{ backgroundColor: MY_COLORS.primaryBlue }}
//         aria-label="Ouvrir l’assistant IA"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7v3a7 7 0 007 7h1l3 3v-3a7 7 0 003-6v-4a7 7 0 00-7-7z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h.01M12 11h.01M15 11h.01" />
//         </svg>
//         {t('contact.popup.tabChatbot', 'Assistant IA')}
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-[60]"
//               style={{ background: 'rgba(0,0,0,0.2)' }}
//               onClick={() => setIsOpen(false)}
//             />

//             <motion.div
//               initial={{ opacity: 0, y: 30, scale: 0.96 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 30, scale: 0.96 }}
//               transition={{ type: 'spring', damping: 22, stiffness: 300 }}
//               className="fixed z-[70] bottom-0 left-0 right-0 sm:bottom-24 sm:left-auto sm:right-8 sm:w-[360px] bg-white shadow-2xl overflow-hidden rounded-t-2xl sm:rounded-2xl"
//               role="dialog"
//               aria-modal="true"
//               aria-label="Assistant IA"
//             >
//               <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: MY_COLORS.primaryBlue }}>
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 00-7 7v3a7 7 0 007 7h1l3 3v-3a7 7 0 003-6v-4a7 7 0 00-7-7z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 11h.01M12 11h.01M15 11h.01" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-gray-900">Assistant IA</h3>
//                     <p className="text-xs text-gray-500">Cliquez pour échanger</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
//                   aria-label="Fermer"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="p-4">
//                 <div
//                   className="elfsight-app-b6e57170-d5c5-4450-8d00-a06c04dfa4c5 w-full"
//                   data-elfsight-app-lazy
//                   style={{ minHeight: 320 }}
//                 />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatBotPopup;