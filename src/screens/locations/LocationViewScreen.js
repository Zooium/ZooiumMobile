import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { Input } from '@ui-kitten/components';
import Location from '@models/Location.model.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';
import UPDATE_LOCATION from '@graphql/mutations/Location/updateLocation.gql.js';
import CREATE_LOCATION from '@graphql/mutations/Location/createLocation.gql.js';
import DELETE_LOCATIONS from '@graphql/mutations/Location/deleteLocations.gql.js';

export default function LocationViewScreen(props) {
    return (
        <ResourceWrapper
            items={fields}
            headers={headers}
            formInit={form}

            fetch={VIEW_LOCATION}
            mutations={{
                save: UPDATE_LOCATION,
                create: CREATE_LOCATION,
                remove: DELETE_LOCATIONS,
            }}
                
            routes={{
                view: 'LocationView',
                edit: 'LocationEdit',
            }}

            {...props}
        />
    );
}

LocationViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: Location.title,
});

/**
 * Define resource form.
 */
export const form = () => ({
    name: '',
    address: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
})

/**
 * Define resource headers.
 */
export const headers = [
    {
        key: 'animals',
        icon: 'dove',
        title: i18n.t('Animal', { count: 2 }),
        color: theme['color-primary-500'],
        navigate: ({ response, route = 'AnimalList', search = 'location:'+response.id }) =>  ({
            name: route,
            key: route + search,
            params: {
                search: search,
                showSearch: true,
                focusSearch: false,
            },
        }),
    },
    {
        key: 'enclosures',
        icon: 'map-marked-alt',
        title: i18n.t('Enclosure', { count: 2 }),
        color: theme['color-success-500'],
        navigate: ({ response, route = 'EnclosureList', search = 'location:'+response.id }) =>  ({
            name: route,
            key: route + search,
            params: {
                search: search,
                showSearch: true,
                focusSearch: false,

                createParams: {
                    defaults: {
                        location: response || undefined,
                        location_id: response.id || undefined,
                    },
                },
            },
        }),
    },
];

/**
 * Define resource fields.
 */
export const fields = [
    {
        title: i18n.t('General'),

        data: [
            {
                key: 'name',
                title: i18n.t('Name'),
                required: () => true,
                renderView: resource => resource.name,
                renderEdit: function NameEditRender([state, mergeState]) {
                    return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                },
            },
            {
                key: 'address',
                title: i18n.t('Address'),
                renderView: resource => resource.address,
                renderEdit: function AddressEditRender([state, mergeState]) {
                    return <Input value={state.address} onChangeText={(value) => mergeState({ address: value })} />;
                },
            },
            {
                key: 'city',
                title: i18n.t('City'),
                renderView: resource => resource.city,
                renderEdit: function CityEditRender([state, mergeState]) {
                    return <Input value={state.city} onChangeText={(value) => mergeState({ city: value })} />;
                },
            },
            {
                key: 'postcode',
                title: i18n.t('Postcode'),
                renderView: resource => resource.postcode,
                renderEdit: function PostcodeEditRender([state, mergeState]) {
                    return <Input value={state.postcode} onChangeText={(value) => mergeState({ postcode: value })} />;
                },
            },
            {
                key: 'state',
                title: i18n.t('State'),
                renderView: resource => resource.state,
                renderEdit: function StateEditRender([state, mergeState]) {
                    return <Input value={state.state} onChangeText={(value) => mergeState({ state: value })} />;
                },
            },
            {
                key: 'country',
                title: i18n.t('Country'),
                renderView: resource => resource.country,
                renderEdit: function CountryEditRender([state, mergeState]) {
                    return <Input value={state.country} onChangeText={(value) => mergeState({ country: value })} />;
                },
            },
        ],
    },
];
