import i18n from '@src/i18n.js';

import AnimalList from '@screens/animals/AnimalListScreen.js';
import AnimalView from '@screens/animals/AnimalViewScreen.js';
import AnimalMedia from '@screens/animals/AnimalMediaScreen.js';
import AnimalFamily from '@screens/animals/AnimalFamilyScreen.js';

import EnclosureList from '@screens/enclosures/EnclosureListScreen.js';
import EnclosureView from '@screens/enclosures/EnclosureViewScreen.js';

import LocationList from '@screens/locations/LocationListScreen.js';
import LocationView from '@screens/locations/LocationViewScreen.js';

import ContactList from '@screens/contacts/ContactListScreen.js';
import ContactView from '@screens/contacts/ContactViewScreen.js';

import TransactionList from '@screens/transactions/TransactionListScreen.js';
import TransactionView from '@screens/transactions/TransactionViewScreen.js';
import TransactionItemView from '@screens/transactions/TransactionItemViewScreen.js';

import EventList from '@screens/events/EventListScreen.js';
import EventView from '@screens/events/EventViewScreen.js';

import MapView from '@screens/MapViewScreen.js';
import FileView from '@screens/FileViewScreen.js';
import SpecieList from '@screens/species/SpecieListScreen.js';
import AuthorizedWebView from '@screens/AuthorizedWebViewScreen.js';
import ResourceTypeahead from '@components/resource/ResourceTypeahead.js';

export default {
    // Animals
    AnimalList: {
        screen: AnimalList,
        navigationOptions: {
            title: i18n.t('Animal', { count: 2 }),
        },
    },
    AnimalEdit: { screen: AnimalView, params: { editing: true } },
    AnimalView: { screen: AnimalView, params: { editing: false } },
    AnimalTypeahead: { screen: ResourceTypeahead, params: { list: AnimalList } },
    AnimalMedia, AnimalFamily,

    // Enclosures
    EnclosureList: {
        screen: EnclosureList,
        navigationOptions: {
            title: i18n.t('Enclosure', { count: 2 }),
        },
    },
    EnclosureEdit: { screen: EnclosureView, params: { editing: true } },
    EnclosureView: { screen: EnclosureView, params: { editing: false } },
    EnclosureTypeahead: { screen: ResourceTypeahead, params: { list: EnclosureList } },

    // Locations
    LocationList: {
        screen: LocationList,
        navigationOptions: {
            title: i18n.t('Location', { count: 2 }),
        },
    },
    LocationEdit: { screen: LocationView, params: { editing: true } },
    LocationView: { screen: LocationView, params: { editing: false } },
    LocationTypeahead: { screen: ResourceTypeahead, params: { list: LocationList } },

    // Contacts
    ContactList: {
        screen: ContactList,
        navigationOptions: {
            title: i18n.t('Contact', { count: 2 }),
        },
    },
    ContactEdit: { screen: ContactView, params: { editing: true } },
    ContactView: { screen: ContactView, params: { editing: false } },
    ContactTypeahead: { screen: ResourceTypeahead, params: { list: ContactList } },

    // Transactions
    TransactionList: {
        screen: TransactionList,
        navigationOptions: {
            title: i18n.t('Transaction', { count: 2 }),
        },
    },
    TransactionEdit: { screen: TransactionView, params: { editing: true } },
    TransactionView: { screen: TransactionView, params: { editing: false } },
    TransactionItemEdit: { screen: TransactionItemView, params: { editing: true } },

    // Events
    EventList: {
        screen: EventList,
        navigationOptions: {
            title: i18n.t('Event', { count: 2 }),
        },
    },
    EventEdit: { screen: EventView, params: { editing: true } },
    EventView: { screen: EventView, params: { editing: false } },

    // Species
    SpecieTypeahead: { screen: ResourceTypeahead, params: { list: SpecieList } },

    // Files
    FileEdit: { screen: FileView, params: { editing: true } },

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
