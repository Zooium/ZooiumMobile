import i18n from '@src/i18n.js';

export default class Location {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Location', { count: 1 }),
        }) || fallback;
    }
    /**
     * Returns the short resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static shortTitle(item, fallback = undefined) {
        return item && [item.address, item.city].filter(Boolean).join(', ') || fallback;
    }
}
