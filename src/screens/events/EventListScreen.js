import React from 'react';
import i18n from '@src/i18n.js';
import Event from '@models/Event.model.js';
import EventRow from '@components/rows/EventRow.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_EVENTS from '@graphql/queries/Event/listEvents.gql.js';
import DELETE_EVENTS from '@graphql/mutations/Event/deleteEvents.gql.js';

export default function EventListScreen({ layout, ...props }) {
    return (
        <ResourceList
            preview={EventRow}
            fetch={LIST_EVENTS}
            title={Event.title}
            canModify={Event.canModify}
            name={i18n.t('Event', { count: 2 })}

            extraData={{
                layout,
            }}
            
            routes={{
                view: 'EventView',
                edit: 'EventEdit',
            }}

            mutations={{
                remove: DELETE_EVENTS,
            }}

            defaultSort="occurred"
            sorting={[
                { key: 'occurred', text: i18n.t('Occurred') },
                { key: 'id', text: i18n.t('Recent') },
                { key: 'state', text: i18n.t('State') },
                { key: 'value', text: i18n.t('Value') },
            ]}

            {...props}
        />
    );
}

EventListScreen.navigationOptions = ResourceList.navigationOptions;
