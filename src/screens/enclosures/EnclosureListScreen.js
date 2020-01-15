import React from 'react';
import i18n from '@src/i18n.js';
import { withNavigation } from 'react-navigation';
import EnclosureRow from '@components/rows/EnclosureRow.js';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

function EnclosureListScreen({ header, layout, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => EnclosureRow({ item, header, navigation, layout });

    return (
        <ResourceList
            preview={preview}
            fetch={LIST_ENCLOSURES}
            title={EnclosureSettings.title}
            variables={variables}
            showRefresh={showRefresh}
            name={i18n.t('Enclosure', { count: 2 })}

            deps={[
                header, layout,
            ]}
            
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
        />
    );
}

EnclosureListScreen.navigationOptions = ResourceList.navigationOptions;
export default withNavigation(EnclosureListScreen);
