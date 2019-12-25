import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { TouchableOpacity } from 'react-native';
import LocationSettings from './LocationSettings';
import { Text, Input } from '@ui-kitten/components';
import MapView, { Marker } from 'react-native-maps';
import TypeaheadInput from '@components/TypeaheadInput.js';
import MapViewSelector from '@components/MapViewSelector.js';
import { LocationTypeaheadInput } from '@screens/locations/LocationTypeaheadScreen.js';

export default class EnclosureSettings {
    /**
     * Returns the resource title.
     *
     * @param {object} item
     * @param {any} fallback
     * @return {string}
     */
    static title(item, fallback = undefined) {
        return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Enclosure', { count: 1 }),
        }) || fallback;
    }

    /**
     * Initialize form object.
     */
    static formInit = () => ({
        name: '',
        location_id: undefined,
    })

    /**
     * Parse resource to form object.
     */
    static formParser = (resource) => ({
        ...resource,
        location_id: resource.location && resource.location.id,
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
                    required: true,
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
                                    {LocationSettings.shortTitle(location, '(' + i18n.t('not provided') + ')')}
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
                                preview={LocationTypeaheadInput}
    
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
                                mapType="hybrid"
                                initialRegion={{
                                    latitude: resource.latitude,
                                    longitude: resource.longitude,
                                    latitudeDelta: 0.001,
                                    longitudeDelta: 0.001,
                                }}
                                style={{
                                    width: '100%',
                                    aspectRatio: 1,
                                }}
                            >
                                <Marker coordinate={{
                                    latitude: resource.latitude,
                                    longitude: resource.longitude,
                                }} />
                            </MapView>
                        )
                    },
                    renderEdit: function CoordinatesEditRender([state, mergeState]) {
                        return (
                            <MapViewSelector
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
                key: route + (search = 'enclosure:'+response.id),
                params: {
                    search: search,
                    showSearch: true,
                    focusSearch: false,
                },
            }),
        },
    ]
}
