import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export const initI18n = () => {
  return i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      fallbackLng: {
        'pt': ['pt-BR', 'en'],
        'default': ['en']
      },
      supportedLngs: ['en', 'pt-BR'],
      defaultNS: 'common',
      ns: ['common'],
      interpolation: {
        escapeValue: false,
      },
      load: 'currentOnly', // This prevents loading partial locales like 'pt'
      debug: process.env.NODE_ENV === 'development',
    });
};

export default i18n;