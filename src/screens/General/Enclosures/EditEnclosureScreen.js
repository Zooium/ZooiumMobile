import i18n from '@src/i18n.js';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TypeaheadInput from '@components/TypeaheadInput.js';
import { Text, Layout, Input } from '@ui-kitten/components';
import MapViewSelector from '@components/MapViewSelector.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import UPDATE_ENCLOSURE from '@graphql/mutations/Enclosure/updateEnclosure.gql.js';
import CREATE_ENCLOSURE from '@graphql/mutations/Enclosure/createEnclosure.gql.js';
import { LocationTypeaheadInput } from '@screens/Typeahead/LocationTypeaheadScreen.js';

const items = [
    {
        title: i18n.t('General'),
        data: [
            {
                key: 'name',
                required: true,
                title: i18n.t('Name'),
                render: function NameRender([state, mergeState]) {
                    return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                },
            },
            {
                key: 'location_id',
                title: i18n.t('Location', { count: 1 }),
                render: function LocationRender([state, mergeState]) {
                    return (
                        <TypeaheadInput
                            add="EditLocation"
                            view="LocationTypeahead"
                            resource={i18n.t('Location')}
                            preview={LocationTypeaheadInput}

                            value={state.location}
                            onChange={(value) => mergeState({
                                location: value,
                                location_id: value && value.id || undefined,
                            })}
                        />
                    );
                },
            },
            {
                key: 'coordinates',
                title: i18n.t('Coordinates'),
                description: function CoordinatesDescriptionRender() {
                    return (
                        <Text appearance="hint" style={{ fontSize: 10, lineHeight: 12 }}>
                            {i18n.t('Select by pressing a location on the map or long-pressing the marker and dragging it around.')}
                        </Text>
                    );
                },
                render: function CoordinatesRender([state, mergeState]) {
                    return (
                        <MapViewSelector
                            latitude={state.coordinate && state.coordinate.latitude}
                            longitude={state.coordinate && state.coordinate.longitude}
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

const title = item => {
    return item && (item.name || '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
        resource: i18n.t('Enclosure', { count: 1 }),
    });
}

const formInit = () => ({
    name: '',
    location_id: undefined,
})

const formParser = (resource) => {
    return {
        location_id: resource.location && resource.location.id,

        ...resource,
    }
}

export default function EditEnclosureScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={items}
                    title={title}

                    fetch={VIEW_ENCLOSURE}
                    mutations={{
                        save: UPDATE_ENCLOSURE,
                        create: CREATE_ENCLOSURE,
                    }}

                    routes={{
                        view: 'ViewEnclosure',
                    }}

                    formInit={formInit}
                    formParser={formParser}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditEnclosureScreen.navigationOptions = ResourceEdit.navigationOptions;
