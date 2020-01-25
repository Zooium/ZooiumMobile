import React from 'react';
import i18n from '@src/i18n.js';
import Event from '@models/Event.model.js';
import Animal from '@models/Animal.model.js';
import { TouchableOpacity } from 'react-native';
import Enclosure from '@models/Enclosure.model.js';
import RadioGroup from '@components/RadioGroup.js';
import { Text, Select } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import DataTimePicker from '@components/DateTimePicker.js';
import MultilineInput from '@components/MultilineInput.js';
import VIEW_EVENT from '@graphql/queries/Event/viewEvent.gql.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import UPDATE_EVENT from '@graphql/mutations/Event/updateEvent.gql.js';
import CREATE_EVENT from '@graphql/mutations/Event/createEvent.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';

export default function EventViewScreen(props) {
    return (
        <ResourceWrapper
            items={fields}
            formInit={form}
            parser={parser}
            canModify={canModify}

            fetch={VIEW_EVENT}
            mutations={{
                save: UPDATE_EVENT,
                create: CREATE_EVENT,
                remove: DELETE_EVENTS,
            }}
                
            routes={{
                view: 'EventView',
                edit: 'EventEdit',
            }}

            {...props}
        />
    );
}

EventViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props,
    title: Event.title,
    canModify: canModify,
});

/**
 * Define resource form.
 */
export const form = () => ({
    notes: '',
    state: undefined,
    value: undefined,
    occurred_at: undefined,

    resource_id: undefined,
    resource_type: undefined,
})

/**
 * Define resource parser.
 */
export const parser = (item) => {
    // Undo same-field union alias.
    if (item.resource) {
        item.resource.name = item.resource.name
            || item.resource.animalName
            || item.resource.enclosureName;
    }

    // Parse polymorphic relationships.
    item.resource_id = item.resource_id || item.resource && item.resource.id || undefined;
    item.resource_type = item.resource_type || item.resource && item.resource.__typename || undefined;
    item.connection_id = item.connection_id || item.connection && item.connection.id || undefined;
    item.connection_type = item.connection_type || item.connection && item.connection.__typename || undefined;
}

/**
 * Define resource can modify check.
 */
export const canModify = (resource) => {
    if (resource.connection) {
        return i18n.t('You can not update or delete system generated events!');
    }

    return true;
}

/**
 * Define resource fields.
 */
export const fields = [
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
                shouldRender: (view) => view === 'edit',
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
                                name: route,
                                params: {
                                    item: resource.resource,
                                },
                            })
                        }}>
                            <Text status="primary">
                                {Animal.title(resource.resource)}
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
                            preview={Animal.title}

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
                                name: route,
                                params: {
                                    item: resource.resource,
                                },
                            })
                        }}>
                            <Text status="primary">{Enclosure.title(resource.resource)}</Text>
                        </TouchableOpacity>
                    )
                },
                renderEdit: function EnclosureEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="EnclosureEdit"
                            view="EnclosureTypeahead"
                            resource={i18n.t('Enclosure')}
                            preview={Enclosure.title}

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
                                name: route,
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
                required: () => true,
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
                    const { value, state } = Event.getEventStateSettings(resource);

                    return value && state && (
                        <Text style={{ color: value.color }}>
                            {state.text} ({value.text})
                        </Text>
                    );
                },
                renderEdit: function StateEditRender([state, mergeState]) {
                    let { value, isFallback } = Event.getEventStateSettings(state);
                    if (! state.state) {
                        value = Event.states[0];
                        isFallback = false;
                    }

                    return (
                        <Select
                            data={Event.states}
                            keyExtractor={item => item.key}
                            selectedOption={! isFallback && value}
                            onSelect={(value) => {
                                if (value.key === 'none') {
                                    return mergeState({
                                        state: null,
                                        value: null,
                                    });
                                }

                                const parent = Event.states.find(state => {
                                    return state.items.find(item => item.key === value.key);
                                });

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
];
