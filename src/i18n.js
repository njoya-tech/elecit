import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frCommon from './i18n/locales/fr/common.json';
import enCommon from './i18n/locales/en/common.json';
import deCommon from './i18n/locales/de/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: frCommon
      },
      en: {
        translation: enCommon
      },
      de: {
        translation: deCommon
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;