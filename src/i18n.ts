import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/public/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt-BR'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;