import i18n from '@src/i18n.js';

export default class TransactionItem {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && i18n.t('Editing {{resource}}', {
            resource: i18n.t('Item', { count: 1 }),
        }) || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Item', { count: 1 }),
        }) || fallback;
    }
}
