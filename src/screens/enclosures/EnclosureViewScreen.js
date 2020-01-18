import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import MapView from '@components/MapView.js';
import { TouchableOpacity } from 'react-native';
import Location from '@models/Location.model.js';
import Enclosure from '@models/Enclosure.model.js';
import { Text, Input } from '@ui-kitten/components';
import TypeaheadInput from '@components/TypeaheadInput.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import UPDATE_ENCLOSURE from '@graphql/mutations/Enclosure/updateEnclosure.gql.js';
import CREATE_ENCLOSURE from '@graphql/mutations/Enclosure/createEnclosure.gql.js';
import DELETE_ENCLOSURES from '@graphql/mutations/Enclosure/deleteEnclosures.gql.js';

export default function EnclosureViewScreen(props) {
    return (
        <ResourceWrapper
            items={fields}
            headers={headers}

            formInit={form}
            parser={parser}

            fetch={VIEW_ENCLOSURE}
            mutations={{
                save: UPDATE_ENCLOSURE,
                create: CREATE_ENCLOSURE,
                remove: DELETE_ENCLOSURES,
            }}
                
            routes={{
                view: 'EnclosureView',
                edit: 'EnclosureEdit',
            }}

            {...props}
        />
    );
}

EnclosureViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: Enclosure.title,
});

/**
 * Define resource form.
 */
export const form = () => ({
    name: '',
    location_id: undefined,
})

/**
 * Define resource parser.
 */
export const parser = (item) => {
    item.location_id = item.location_id || item.location && item.location.id || undefined;
}

/**
 * Define resource headers.
 */
export const headers = [
    {
        key: 'animals',
        icon: 'dove',
        title: i18n.t('Animal', { count: 2 }),
        color: theme['color-primary-500'],
        navigate: ({ response, route = 'AnimalList', search = 'enclosure:'+response.id }) =>  ({
            routeName: route,
            key: route + search,
            params: {
                search: search,
                showSearch: true,
                focusSearch: false,
                
                createParams: {
                    defaults: {
                        enclosure: response || undefined,
                        enclosure_id: response.id || undefined,
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
                key: 'location_id',
                title: i18n.t('Location', { count: 1 }),
                renderView: function LocationViewRender(resource, { navigation }) {
                    const location = resource && resource.location;       
                    if (! location) return undefined;

                    return (
                        <TouchableOpacity onPress={() => {
                            const route = 'LocationView';
                            navigation.navigate({
                                key: route + location.id,
                                routeName: route,
                                params: {
                                    item: location,
                                },
                            })
                        }}>
                            <Text status="primary">{location.name}</Text>

                            <Text category="c1" appearance="hint">
                                {Location.shortTitle(location, '(' + i18n.t('not provided') + ')')}
                            </Text>
                        </TouchableOpacity>
                    );
                },
                renderEdit: function LocationEditRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="LocationEdit"
                            view="LocationTypeahead"
                            resource={i18n.t('Location')}
                            preview={Location.title}

                            value={state.location}
                            onChange={(value) => mergeState({
                                location: value,
                                location_id: value && value.id || null,
                            })}
                        />
                    );
                },
            },
            {
                key: 'coordinates',
                title: i18n.t('Coordinates'),
                descriptionEdit: () => i18n.t('Select by pressing a location on the map or long-pressing the marker and dragging it around.'),
                renderView: function CoordinatesViewRender(resource) {
                    return resource.latitude && resource.longitude && (
                        <MapView
                            editable={false}
                            latitude={resource.latitude}
                            longitude={resource.longitude}
                        />
                    );
                },
                renderEdit: function CoordinatesEditRender([state, mergeState]) {
                    return (
                        <MapView
                            editable={true}
                            latitude={state.coordinate && state.coordinate.latitude || state.latitude}
                            longitude={state.coordinate && state.coordinate.longitude || state.longitude}
                            setCoordinates={(latitude, longitude) => {
                                mergeState({ coordinate: { latitude, longitude } });
                            }}
                        />
                    );
                },
            },
        ],
    },
];
