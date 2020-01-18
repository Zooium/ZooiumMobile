import i18n from '@src/i18n.js';

export default new class File {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    title(item, fallback = undefined) {
        return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Media'),
        }) || fallback;
    }
}
