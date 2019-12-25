import i18n from '@src/i18n.js';

import AnimalList from '@screens/animals/AnimalListScreen.js';
import AnimalView from '@screens/animals/AnimalViewScreen.js';
import AnimalEdit from '@screens/animals/AnimalEditScreen.js';
import AnimalEvent from '@screens/animals/AnimalEventScreen.js';
import AnimalMedia from '@screens/animals/AnimalMediaScreen.js';
import AnimalFamily from '@screens/animals/AnimalFamilyScreen.js';
import AnimalTypeahead from '@screens/animals/AnimalTypeaheadScreen.js';

import EnclosureList from '@screens/enclosures/EnclosureListScreen.js';
import EnclosureView from '@screens/enclosures/EnclosureViewScreen.js';
import EnclosureEdit from '@screens/enclosures/EnclosureEditScreen.js';
import EnclosureTypeahead from '@screens/enclosures/EnclosureTypeaheadScreen.js';

import LocationList from '@screens/locations/LocationListScreen.js';
import LocationView from '@screens/locations/LocationViewScreen.js';
import LocationEdit from '@screens/locations/LocationEditScreen.js';
import LocationTypeahead from '@screens/locations/LocationTypeaheadScreen.js';

import ContactList from '@screens/contacts/ContactListScreen.js';
import ContactView from '@screens/contacts/ContactViewScreen.js';
import ContactEdit from '@screens/contacts/ContactEditScreen.js';

import FileEdit from '@screens/FileEditScreen.js';
import SpecieTypeahead from '@screens/SpecieTypeaheadScreen.js';
import AuthorizedWebView from '@screens/AuthorizedWebViewScreen.js';

export default {
    // Animals
    AnimalList: {
        screen: AnimalList,
        navigationOptions: {
            title: i18n.t('Animal', { count: 2 }),
        },
    }, AnimalView, AnimalEdit,
    AnimalMedia, AnimalFamily, AnimalEvent,

    // Enclosures
    EnclosureList: {
        screen: EnclosureList,
        navigationOptions: {
            title: i18n.t('Enclosure', { count: 2 }),
        },
    }, EnclosureView, EnclosureEdit,

    // Locations
    LocationList: {
        screen: LocationList,
        navigationOptions: {
            title: i18n.t('Location', { count: 2 }),
        },
    }, LocationView, LocationEdit,

    // Contacts
    ContactList: {
        screen: ContactList,
        navigationOptions: {
            title: i18n.t('Contact', { count: 2 }),
        },
    }, ContactView, ContactEdit,

    // Typeaheads
    AnimalTypeahead, SpecieTypeahead,
    LocationTypeahead, EnclosureTypeahead,

    // Files
    FileEdit,

    // Utils
    AuthorizedWebView: {
        screen: AuthorizedWebView,
        params: {
            isModal: true,
            hideTabBar: true,
        },
    },
}
