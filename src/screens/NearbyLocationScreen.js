import i18n from '@src/i18n.js';
import { View } from 'react-native';
import * as Location from 'expo-location';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { withNavigationFocus } from 'react-navigation';
import PermissionDenied from '@components/PermissionDenied.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import EnclosureList from '@screens/enclosures/EnclosureListScreen.js';

function NearbyLocationScreen({ isFocused }) {
    const [status, setStatus] = useState('undetermined');
    const [watcher, setWatcher] = useState(undefined);
    const [location, setLocation] = useState(undefined);

    // Start the location watcher instance.
    const startWatcher = async () => {
        // Remove watcher if exists.
        if (watcher) watcher.remove();

        // Start location watcher service.
        const instance = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 20000,
            distanceInterval: 50,
        }, (location) => setLocation(location));

        // Save watcher instance on view.
        setWatcher(instance);
    }

    // Request location permissions and start watcher if granted.
    const requestPermission = async () => {
        // Request the user permission to location services.
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        setStatus(status);

        // Start watcher if granted.
        if (status === 'granted') {
            startWatcher();
        }
    }

    // Request permission on focus and cleanup.
    useEffect(() => {
        // Request permission or remove.
        if (isFocused) {
            requestPermission();
        } else if (watcher) {
            watcher.remove();
        }

        // Remove watcher if set.
        return () => {
            if (watcher) watcher.remove();
        };
    }, [isFocused]);

    // Return permission status based views.
    if (status === 'undetermined' || status === 'granted' && ! location) {
        return <Loader />;
    } else if (status !== 'granted') {
        return <PermissionDenied text={i18n.t('In order to use this feature you must allow access to location services!')} retry={requestPermission} />;
    }

    // Return nearby list.
    return (
        <EnclosureList showRefresh={false} variables={{
            coordinate: {
                latitude: location.coords && location.coords.latitude,
                longitude: location.coords && location.coords.longitude,
            },
        }} header={({ item }) => item.distance ? (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
                opacity: 0.4,
            }}>
                <Icon name="location-arrow" size={10} style={{ marginRight: 6 }} />
                <Text category="label">
                    {item.distance < 1000
                        ? i18n.t('{{distance}} meter', {
                            distance: item.distance,
                        })
                        : i18n.t('{{distance}} km', {
                            distance: +(item.distance/1000).toFixed(2),
                        })
                    }
                </Text>
            </View>
        ) : null} />
    )
}

NearbyLocationScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitleAlign: 'left',
        headerTitleStyle: {
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'left',
        },
        headerTitleContainerStyle: {
            left: 0,
        },

        headerRight: () => (
            <HeaderButtons>
                <Item
                    title="toggle"
                    onPress={() => navigation.navigate({
                        routeName: 'BarcodeNearby',
                    })}
                    ButtonElement={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                marginRight: 14,
                            }}>
                                {i18n.t('Scan code')}
                            </Text>

                            <Icon color="white" size={20} name={'qrcode'} />
                        </View>
                    }
                    style={{
                        marginRight: 10,
                    }}
                />
            </HeaderButtons>
        ),
    }
}

export default withNavigationFocus(NearbyLocationScreen);
