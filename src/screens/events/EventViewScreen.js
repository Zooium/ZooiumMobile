import React from 'react';
import EventSettings from '@settings/EventSettings.js';
import VIEW_EVENT from '@graphql/queries/Event/viewEvent.gql.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import UPDATE_EVENT from '@graphql/mutations/Event/updateEvent.gql.js';
import CREATE_EVENT from '@graphql/mutations/Event/createEvent.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';

export default function EventViewScreen(props) {
    return (
        <ResourceWrapper
            items={EventSettings.fields}
            parser={EventSettings.parser}
            formInit={EventSettings.formInit}
            canModify={EventSettings.canModify}

            fetch={VIEW_EVENT}
            mutations={{
                save: UPDATE_EVENT,
                create: CREATE_EVENT,
                remove: DELETE_EVENTS,
            }}
                
            routes={{
                view: 'EventView',
                edit: 'EventEdit',
            }}

            {...props}
        />
    );
}

EventViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props,
    title: EventSettings.title,
    canModify: EventSettings.canModify,
});
