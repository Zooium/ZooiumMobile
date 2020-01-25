import React from 'react';
import i18n from '@src/i18n.js';
import Location from '@models/Location.model.js';
import LocationRow from '@components/rows/LocationRow.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_LOCATIONS from '@graphql/queries/Location/listLocations.gql.js';
import DELETE_LOCATIONS from '@graphql/mutations/Location/deleteLocations.gql.js';

export default function LocationListScreen({ layout, ...props }) {
    return (
        <ResourceList
            preview={LocationRow}
            fetch={LIST_LOCATIONS}
            title={Location.title}
            name={i18n.t('Location', { count: 2 })}

            extraData={{
                layout,
            }}
            
            routes={{
                view: 'LocationView',
                edit: 'LocationEdit',
            }}

            mutations={{
                remove: DELETE_LOCATIONS,
            }}

            sorting={[
                { key: 'id', text: i18n.t('Recent') },
                { key: 'name', text: i18n.t('Name') },
                { key: 'address', text: i18n.t('Address') },
            ]}

            {...props}
        />
    );
}

LocationListScreen.navigationOptions = (props) => ({
    ...ResourceList.navigationOptions(props),
    title: i18n.t('Location', { count: 2 }),
});
