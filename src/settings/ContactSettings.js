import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { Input } from '@ui-kitten/components';

export default class ContactSettings {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Contact', { count: 1 }),
        }) || fallback;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
    })

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
                {
                    key: 'name',
                    title: i18n.t('Name'),
                    required: true,
                    renderView: resource => resource.name,
                    renderEdit: function NameEditRender([state, mergeState]) {
                        return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                    },
                },
                {
                    key: 'email',
                    title: i18n.t('Email'),
                    renderView: resource => resource.email,
                    renderEdit: function EmailEditRender([state, mergeState]) {
                        return <Input
                            value={state.email}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={(value) => mergeState({ email: value })}
                        />;
                    },
                },
                {
                    key: 'phone',
                    title: i18n.t('Phone'),
                    renderView: resource => resource.phone,
                    renderEdit: function PhoneEditRender([state, mergeState]) {
                        return <Input
                            value={state.phone}
                            autoCompleteType="tel"
                            keyboardType="phone-pad"
                            textContentType="telephoneNumber"
                            onChangeText={(value) => mergeState({ phone: value })}
                        />;
                    },
                },
                {
                    key: 'address',
                    title: i18n.t('Address'),
                    renderView: resource => resource.address,
                    renderEdit: function AddressEditRender([state, mergeState]) {
                        return <Input
                            value={state.address}
                            autoCompleteType="street-address"
                            textContentType="streetAddressLine1"
                            onChangeText={(value) => mergeState({ address: value })}
                        />;
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
    ]

    /**
     * The entity field headers.
     *
     * @var {array}
     */
    static headers = [
        {
            key: 'transactions',
            icon: 'wallet',
            title: i18n.t('Transaction', { count: 2 }),
            color: theme['color-primary-500'],
            navigate: ({ response }) =>  ({
                routeName: (route = 'TransactionList'),
                key: route + (search = 'contact:'+response.id),
                params: {
                    search: search,
                    showSearch: true,
                    focusSearch: false,
                },
            }),
        },
    ]
}
