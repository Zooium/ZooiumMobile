import React from 'react';
import i18n from '@src/i18n.js';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import TradeItems from '@components/TradeItems.js';
import MultilineInput from '@components/MultilineInput.js';
import TypeaheadInput from '@components/TypeaheadInput.js';
import DataTimePicker from '@components/DateTimePicker.js';
import { ContactTypeaheadInput } from '@screens/contacts/ContactTypeaheadScreen.js';

export default class TransactionSettings {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.occurred_at && new Date(item.occurred_at).toLocaleString() || '(' + i18n.t('date not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Transaction', { count: 1 }),
        }) || fallback;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        notes: '',
        contact_id: undefined,
        occurred_at: undefined,
        items: [],
        origItems: [],
    })

    /**
     * Parses additional details from response.
     *
     * @param {object} item
     */
    static parser(item) {
        item.contact_id = item.contact_id || item.contact && item.contact.id || undefined;

        item.origItems = item.origItems || item.items || [];
        item.items = item.origItems && item.origItems.map(item => item.id) || [];
    }

    /**
     * The entity fields.
     *
     * @var {array}
     */
    static fields = [
        {
            title: i18n.t('General'),

            data: [
                {
                    key: 'occurred_at',
                    title: i18n.t('Date'),
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
                    key: 'contact_id',
                    title: i18n.t('Contact', { count: 1 }),
                    renderView: function ContactViewRender(resource, { navigation }) {
                        return resource.contact && (
                            <TouchableOpacity onPress={() => {
                                const route = 'ContactView';
                                navigation.navigate({
                                    key: route + resource.contact.id,
                                    routeName: route,
                                    params: {
                                        item: resource.contact,
                                    },
                                })
                            }}>
                                <Text status="primary">{resource.contact.name}</Text>
                            </TouchableOpacity>
                        )
                    },
                    renderEdit: function ContactEditRender([state, mergeState]) {
                        return (
                            <TypeaheadInput
                                add="ContactEdit"
                                view="ContactTypeahead"
                                resource={i18n.t('Contact')}
                                preview={ContactTypeaheadInput}
    
                                value={state.contact}
                                onChange={(value) => mergeState({
                                    contact: value,
                                    contact_id: value && value.id || null,
                                })}
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
        {
            title: i18n.t('Items'),

            data: [
                {
                    key: 'items',
                    multiline: () => true,
                    renderView: function ItemsViewRender(resource) {
                        return <TradeItems editing={false} transaction={resource} />;
                    },
                    renderEdit: function ItemsEditRender([state, mergeState]) {
                        return <TradeItems editing={true} transaction={state} onItemChange={(item, action) => {
                            // Define new items array based on if item is creating, saving, or removing.
                            let newItems = undefined;
                            switch (action) {
                                case 'create':
                                    newItems = [...state.origItems, item];
                                    break;
                                
                                case 'save':
                                    newItems = [...state.origItems.map(orig => (orig.id === item.id && item) || orig)];
                                    break;
                                
                                case 'remove':
                                    newItems = [...state.origItems.filter(orig => orig.id !== item.id)];
                                    break;
                            }

                            // Merge full items and ids into state.
                            mergeState({
                                origItems: newItems,
                                items: newItems.map(item => item.id),
                            });
                        }} />;
                    },
                },
            ],
        },
    ]
}
