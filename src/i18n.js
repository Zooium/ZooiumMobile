import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import application locales.
import en from '@locales/en.json';

// Create new i18n instance.
i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: 'en',

    resources: {
        en,
    },

    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

// Export short locale name helper.
export function shortLocale() {
    return i18n.language.split('-')[0];
}

// Export locale column name helper.
export function localeName() {
    return ({
        'en': 'english_name',
        'cn': 'chinese_name',
        'da': 'danish_name',
        'nl': 'dutch_name',
        'fr': 'french_name',
        'de': 'german_name',
        'it': 'italian_name',
        'jp': 'japanese_name',
        'no': 'norwegian_name',
        'pt': 'portuguese_name',
        'ru': 'russian_name',
        'es': 'spanish_name',
        'se': 'swedish_name',
    })[shortLocale()] || 'english_name'
}

// Export i18n-next helper.
export default i18n;
