import React from 'react';
import i18n from '@src/i18n.js';
import Animal from '@models/Animal.model.js';
import AnimalRow from '@components/rows/AnimalRow.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalListScreen({ layout, ...props }) {
    return (
        <ResourceList
            preview={AnimalRow}
            fetch={LIST_ANIMALS}
            name={i18n.t('Animal', { count: 2 })}
            title={Animal.title}

            extraData={{
                layout,
            }}
            
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

            {...props}
        />
    );
}

AnimalListScreen.navigationOptions = (props) => ({
    ...ResourceList.navigationOptions(props),
    title: i18n.t('Animal', { count: 2 }),
});
