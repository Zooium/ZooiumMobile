import React from 'react';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import UPDATE_ENCLOSURE from '@graphql/mutations/Enclosure/updateEnclosure.gql.js';
import CREATE_ENCLOSURE from '@graphql/mutations/Enclosure/createEnclosure.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

export default function EnclosureViewScreen(props) {
    return (
        <ResourceWrapper
            items={EnclosureSettings.fields}
            parser={EnclosureSettings.parser}
            headers={EnclosureSettings.headers}
            formInit={EnclosureSettings.formInit}

            fetch={VIEW_ENCLOSURE}
            mutations={{
                save: UPDATE_ENCLOSURE,
                create: CREATE_ENCLOSURE,
                remove: DELETE_ENCLOSURES,
            }}
                
            routes={{
                view: 'EnclosureView',
                edit: 'EnclosureEdit',
            }}

            {...props}
        />
    );
}

EnclosureViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: EnclosureSettings.title,
});
