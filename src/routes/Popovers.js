import i18n from '@src/i18n.js';

import AnimalList from '@screens/animals/AnimalListScreen.js';
import AnimalView from '@screens/animals/AnimalViewScreen.js';
import AnimalEdit from '@screens/animals/AnimalEditScreen.js';
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
import ContactTypeahead from '@screens/contacts/ContactTypeaheadScreen.js';

import TransactionList from '@screens/transactions/TransactionListScreen.js';
import TransactionView from '@screens/transactions/TransactionViewScreen.js';
import TransactionEdit from '@screens/transactions/TransactionEditScreen.js';
import TransactionItemEdit from '@screens/transactions/items/TransactionItemEditScreen.js';

import EventList from '@screens/events/EventListScreen.js';
import EventView from '@screens/events/EventViewScreen.js';
import EventEdit from '@screens/events/EventEditScreen.js';

import MapView from '@screens/MapViewScreen.js';
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
    AnimalMedia, AnimalFamily,

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

    // Transactions
    TransactionList: {
        screen: TransactionList,
        navigationOptions: {
            title: i18n.t('Transaction', { count: 2 }),
        },
    }, TransactionView, TransactionEdit, TransactionItemEdit,

    // Events
    EventList: {
        screen: EventList,
        navigationOptions: {
            title: i18n.t('Event', { count: 2 }),
        },
    }, EventView, EventEdit,

    // Typeaheads
    AnimalTypeahead, SpecieTypeahead,
    LocationTypeahead, EnclosureTypeahead,
    ContactTypeahead,

    // Files
    FileEdit,

    // Map
    MapView: {
        screen: MapView,
        params: {
            hideTabBar: true,
        },
        navigationOptions: {
            headerShown: false,
        },
    },

    // Utils
    AuthorizedWebView: {
        screen: AuthorizedWebView,
        params: {
            hideTabBar: true,
        },
    },
}
