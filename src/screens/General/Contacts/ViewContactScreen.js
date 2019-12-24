import React from 'react';
import { Layout } from '@ui-kitten/components';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';

export default function ViewContactScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={ContactSettings.fields}
                fetch={VIEW_CONTACT}
                    
                routes={{
                    edit: 'EditContact',
                }}
            />
        </Layout>
    )
}

ViewContactScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: ContactSettings.title,
});
