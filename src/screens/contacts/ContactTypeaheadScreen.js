import React from 'react';
import i18n from '@src/i18n.js';
import Typeahead from '@components/Typeahead.js';
import ContactRow from '@components/rows/ContactRow.js';
import ContactSettings from '@settings/ContactSettings.js';
import LIST_CONTACTS from '@graphql/queries/Contact/listContacts.gql.js';

export function ContactTypeaheadInput(resource) {
    return ContactSettings.title(resource);
}

export default function ContactTypeaheadScreen() {
    return (
        <Typeahead
            name={i18n.t('Contact', { count: 2 })}
            preview={ContactRow}
            fetch={LIST_CONTACTS}
            itemProps={{
                layout: {
                    showCount: false,
                },
            }}
        />
    );
}

ContactTypeaheadScreen.navigationOptions = Typeahead.navigationOptions;
