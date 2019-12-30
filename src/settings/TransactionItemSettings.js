import React from 'react';
import i18n from '@src/i18n.js';
import CurrencyCodes from 'currency-codes/data';
import TypeaheadInput from '@components/TypeaheadInput.js';
import { Input, Radio, Select, RadioGroup } from '@ui-kitten/components';
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
     * Parse resource to form object.
     */
    static formParser = (resource) => ({
        ...resource,
        resource_id: resource.resource && resource.resource.id,
        relation_id: resource.relation && resource.relation.id,
        transaction_id: resource.transaction && resource.transaction.id,
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
                    key: 'direction',
                    title: i18n.t('Direction'),
                    renderEdit: function DirectionEditRender([state, mergeState]) {
                        let directions = {
                            to: i18n.t('You - You deliver'),
                            from: i18n.t('Them - You receive'),
                        };
    
                        return (
                            <RadioGroup
                                selectedIndex={Object.keys(directions).indexOf(state.direction)}
                                onChange={(index) => {
                                    mergeState({
                                        direction: Object.keys(directions)[index],
                                    });
                                }}
                            >
                                {Object.values(directions).map((value, key) => {
                                    return <Radio key={key} text={value} textStyle={{ fontWeight: 'normal' }} />;
                                })}
                            </RadioGroup>
                        );
                    },
                },
                {
                    key: 'type',
                    title: i18n.t('Type'),
                    renderEdit: function TypeEditRender([state, mergeState]) {
                        let types = {
                            animal: i18n.t('Animal'),
                            currency: i18n.t('Currency'),
                            other: i18n.t('Other'),
                        };
    
                        return (
                            <RadioGroup
                                selectedIndex={Object.keys(types).indexOf(state.type)}
                                onChange={(index) => {
                                    mergeState({
                                        type: Object.keys(types)[index],
                                    });
                                }}
                            >
                                {Object.values(types).map((value, key) => {
                                    return <Radio key={key} text={value} textStyle={{ fontWeight: 'normal' }} />;
                                })}
                            </RadioGroup>
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
                        return <Input
                            multiline={true}
                            numberOfLines={4}
                            value={state.attribute}
                            onChangeText={(value) => mergeState({ attribute: value })}
                            // @wip - text in top of element not center.
                        />;
                    },
                },
            ],
        },
    ]
}
