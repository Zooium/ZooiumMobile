import i18n from '@src/i18n.js';

import ViewAnimal from '@screens/General/Animals/ViewAnimalScreen.js';
import EditAnimal from '@screens/General/Animals/EditAnimalScreen.js';
import ListAnimals from '@screens/General/Animals/ListAnimalsScreen.js';
import AnimalEvent from '@screens/General/Animals/AnimalEventScreen.js';
import AnimalMedia from '@screens/General/Animals/AnimalMediaScreen.js';
import AnimalFamily from '@screens/General/Animals/AnimalFamilyScreen.js';

import ViewEnclosure from '@screens/General/Enclosures/ViewEnclosureScreen.js';
import EditEnclosure from '@screens/General/Enclosures/EditEnclosureScreen.js';
import ListEnclosures from '@screens/General/Enclosures/ListEnclosuresScreen.js';

import ViewLocation from '@screens/General/Locations/ViewLocationScreen.js';
import EditLocation from '@screens/General/Locations/EditLocationScreen.js';
import ListLocations from '@screens/General/Locations/ListLocationsScreen.js';

import ViewContact from '@screens/General/Contacts/ViewContactScreen.js';
import EditContact from '@screens/General/Contacts/EditContactScreen.js';
import ListContacts from '@screens/General/Contacts/ListContactsScreen.js';

import AnimalTypeahead from '@screens/Typeahead/AnimalTypeaheadScreen.js';
import SpecieTypeahead from '@screens/Typeahead/SpecieTypeaheadScreen.js';
import LocationTypeahead from '@screens/Typeahead/LocationTypeaheadScreen.js';
import EnclosureTypeahead from '@screens/Typeahead/EnclosureTypeaheadScreen.js';

import EditFile from '@screens/General/Files/EditFileScreen.js';

import AuthorizedWebView from '@screens/Utils/AuthorizedWebViewScreen.js';

export default {
    // Animals
    ListAnimals: {
        screen: ListAnimals,
        navigationOptions: {
            title: i18n.t('Animal', { count: 2 }),
        },
    }, ViewAnimal, EditAnimal,
    AnimalMedia, AnimalFamily, AnimalEvent,

    // Enclosures
    ListEnclosures: {
        screen: ListEnclosures,
        navigationOptions: {
            title: i18n.t('Enclosure', { count: 2 }),
        },
    }, ViewEnclosure, EditEnclosure,

    // Locations
    ListLocations: {
        screen: ListLocations,
        navigationOptions: {
            title: i18n.t('Location', { count: 2 }),
        },
    }, ViewLocation, EditLocation,

    // Contacts
    ListContacts: {
        screen: ListContacts,
        navigationOptions: {
            title: i18n.t('Contact', { count: 2 }),
        },
    }, ViewContact, EditContact,

    // Typeaheads
    AnimalTypeahead, SpecieTypeahead,
    LocationTypeahead, EnclosureTypeahead,

    // Files
    EditFile,

    // Utils
    AuthorizedWebView: {
        screen: AuthorizedWebView,
        params: {
            isModal: true,
            hideTabBar: true,
        },
    },
};
