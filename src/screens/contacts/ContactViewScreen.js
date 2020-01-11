import React from 'react';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

export default function ContactViewScreen() {
    return (
        <ResourceView
            items={ContactSettings.fields}
            headers={ContactSettings.headers}
            fetch={VIEW_CONTACT}

            mutations={{
                remove: DELETE_CONTACTS,
            }}
                
            routes={{
                edit: 'ContactEdit',
            }}
        />
    );
}

ContactViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: ContactSettings.title,
});
