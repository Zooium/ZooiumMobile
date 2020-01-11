import React from 'react';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';
import UPDATE_CONTACT from '@graphql/mutations/Contact/updateContact.gql.js';
import CREATE_CONTACT from '@graphql/mutations/Contact/createContact.gql.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

export default function ContactEditScreen() {
    return (
        <ResourceEdit
            items={ContactSettings.fields}
            formInit={ContactSettings.formInit}
            
            fetch={VIEW_CONTACT}
            mutations={{
                save: UPDATE_CONTACT,
                create: CREATE_CONTACT,
                remove: DELETE_CONTACTS,
            }}

            routes={{
                view: 'ContactView',
            }}
        />
    );
}

ContactEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: ContactSettings.title,
});
