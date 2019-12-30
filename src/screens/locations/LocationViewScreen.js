import React from 'react';
import { Layout } from '@ui-kitten/components';
import LocationSettings from '@settings/LocationSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';

export default function LocationViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={LocationSettings.fields}
                headers={LocationSettings.headers}
                fetch={VIEW_LOCATION}
                    
                routes={{
                    edit: 'LocationEdit',
                }}
            />
        </Layout>
    )
}

LocationViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: LocationSettings.title,
});