import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from './components/Typeahead.js';
import LIST_LOCATIONS from '@graphql/queries/Location/listLocations.gql.js';
import LocationRow from '@screens/General/Locations/components/LocationRow.js';

export function LocationTypeaheadInput(resource) {
    return resource.name || '(' + i18n.t('name not set') + ')';
}

export default function LocationTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Location', { count: 2 })}
            preview={LocationRow}
            fetch={LIST_LOCATIONS}
            itemProps={{
                layout: {
                    showCount: false,
                },
            }}
        />
    );
}

LocationTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
