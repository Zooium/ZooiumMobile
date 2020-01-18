import i18n, { localeName } from '@src/i18n.js';

export default new class Specie {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    title(item, fallback = undefined) {
        return item && (item[localeName()] || item.english_name || item.scientific || '(' + i18n.t('name not set') + ')') || fallback;
    }
}
