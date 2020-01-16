import React from 'react';
import i18n from '@src/i18n.js';
import ContactRow from '@components/rows/ContactRow.js';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_CONTACTS from '@graphql/queries/Contact/listContacts.gql.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

export default function ContactListScreen({ layout, ...props }) {
    return (
        <ResourceList
            preview={ContactRow}
            fetch={LIST_CONTACTS}
            title={ContactSettings.title}
            name={i18n.t('Contact', { count: 2 })}

            extraData={{
                layout,
            }}

            routes={{
                view: 'ContactView',
                edit: 'ContactEdit',
            }}

            mutations={{
                remove: DELETE_CONTACTS,
            }}

            sorting={[
                { key: 'id', text: i18n.t('Recent') },
                { key: 'name', text: i18n.t('Name') },
                { key: 'email', text: i18n.t('Email') },
                { key: 'phone', text: i18n.t('Phone') },
                { key: 'address', text: i18n.t('Address') },
            ]}

            {...props}
        />
    );
}

ContactListScreen.navigationOptions = ResourceList.navigationOptions;
