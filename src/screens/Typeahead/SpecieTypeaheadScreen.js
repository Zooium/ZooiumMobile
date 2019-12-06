import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import { localeName } from '@src/i18n.js';
import { Text } from '@ui-kitten/components';
import Typeahead from './components/Typeahead.js';
import LIST_SPECIES from '@graphql/queries/Specie/listSpecies.gql.js';

export function SpecieTypeaheadInput(resource) {
    return resource[localeName()] || resource.english_name || resource.scientific;
}

export function SpeciePreview({ item }) {
    return (
        <View>
            <Text category="s1">
                {SpecieTypeaheadInput(item)}
            </Text>

            <Text appearance="hint">
                {item.scientific}
            </Text>
        </View>
    );
}

export default function SpecieTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Specie', { count: 2 })}
            preview={SpeciePreview}
            fetch={LIST_SPECIES}
        />
    );
}

SpecieTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
