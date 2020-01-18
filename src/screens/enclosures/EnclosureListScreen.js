import React from 'react';
import i18n from '@src/i18n.js';
import Enclosure from '@models/Enclosure.model.js';
import EnclosureRow from '@components/rows/EnclosureRow.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

export default function EnclosureListScreen({ header, layout, ...props }) {
    return (
        <ResourceList
            preview={EnclosureRow}
            fetch={LIST_ENCLOSURES}
            title={Enclosure.title}
            name={i18n.t('Enclosure', { count: 2 })}

            extraData={{
                header, layout,
            }}

            routes={{
                view: 'EnclosureView',
                edit: 'EnclosureEdit',
            }}

            mutations={{
                remove: DELETE_ENCLOSURES,
            }}

            sorting={[
                { key: 'id', text: i18n.t('Recent') },
                { key: 'name', text: i18n.t('Name') },
                { key: 'location', text: i18n.t('Location', { count: 1 }) },
            ]}

            {...props}
        />
    );
}

EnclosureListScreen.navigationOptions = ResourceList.navigationOptions;
