import React from 'react';
import { Layout } from '@ui-kitten/components';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

export default function EnclosureViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={EnclosureSettings.fields}
                headers={EnclosureSettings.headers}
                fetch={VIEW_ENCLOSURE}

                mutations={{
                    remove: DELETE_ENCLOSURES,
                }}
                    
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
