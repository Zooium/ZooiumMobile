import React from 'react';
import { Layout } from '@ui-kitten/components';
import ContactSettings from '@settings/ContactSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_CONTACT from '@graphql/queries/Contact/viewContact.gql.js';

export default function ContactViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={ContactSettings.fields}
                headers={ContactSettings.headers}
                fetch={VIEW_CONTACT}
                    
                routes={{
                    edit: 'ContactEdit',
                }}
            />
        </Layout>
    )
}

ContactViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: ContactSettings.title,
});
