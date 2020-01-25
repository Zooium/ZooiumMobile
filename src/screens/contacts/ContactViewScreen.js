import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { Input } from '@ui-kitten/components';
import Contact from '@models/Contact.model.js';
import MultilineInput from '@components/MultilineInput.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';
import UPDATE_CONTACT from '@graphql/mutations/Contact/updateContact.gql.js';
import CREATE_CONTACT from '@graphql/mutations/Contact/createContact.gql.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

export default function ContactViewScreen(props) {
    return (
        <ResourceWrapper
            items={fields}
            headers={headers}
            formInit={form}

            fetch={VIEW_CONTACT}
            mutations={{
                save: UPDATE_CONTACT,
                create: CREATE_CONTACT,
                remove: DELETE_CONTACTS,
            }}
                
            routes={{
                view: 'ContactView',
                edit: 'ContactEdit',
            }}

            {...props}
        />
    );
}

ContactViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: Contact.title,
});

/**
 * Define resource form.
 */
export const form = () => ({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
})

/**
 * Define resource headers.
 */
export const headers = [
    {
        key: 'transactions',
        icon: 'wallet',
        title: i18n.t('Transaction', { count: 2 }),
        color: theme['color-primary-500'],
        navigate: ({ response, route = 'TransactionList', search = 'contact:'+response.id }) =>  ({
            name: route,
            key: route + search,
            params: {
                search: search,
                showSearch: true,
                focusSearch: false,
                
                createParams: {
                    defaults: {
                        contact: response || undefined,
                        contact_id: response.id || undefined,
                    },
                },
            },
        }),
    },
];

/**
 * Define resource fields.
 */
export const fields = [
    {
        title: i18n.t('General'),

        data: [
            {
                key: 'name',
                title: i18n.t('Name'),
                required: () => true,
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
