import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import AnimalRow from '@components/rows/AnimalRow.js';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

function AnimalListScreen({ navigation }) {
    const preview = ({ item }) => AnimalRow({ item, navigation });

    return (
        <ResourceList
            preview={preview}
            fetch={LIST_ANIMALS}
            name={i18n.t('Animal', { count: 2 })}
            title={AnimalSettings.title}
            
            routes={{
                view: 'AnimalView',
                edit: 'AnimalEdit',
            }}

            mutations={{
                remove: DELETE_ANIMALS,
            }}

            filters={[
                { key: 'active', text: i18n.t('Active') },
                { key: 'inactive:sold', text: i18n.t('Sold') },
                { key: 'inactive:deceased', text: i18n.t('Deceased') },
            ]}

            sorting={[
                { key: 'id', text: i18n.t('Recent') },
                { key: 'identifier', text: i18n.t('ID') },
                { key: 'name', text: i18n.t('Name') },
                { key: 'specie', text: i18n.t('Specie', { count: 1 }) },
                { key: 'enclosure', text: i18n.t('Enclosure', { count: 1 }) },
            ]}
        />
    );
}

AnimalListScreen.navigationOptions = ResourceList.navigationOptions;
AnimalListScreen.propTypes = {
    item: PropTypes.object,
}

export default withNavigation(AnimalListScreen);
