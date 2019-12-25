import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from '@screens/partials/Typeahead.js';
import LocationRow from '@components/rows/LocationRow.js';
import LocationSettings from '@settings/LocationSettings.js';
import LIST_LOCATIONS from '@graphql/queries/Location/listLocations.gql.js';

export function LocationTypeaheadInput(resource) {
    return LocationSettings.title(resource);
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
