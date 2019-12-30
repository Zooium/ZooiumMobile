import React from 'react';
import i18n from '@src/i18n.js';
import { TouchableOpacity } from 'react-native';
import TradeItems from '@components/TradeItems.js';
import { Text, Input } from '@ui-kitten/components';
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
     * Parse resource to form object.
     */
    static formParser = (resource) => ({
        ...resource,
        father_id: resource.contact && resource.contact.id,
        items: resource.items && resource.items.map(item => item.id) || [],
        origItems: resource.items || [],
    })

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
                        return <Input
                            multiline={true}
                            numberOfLines={4}
                            value={state.notes}
                            onChangeText={(value) => mergeState({ notes: value })}
                            // @wip - text in top of element not center.
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
                        return <TradeItems editing={true} transaction={state} onItemChange={(item, isNew) => {
                            // Define new items array based on if item is new or existing.
                            const newItems = isNew
                                ? [...state.origItems, item]
                                : [...state.origItems.map(orig => {
                                    return (orig.id === item.id && item) || orig;
                                })];

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
