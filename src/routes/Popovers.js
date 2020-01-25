import i18n from '@src/i18n.js';
import React, { Fragment } from 'react';

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
import ResourceList from '@components/resource/ResourceList.js';
import AuthorizedWebView from '@screens/AuthorizedWebViewScreen.js';
import ResourceTypeahead from '@components/resource/ResourceTypeahead.js';

export default function Popovers(Stack) {
    return (
        <Fragment>

            {/* Animals */}
            <Stack.Screen name="AnimalList" component={AnimalList} options={AnimalList.navigationOptions} />
            <Stack.Screen name="AnimalView" component={AnimalView} options={AnimalView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="AnimalEdit" component={AnimalView} options={AnimalView.navigationOptions} initialParams={{ editing: true }} />
            <Stack.Screen name="AnimalTypeahead" component={ResourceTypeahead} options={ResourceTypeahead.navigationOptions} initialParams={{ list: AnimalList }} />
            <Stack.Screen name="AnimalMedia" component={AnimalMedia} options={AnimalMedia.navigationOptions} />
            <Stack.Screen name="AnimalFamily" component={AnimalFamily} options={AnimalFamily.navigationOptions} />

            {/* Enclosures */}
            <Stack.Screen name="EnclosureList" component={EnclosureList} options={EnclosureList.navigationOptions} />
            <Stack.Screen name="EnclosureView" component={EnclosureView} options={EnclosureView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="EnclosureEdit" component={EnclosureView} options={EnclosureView.navigationOptions} initialParams={{ editing: true }} />
            <Stack.Screen name="EnclosureTypeahead" component={ResourceTypeahead} options={ResourceTypeahead.navigationOptions} initialParams={{ list: EnclosureList }} />

            {/* Locations */}
            <Stack.Screen name="LocationList" component={LocationList} options={LocationList.navigationOptions} />
            <Stack.Screen name="LocationView" component={LocationView} options={LocationView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="LocationEdit" component={LocationView} options={LocationView.navigationOptions} initialParams={{ editing: true }} />
            <Stack.Screen name="LocationTypeahead" component={ResourceTypeahead} options={ResourceTypeahead.navigationOptions} initialParams={{ list: LocationList }} />

            {/* Contacts */}
            <Stack.Screen name="ContactList" component={ContactList} options={ContactList.navigationOptions} />
            <Stack.Screen name="ContactView" component={ContactView} options={ContactView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="ContactEdit" component={ContactView} options={ContactView.navigationOptions} initialParams={{ editing: true }} />
            <Stack.Screen name="ContactTypeahead" component={ResourceTypeahead} options={ResourceTypeahead.navigationOptions} initialParams={{ list: ContactList }} />

            {/* Transactions */}
            <Stack.Screen name="TransactionList" component={TransactionList} options={TransactionList.navigationOptions} />
            <Stack.Screen name="TransactionView" component={TransactionView} options={TransactionView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="TransactionEdit" component={TransactionView} options={TransactionView.navigationOptions} initialParams={{ editing: true }} />
            <Stack.Screen name="TransactionItemEdit" component={TransactionItemView} options={TransactionItemView.navigationOptions} initialParams={{ editing: true }} />

            {/* Events */}
            <Stack.Screen name="EventList" component={EventList} options={EventList.navigationOptions} />
            <Stack.Screen name="EventView" component={EventView} options={EventView.navigationOptions} initialParams={{ editing: false }} />
            <Stack.Screen name="EventEdit" component={EventView} options={EventView.navigationOptions} initialParams={{ editing: true }} />

            {/* Files */}
            <Stack.Screen name="FileEdit" component={FileView} options={FileView.navigationOptions} initialParams={{ editing: true }} />

            {/* Species */}
            <Stack.Screen name="SpecieTypeahead" component={ResourceTypeahead} options={ResourceTypeahead.navigationOptions} initialParams={{ list: SpecieList }} />

            {/* Maps */}
            <Stack.Screen name="MapView" component={MapView} initialParams={{ hideTabBar: true }} options={{ headerShown: false }} />

            {/* Utils */}
            <Stack.Screen name="AuthorizedWebView" component={AuthorizedWebView} options={AuthorizedWebView.navigationOptions} initialParams={{ hideTabBar: true }} />

        </Fragment>
    );
}
