import React from 'react';
import { Layout } from '@ui-kitten/components';
import EventSettings from '@settings/EventSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_EVENT from '@graphql/queries/Event/viewEvent.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';

export default function EventViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={EventSettings.fields}
                parser={EventSettings.parser}
                headers={EventSettings.headers}
                fetch={VIEW_EVENT}

                mutations={{
                    remove: DELETE_EVENTS,
                }}
                    
                routes={{
                    edit: 'EventEdit',
                }}
            />
        </Layout>
    )
}

EventViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props,
    title: EventSettings.title,
    canModify: EventSettings.canModify,
});
