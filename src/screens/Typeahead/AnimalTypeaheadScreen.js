import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from './components/Typeahead.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import AnimalRow from '@screens/General/Animals/components/AnimalRow.js';

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
