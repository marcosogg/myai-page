import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const initI18n = async () => {
  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'pt-BR'],
      defaultNS: 'common',
      ns: ['common'],
      interpolation: {
        escapeValue: false,
      },
      debug: true, // Temporarily enable debug to help trace any remaining issues
    });

  // Load the preferred language from localStorage if it exists
  const storedLanguage = localStorage.getItem('preferredLanguage');
  if (storedLanguage && ['en', 'pt-BR'].includes(storedLanguage)) {
    await i18n.changeLanguage(storedLanguage);
  }

  return i18n;
};

// Initialize i18n
await initI18n();

export default i18n;