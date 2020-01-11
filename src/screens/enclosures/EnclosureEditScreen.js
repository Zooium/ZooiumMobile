import React from 'react';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import UPDATE_ENCLOSURE from '@graphql/mutations/Enclosure/updateEnclosure.gql.js';
import CREATE_ENCLOSURE from '@graphql/mutations/Enclosure/createEnclosure.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

export default function EnclosureEditScreen() {
    return (
        <ResourceEdit
            items={EnclosureSettings.fields}
            formInit={EnclosureSettings.formInit}
            formParser={EnclosureSettings.formParser}

            fetch={VIEW_ENCLOSURE}
            mutations={{
                save: UPDATE_ENCLOSURE,
                create: CREATE_ENCLOSURE,
                remove: DELETE_ENCLOSURES,
            }}

            routes={{
                view: 'EnclosureView',
            }}
        />
    );
}

EnclosureEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: EnclosureSettings.title,
});

