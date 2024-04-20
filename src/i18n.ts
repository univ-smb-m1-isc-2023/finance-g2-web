import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFR from './locales/fr.json';

i18n.use(initReactI18next).init({
    resources: {
        fr: {
            translation: translationFR,
        },
    },
    lng: 'fr', // Si vous avez seulement besoin du français, fixez la langue à 'fr'.
    fallbackLng: 'fr', // Langue de secours
    interpolation: {
        escapeValue: false, // React échappe déjà les valeurs
    },
});

export default i18n;
