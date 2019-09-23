import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from '@locales/en.json';

i18n.fallbacks = true;
i18n.translations = { en };
i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;

export default i18n
