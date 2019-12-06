import React from 'react';
import i18n from '@src/i18n.js';
import { TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, Layout } from '@ui-kitten/components';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';

export default function ViewEnclosureScreen({ navigation }) {
    const items = [
        {
            title: i18n.t('General'),
            data: [
                {
                    title: i18n.t('Name'),
                    text: resource => resource.name,
                },
                {
                    title: i18n.t('Location', { count: 1 }),
                    render: function LocationRender(resource) {
                        const location = resource && resource.location;       
                        if (! location) return undefined;

                        const locationText = location &&
                            [
                                location.address,
                                location.city,
                            ].filter(Boolean).join(', ')
                        || '(' + i18n.t('not provided') + ')';

                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate({
                                    routeName: 'ViewLocation',
                                    params: {
                                        item: location,
                                    },
                                })
                            }}>
                                <Text status="primary">{location.name}</Text>

                                <Text category="c1" appearance="hint">
                                    {locationText}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                },
                {
                    title: i18n.t('Coordinates'),
                    render: function CoordinatesRender(resource) {
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
                },
            ],
        },
        {
            title: i18n.t('Data'),
            data: [
                {
                    title: i18n.t('Animal', { count: 2 }),
                    onPress: () => {
                        alert('@wip');
                    },
                },
            ],
        },
    ];

    const title = item => {
        return (item.name || '(' + i18n.t('name not set') + ')');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={items}
                title={title}
                fetch={VIEW_ENCLOSURE}
                    
                routes={{
                    edit: 'EditEnclosure',
                }}
            />
        </Layout>
    )
}

ViewEnclosureScreen.navigationOptions = ResourceView.navigationOptions;
