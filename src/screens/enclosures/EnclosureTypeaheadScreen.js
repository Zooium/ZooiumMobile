import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from '@components/Typeahead.js';
import EnclosureRow from '@components/rows/EnclosureRow.js';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';

export function EnclosureTypeaheadInput(resource) {
    return EnclosureSettings.title(resource);
}

export default function EnclosureTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Enclosure', { count: 2 })}
            preview={EnclosureRow}
            fetch={LIST_ENCLOSURES}
            extraData={{
                layout: {
                    showCount: false,
                },
            }}
        />
    );
}

EnclosureTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
