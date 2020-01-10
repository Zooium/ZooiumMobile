import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { TouchableOpacity } from 'react-native';
import RadioGroup from '@components/RadioGroup.js';
import { Text, Select } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import DataTimePicker from '@components/DateTimePicker.js';
import MultilineInput from '@components/MultilineInput.js';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import { AnimalTypeaheadInput } from '@screens/animals/AnimalTypeaheadScreen.js';
import { EnclosureTypeaheadInput } from '@screens/enclosures/EnclosureTypeaheadScreen.js';

export default class EventSettings {
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
     * Parses additional details from response.
     *
     * @param {object} item
     */
    static parser(item) {
        // Undo same-field union alias.
        if (item.resource) {
            item.resource.name = item.resource.name
                || item.resource.animalName
                || item.resource.enclosureName;
        }

        // Parse polymorphic relationships.
        item.resource_id = item.resource && item.resource.id || undefined;
        item.resource_type = item.resource && item.resource.__typename || undefined;
        item.connection_id = item.connection && item.connection.id || undefined;
        item.connection_type = item.connection && item.connection.__typename || undefined;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        notes: '',
        state: undefined,
        value: undefined,
        occurred_at: undefined,

        resource_id: undefined,
        resource_type: undefined,
    })

    /**
     * The event states.
     */
    static states = [
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
        const state = EventSettings.states.find(state => state.key === resource.state) || EventSettings.states[0];
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
                    routeName: view,
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
        return resource.connection && EventSettings.connections.find(connection => {
            return connection.key === resource.connection.__typename
        });
    }

    /**
     * The entity fields.
     *
     * @var {array}
     */
    static fields = [
        /**
         * General Fields
         */
        {
            title: i18n.t('General'),

            data: [
                /**
                 * Resource
                 */
                {
                    key: 'resource_type',
                    title: i18n.t('Type'),
                    required: () => true,
                    shouldRender: (view, form) => view === 'edit',
                    renderEdit: function TypeEditRender([state, mergeState]) {
                        return (
                            <RadioGroup
                                options={{
                                    'Animal': i18n.t('Animal'),
                                    'Enclosure': i18n.t('Enclosure'),
                                }}
                                selected={state.resource_type}
                                onChange={(key) => mergeState({
                                    resource_type: key,
                                })}
                            />
                        );
                    },
                },
                {
                    key: 'resource_id',
                    title: i18n.t('Animal'),
                    required: (form) => form.resource_type === 'Animal',
                    shouldRender: (view, form) => form.resource_type === 'Animal',
                    renderView: function AnimalViewRender(resource, { navigation }) {
                        return resource.resource && (
                            <TouchableOpacity onPress={() => {
                                const route = 'AnimalView';
                                navigation.navigate({
                                    key: route + resource.resource.id,
                                    routeName: route,
                                    params: {
                                        item: resource.resource,
                                    },
                                })
                            }}>
                                <Text status="primary">
                                    {resource.resource && (resource.resource.name || resource.resource.identifier || '(' + i18n.t('name not set') + ')')}
                                </Text>
                            </TouchableOpacity>
                        )
                    },
                    renderEdit: function AnimalEditRender([state, mergeState]) {
                        return (
                            <TypeaheadInput
                                add="AnimalEdit"
                                view="AnimalTypeahead"
                                resource={i18n.t('Animal')}
                                preview={AnimalTypeaheadInput}
    
                                value={state.resource}
                                onChange={(value) => mergeState({
                                    resource: value,
                                    resource_id: value && value.id || null,
                                    resource_type: 'Animal',
                                })}
                            />
                        );
                    },
                },
                {
                    key: 'resource_id',
                    title: i18n.t('Enclosure'),
                    required: (form) => form.resource_type === 'Enclosure',
                    shouldRender: (view, form) => form.resource_type === 'Enclosure',
                    renderView: function EnclosureViewRender(resource, { navigation }) {
                        return resource.resource && (
                            <TouchableOpacity onPress={() => {
                                const route = 'EnclosureView';
                                navigation.navigate({
                                    key: route + resource.resource.id,
                                    routeName: route,
                                    params: {
                                        item: resource.resource,
                                    },
                                })
                            }}>
                                <Text status="primary">{EnclosureSettings.title(resource.resource)}</Text>
                            </TouchableOpacity>
                        )
                    },
                    renderEdit: function EnclosureEditRender([state, mergeState]) {
                        return (
                            <TypeaheadInput
                                add="EnclosureEdit"
                                view="EnclosureTypeahead"
                                resource={i18n.t('Enclosure')}
                                preview={EnclosureTypeaheadInput}
    
                                value={state.resource}
                                onChange={(value) => mergeState({
                                    resource: value,
                                    resource_id: value && value.id || null,
                                    resource_type: 'Enclosure',
                                })}
                            />
                        );
                    },
                },

                /**
                 * Connection
                 */
                {
                    key: 'connection_id',
                    title: i18n.t('Transaction'),
                    shouldRender: (view, form) => view === 'view' && form.connection_type === 'TransactionItem',
                    renderView: function TransactionViewRender(resource, { navigation }) {
                        const transaction = resource.connection && resource.connection.transaction;
                        return transaction && (
                            <TouchableOpacity onPress={() => {
                                const route = 'TransactionView';
                                navigation.navigate({
                                    key: route + transaction.id,
                                    routeName: route,
                                    params: {
                                        item: transaction,
                                    },
                                })
                            }}>
                                <Text status="primary">
                                    {transaction && (
                                        transaction.occurred_at &&
                                        new Date(transaction.occurred_at).toLocaleString()||
                                        '(' + i18n.t('date not set') + ')'
                                    )}
                                </Text>
                            </TouchableOpacity>
                        )
                    },
                },

                /**
                 * ...Rest
                 */
                {
                    key: 'occurred_at',
                    title: i18n.t('Occurred'),
                    renderView: resource => resource.occurred_at && (new Date(resource.occurred_at)).toLocaleString() || undefined,
                    renderEdit: function OccurredEditRender([state, mergeState]) {
                        return (
                            <DataTimePicker value={state.occurred_at} onChange={(value) => mergeState({
                                occurred_at: value,
                            })} />
                        );
                    },
                },
                {
                    key: 'state', // TODO - value, key (array?)
                    title: i18n.t('State'),
                    renderView: function StateViewRender(resource) {
                        const { value, state } = EventSettings.getEventStateSettings(resource);

                        return (
                            <Text style={{ color: value.color }}>
                                {state.text} ({value.text})
                            </Text>
                        );
                    },
                    renderEdit: function StateEditRender([state, mergeState]) {
                        const { value, isFallback } = EventSettings.getEventStateSettings(state);

                        return (
                            <Select
                                data={EventSettings.states}
                                keyExtractor={item => item.key}
                                selectedOption={! isFallback && value}
                                onSelect={(value) => {
                                    const parent = EventSettings.states.find(state => state.items.find(item => item.key === value.key));

                                    mergeState({
                                        state: parent.key,
                                        value: value.key,
                                    });
                                }}
                            />
                        );
                    },
                },
                {
                    key: 'notes',
                    title: i18n.t('Notes'),
                    renderView: resource => resource.notes,
                    renderEdit: function NotesEditRender([state, mergeState]) {
                        return <MultilineInput
                            numberOfLines={4}
                            value={state.notes}
                            onChangeText={(value) => mergeState({ notes: value })}
                        />;
                    },
                    multilineView: resource => resource.notes,
                    multilineEdit: () => true,
                },
            ],
        },
    ]

    /**
     * The entity field headers.
     *
     * @var {array}
     */
    static headers = []
}
