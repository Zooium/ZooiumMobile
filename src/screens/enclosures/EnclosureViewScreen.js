import React from 'react';
import { Layout } from '@ui-kitten/components';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';

export default function EnclosureViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={EnclosureSettings.fields}
                headers={EnclosureSettings.headers}
                fetch={VIEW_ENCLOSURE}
                    
                routes={{
                    edit: 'EnclosureEdit',
                }}
            />
        </Layout>
    )
}

EnclosureViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: EnclosureSettings.title,
});
