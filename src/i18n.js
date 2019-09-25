import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from '@locales/en.json';

i18n.fallbacks = true;
i18n.translations = { en };
i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;

// Add local name getter prototype.
i18n.localeName = function() {
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
    })[this.locale] || 'english_name'
}

export default i18n
