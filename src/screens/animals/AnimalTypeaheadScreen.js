import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from '@screens/partials/Typeahead.js';
import AnimalRow from '@components/rows/AnimalRow.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';

export function AnimalTypeaheadInput(resource) {
    return resource && (resource.name || resource.identifier || '(' + i18n.t('name not set') + ')');
}

export default function AnimalTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Animal', { count: 2 })}
            preview={AnimalRow}
            fetch={LIST_ANIMALS}
        />
    );
}

AnimalTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
