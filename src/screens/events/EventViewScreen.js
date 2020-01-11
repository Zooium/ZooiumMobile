import React from 'react';
import EventSettings from '@settings/EventSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_EVENT from '@graphql/queries/Event/viewEvent.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';

export default function EventViewScreen() {
    return (
        <ResourceView
            items={EventSettings.fields}
            parser={EventSettings.parser}
            fetch={VIEW_EVENT}

            mutations={{
                remove: DELETE_EVENTS,
            }}
                
            routes={{
                edit: 'EventEdit',
            }}
        />
    );
}

EventViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props,
    title: EventSettings.title,
    canModify: EventSettings.canModify,
});
