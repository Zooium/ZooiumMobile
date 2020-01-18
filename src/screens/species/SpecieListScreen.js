import React from 'react';
import i18n from '@src/i18n.js';
import SpecieRow from '@components/rows/SpecieRow.js';
import SpecieSettings from '@settings/SpecieSettings.js';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_SPECIES from '@graphql/queries/Specie/listSpecies.gql.js';

export default function SpecieListScreen(props) {
    return (
        <ResourceList
            preview={SpecieRow}
            fetch={LIST_SPECIES}
            name={i18n.t('Specie', { count: 2 })}
            title={SpecieSettings.title}
            
            {...props}
        />
    );
}

SpecieListScreen.navigationOptions = ResourceList.navigationOptions;
