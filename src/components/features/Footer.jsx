/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg'
import g1 from '../../assets/g1.svg'
import rail from '../../assets/rail.svg'
import phone from '../../assets/phone.svg'

import ContactPopup from './ContactPopup';

import { motion } from 'framer-motion'

const MY_COLORS = {
  primaryBlue: '#006F95',
  secondaryGreen: '#7DA837',
  green: '#7EA72E',
  red: '#E30613',
  black: '#00121C',
  white: '#FFFFFF'
};

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter email:', email);
    // Ajoutez ici la logique d'envoi
    setEmail('');
  };

  return (
    <footer style={{ backgroundColor: MY_COLORS.black }} className="text-white relative overflow-hidden">
      {/* Bandeau vert en haut */}

      <div className=''>
        <div className="absolute top-5 left-100 ">
          <motion.img 
            src={rail} 
            alt="engrenage" 
            className="w-30 h-30"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 6, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />
        </div>
        <div className="absolute top-20 left-90 ">
          <motion.img 
            src={rail} 
            alt="engrenage" 
            className="w-17 h-17"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 6, 
              ease: "linear", 
              repeat: Infinity 
            }}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-0'>
        {/* Zone gauche - 2 colonnes sur md, 3 colonnes sur lg */}
        <div className="hidden md:block md:col-span-3 lg:col-span-3 ">
        </div>

        <div className="col-span-1 md:col-span-6 lg:col-span-6 ">
          <div 
            style={{ backgroundColor: MY_COLORS.green }}
            className="py-7 px-6 flex items-center justify-between relative"
          >
            <div className="flex items-center gap-7">
              <motion.div 
                className="w-8 h-8"
                style={{ perspective: 800 }}
              >
                <motion.img
                  src={g1}
                  alt="globe"
                  className="w-full h-full"
                  animate={{ rotateY: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear"
                  }}
                />
              </motion.div>

              <span className="text-white font-bold text-lg">
                {t('footer.banner.availableEverywhere')}
              </span>
            </div>

            <div className='flex items-center gap-8 text-white'>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8"
                role="img"
                aria-label={t('footer.banner.phoneLabel')}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <path
                  fill={MY_COLORS?.white ?? "#FFFFFF"}
                  d="M22.54 16.88l-5-2.14a1 1 0 0 0-1 .18l-2.2 1.8a15.05 15.05 0 0 1-6-6l1.8-2.2a1 1 0 0 0 .18-1l-2.14-5A1 1 0 0 0 8.16.6L4.03 2A3 3 0 0 0 2 5.03C2 14.44 9.56 22 18.97 22A3 3 0 0 0 22 19.97l1.4-4.13a1 1 0 0 0-.86-1z"
                />
              </motion.svg>

              <span>
                <a 
                  href="tel:+237650416640"
                  style={{ backgroundColor: MY_COLORS.black }}
                  className="px-6 py-2 rounded-full text-white font-bold hover:opacity-90 transition"
                >
                  {t('footer.banner.phoneNumber')}
                </a>
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Colonne 1 - Logo et description */}
              <div className="space-y-6">
                <img 
                  src={logo} 
                  alt="ElecIT Engineering" 
                  className="h-16"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t('footer.company.description')}
                </p>
                
                {/* Réseaux sociaux */}
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-80"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-80"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://whatsapp.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-80"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-80"
                    style={{ backgroundColor: MY_COLORS.green }}
                  >
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Colonne 2 - Services */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">{t('footer.services.title')}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/solutions/mechanical-fabrication" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.mechanicalFabrication')}
                    </a>
                  </li>
                  <li>
                    <a href="/solutions/smart-building" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.smartBuilding')}
                    </a>
                  </li>
                  <li>
                    <a href="/solutions/gps-tracking" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.gpsTracking')}
                    </a>
                  </li>
                  <li>
                    <a href="/solutions/it-services" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.itServices')}
                    </a>
                  </li>
                  <li>
                    <a href="/solutions/design-office" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.designOffice')}
                    </a>
                  </li>
                  <li>
                    <a href="/solutions/after-sales" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.services.afterSales')}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Colonne 3 - Liens utiles */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">{t('footer.usefulLinks.title')}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/filiales/mango-boutique" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.usefulLinks.mangoBoutique')}
                    </a>
                  </li>
                  <li>
                    <a href="/filiales/foczou" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.usefulLinks.foczou')}
                    </a>
                  </li>
                  <li>
                    <a href="/filiales/more-than-track" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.usefulLinks.moreThanTrack')}
                    </a>
                  </li>
                  <li>
                    <a href="/filiales/matoa" className="text-gray-300 hover:text-white transition text-sm">
                      {t('footer.usefulLinks.matoa')}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Colonne 4 - Newsletter */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">{t('footer.newsletter.title')}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {t('footer.newsletter.description')}
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">
                      {t('footer.newsletter.emailLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('footer.newsletter.emailPlaceholder')}
                      className="w-full px-4 py-2 rounded bg-white text-gray-900 focus:outline-none focus:ring-2"
                      style={{ borderColor: MY_COLORS.green }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-2 rounded border-2 font-semibold hover:bg-opacity-20 transition"
                    style={{ borderColor: MY_COLORS.green, backgroundColor: 'transparent', color: MY_COLORS.green }}
                  >
                    {t('footer.newsletter.submitButton')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="border-t py-4 px-6 border-dashed"
            style={{ borderColor: MY_COLORS.green }}
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs">
                  ©
                </span>
                {t('footer.copyright.text')}
              </p>
              <div className="flex gap-6">
                <a href="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition">
                  {t('footer.copyright.privacyPolicy')}
                </a>
                <a href="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition">
                  {t('footer.copyright.legalNotice')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Zone droite - 2 colonnes sur md, 3 colonnes sur lg */}
        <div className="hidden md:block md:col-span-3 lg:col-span-3 ">
        </div>
      </div>

      {/* Engrenages décoratifs */}
      <div className="absolute bottom-15 right-25 ">
        <motion.img 
          src={rail} 
          alt="engrenage" 
          className="w-40 h-40"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 6, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
      </div>

    

      <ContactPopup></ContactPopup>                        
    </footer>
  );
};

export default Footer;