import i18n from '@src/i18n.js';
import { View } from 'react-native';
import * as Location from 'expo-location';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import { Text, Icon } from '@ui-kitten/components';
import { useIsFocused } from 'react-navigation-hooks';
import PermissionDenied from '@components/PermissionDenied.js';
import React, { useState, useCallback, useEffect } from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import EnclosureList from '@screens/enclosures/EnclosureListScreen.js';

export default function NearbyLocationScreen() {
    // Hold permission, watcher, and location states.
    const [status, setStatus] = useState('undetermined');
    const [watcher, setWatcher] = useState(undefined);
    const [location, setLocation] = useState(undefined);

    // Define location watcher start function.
    const startWatcher = useCallback(async () => {
        // Start location watcher service.
        const instance = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 20000,
            distanceInterval: 50,
        }, (location) => setLocation(location));

        // Save watcher instance on view.
        setWatcher(instance);
    }, [setWatcher, setLocation]);

    // Define request user location permission function.
    const requestPermission = useCallback(async () => {
        // Request permission and save status.
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        setStatus(status);

        // Start watcher if granted.
        if (status === 'granted') {
            startWatcher();
        }
    }, [setStatus, startWatcher]);

    // Cleanup watcher on remove. 
    useEffect(() => {
        // Skip if has no watcher instance.
        if (! watcher) return;

        // Remove watcher if set.
        return () => {
            watcher && watcher.remove();
        }
    }, [watcher]);

    // Get screen focus state.
    const isFocused = useIsFocused();

    // Start on focus and cleanup on defocus.
    useEffect(() => {
        // Skip if screen is not focused.
        if (! isFocused) return;

        // Request permission and start watcher.
        requestPermission();

        // Cleanup watcher on defocus. 
        return () => {
            setWatcher(null);
        }
    }, [isFocused, setWatcher, requestPermission]);

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

        headerRight: function BarcodeToggleButton() {
            return (
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
            );
        },
    }
}
