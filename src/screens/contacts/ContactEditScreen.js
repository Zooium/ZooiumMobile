import React from 'react';
import { Layout } from '@ui-kitten/components';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import UPDATE_CONTACT from '@graphql/mutations/Contact/updateContact.gql.js';
import CREATE_CONTACT from '@graphql/mutations/Contact/createContact.gql.js';
import DELETE_CONTACTS from '@graphql/mutations/Contact/deleteContacts.gql.js';

export default function ContactEditScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
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
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

ContactEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: ContactSettings.title,
});
