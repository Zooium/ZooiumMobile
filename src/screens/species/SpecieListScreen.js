import React from 'react';
import i18n from '@src/i18n.js';
import Specie from '@models/Specie.model.js';
import SpecieRow from '@components/rows/SpecieRow.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_SPECIES from '@graphql/queries/Specie/listSpecies.gql.js';

export default function SpecieListScreen(props) {
    return (
        <ResourceList
            preview={SpecieRow}
            fetch={LIST_SPECIES}
            name={i18n.t('Specie', { count: 2 })}
            title={Specie.title}
            
            {...props}
        />
    );
}

SpecieListScreen.navigationOptions = (props) => ResourceList.navigationOptions({
    ...props,
    showAdding: false,
    showFilters: false,
});
