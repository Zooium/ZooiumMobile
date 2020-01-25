import i18n from '@src/i18n.js';
import theme from '@src/theme.js';

export default class Event {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.occurred_at && new Date(item.occurred_at).toLocaleString() || '(' + i18n.t('date not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Event', { count: 1 }),
        }) || fallback;
    }

    /**
     * Determine if can modify item.
     */
    static canModify = (resource) => {
        if (resource.connection) {
            return i18n.t('You can not update or delete system generated events!');
        }

        return true;
    }

    /**
     * The event states.
     */
    static states = [
        {
            key: 'none',
            text: i18n.t('No change'),
        },
        {
            key: 'active',
            text: i18n.t('Active'),

            fallback: {
                key: 'default',
                icon: 'plus',
                text: i18n.t('Active'),
                color: theme['color-success-500'],
                isFallback: true,
            },

            items: [
                {
                    key: 'born',
                    icon: 'baby',
                    text: i18n.t('Born'),
                    color: theme['color-success-500'],
                },
                {
                    key: 'bought',
                    icon: 'wallet',
                    text: i18n.t('Bought'),
                    color: theme['color-success-500'],
                },
                {
                    key: 'registered',
                    icon: 'plus',
                    text: i18n.t('Registered'),
                    color: theme['color-success-500'],
                },
            ],
        },
        {
            key: 'inactive',
            text: i18n.t('Inactive'),

            fallback: {
                key: 'default',
                icon: 'minus',
                text: i18n.t('Inactive'),
                color: theme['color-danger-500'],
                isFallback: true,
            },
            
            items: [
                {
                    key: 'sold',
                    icon: 'wallet',
                    text: i18n.t('Sold'),
                    color: theme['color-danger-500'],
                },
                {
                    key: 'deceased',
                    icon: 'tombstone',
                    text: i18n.t('Deceased'),
                    color: theme['color-danger-500'],
                },
            ],
        },
    ]

    /**
     * Returns the event state settings.
     *
     * @param {object} resource
     * @return {object|null}
     */
    static getEventStateSettings(resource) {
        if (! resource.state) return {};

        const state = Event.states.find(state => state.key === resource.state) || Event.states[1];
        const value = state.items.find(item => item.key === resource.value) || state.fallback;
        const isFallback = value.isFallback === true;

        return { value, state, isFallback };
    }

    /**
     * The event connections.
     */
    static connections = [
        {
            key: 'TransactionItem',
            text: i18n.t('Transaction'),
            onPress: ({ item: { connection: { transaction } }, navigation }) => {
                const view = 'TransactionView';
                navigation.navigate({
                    key: view + transaction.id,
                    name: view,
                    params: { item: transaction },
                });
            },
        },
    ]

    /**
     * Returns the event connections settings.
     *
     * @param {object} resource
     * @return {object|null}
     */
    static getEventConnectionSettings(resource) {
        return resource.connection && Event.connections.find(connection => {
            return connection.key === resource.connection.__typename
        });
    }
}
