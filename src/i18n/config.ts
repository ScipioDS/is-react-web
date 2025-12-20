import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import mk from './locales/mk.json';
import sq from './locales/sq.json';

i18n.use(initReactI18next).init({
  resources: {
    mk: { translation: mk },
    sq: { translation: sq },
  },
  lng: 'mk',
  fallbackLng: 'mk',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
