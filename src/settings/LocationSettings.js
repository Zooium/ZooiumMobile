import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { Input } from '@ui-kitten/components';

export default class LocationSettings {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Location', { count: 1 }),
        }) || fallback;
    }
    /**
     * Returns the short resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static shortTitle(item, fallback = undefined) {
        return item && [item.address, item.city].filter(Boolean).join(', ') || fallback;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        name: '',
        address: '',
        city: '',
        postcode: '',
        state: '',
        country: '',
    })

    /**
     * The entity fields.
     *
     * @var {array}
     */
    static fields = [
        /**
         * General Fields
         */
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
    ]

    /**
     * The entity field headers.
     *
     * @var {array}
     */
    static headers = [
        {
            key: 'animals',
            icon: 'dove',
            title: i18n.t('Animal', { count: 2 }),
            color: theme['color-primary-500'],
            navigate: ({ response }) =>  ({
                routeName: (route = 'AnimalList'),
                key: route + (search = 'location:'+response.id),
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
            navigate: ({ response }) =>  ({
                routeName: (route = 'EnclosureList'),
                key: route + (search = 'location:'+response.id),
                params: {
                    search: search,
                    showSearch: true,
                    focusSearch: false,
                    defaults: {
                        location: response || undefined,
                        location_id: response.id || undefined,
                    },
                },
            }),
        },
    ]
}
