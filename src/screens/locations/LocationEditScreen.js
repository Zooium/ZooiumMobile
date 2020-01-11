import React from 'react';
import LocationSettings from '@settings/LocationSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';
import UPDATE_LOCATION from '@graphql/mutations/Location/updateLocation.gql.js';
import CREATE_LOCATION from '@graphql/mutations/Location/createLocation.gql.js';
import DELETE_LOCATIONS from '@graphql/mutations/Location/deleteLocations.gql.js';

export default function LocationEditScreen() {
    return (
        <ResourceEdit
            items={LocationSettings.fields}
            formInit={LocationSettings.formInit}
            
            fetch={VIEW_LOCATION}
            mutations={{
                save: UPDATE_LOCATION,
                create: CREATE_LOCATION,
                remove: DELETE_LOCATIONS,
            }}

            routes={{
                view: 'LocationView',
            }}
        />
    );
}

LocationEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: LocationSettings.title,
});
