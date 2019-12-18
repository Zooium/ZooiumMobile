import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from './components/Typeahead.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import EnclosureRow from '@screens/General/Enclosures/components/EnclosureRow.js';

export function EnclosureTypeaheadInput(resource) {
    return resource.name || '(' + i18n.t('name not set') + ')';
}

export default function EnclosureTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Enclosure', { count: 2 })}
            preview={EnclosureRow}
            fetch={LIST_ENCLOSURES}
            itemProps={{
                layout: {
                    showCount: false,
                },
            }}
        />
    );
}

EnclosureTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
