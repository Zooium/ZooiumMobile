import React from 'react';
import i18n from '@src/i18n.js';
import CurrencyCodes from 'currency-codes/data';
import RadioGroup from '@components/RadioGroup.js';
import { Input, Select } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import MultilineInput from '@components/MultilineInput.js';
import { AnimalTypeaheadInput } from '@screens/animals/AnimalTypeaheadScreen.js';

export default class TransactionItemSettings {
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

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        transaction_id: undefined,
        relation_id: undefined,
        resource_id: undefined,
        resource_type: 'Animal',
        direction: 'to',
        type: 'animal',
        attribute: '',
        value: '',
    })

    /**
     * Parses additional details from response.
     *
     * @param {object} item
     */
    static parser(item) {
        item.resource_id = item.resource_id || item.resource && item.resource.id || undefined;
        item.relation_id = item.relation_id || item.relation && item.relation.id || undefined;
        item.transaction_id = item.transaction_id || item.transaction && item.transaction.id || undefined;
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
                    key: 'direction',
                    title: i18n.t('Direction'),
                    renderEdit: function DirectionEditRender([state, mergeState]) {
                        return (
                            <RadioGroup
                                options={{
                                    'to': i18n.t('You - You deliver'),
                                    'from': i18n.t('Them - You receive'),
                                }}
                                selected={state.direction}
                                onChange={(key) => mergeState({
                                    direction: key,
                                })}
                            />
                        );
                    },
                },
                {
                    key: 'type',
                    title: i18n.t('Type'),
                    renderEdit: function TypeEditRender([state, mergeState]) {
                        return (
                            <RadioGroup
                                options={{
                                    'animal': i18n.t('Animal'),
                                    'currency': i18n.t('Currency'),
                                    'other': i18n.t('Other'),
                                }}
                                selected={state.type}
                                onChange={(key) => mergeState({
                                    type: key,
                                })}
                            />
                        );
                    },
                },

                /**
                 * Animal
                 */
                {
                    key: 'resource_id',
                    title: i18n.t('Animal'),
                    shouldRender: (view, form) => form.type === 'animal',
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

                /**
                 * Currency
                 */
                {
                    key: 'attribute',
                    title: i18n.t('Currency'),
                    shouldRender: (view, form) => form.type === 'currency',
                    renderEdit: function CurrencyEditRender([state, mergeState]) {
                        const currencies = CurrencyCodes.map(currency => ({
                            key: currency.code,
                            text: currency.code + ' - ' + currency.currency,
                        }));

                        return (
                            <Select
                                data={currencies}
                                keyExtractor={item => item.key}
                                selectedOption={currencies.find(currency => currency.key === state.attribute)}
                                onSelect={(value) => mergeState({
                                    attribute: value.key,
                                })}
                            />
                        );
                    },
                },
                {
                    key: 'value',
                    title: i18n.t('Amount'),
                    shouldRender: (view, form) => form.type === 'currency',
                    renderEdit: function AmountEditRender([state, mergeState]) {
                        return <Input
                            value={String(state.value)}
                            keyboardType="numeric"
                            onChangeText={(value) => mergeState({
                                value: parseFloat(value),
                            })}
                        />;
                    },
                },

                /**
                 * Other
                 */
                {
                    key: 'attribute',
                    title: i18n.t('Note'),
                    shouldRender: (view, form) => form.type === 'other',
                    multilineEdit: () => true,
                    renderEdit: function NotesEditRender([state, mergeState]) {
                        return <MultilineInput
                            numberOfLines={4}
                            value={state.attribute}
                            onChangeText={(value) => mergeState({ attribute: value })}
                        />;
                    },
                },
            ],
        },
    ]
}
