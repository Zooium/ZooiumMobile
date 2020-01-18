import i18n from '@src/i18n.js';

export default class Animal {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || item.identifier || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Animal', { count: 1 }),
        }) || fallback;
    }
}
