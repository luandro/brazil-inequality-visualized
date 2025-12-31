import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import ptBR from './pt-BR.json';
import './types'; // Import TypeScript type definitions

const resources = {
  en: { translation: en },
  'pt-BR': { translation: ptBR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt-BR'],

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app_lang',
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    // Ensure missing keys throw errors in development
    saveMissing: false,
    missingKeyHandler: false,
  });

export default i18n;
