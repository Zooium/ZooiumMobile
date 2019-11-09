import i18n from '@src/i18n.js';
import { View } from 'react-native';
import * as Location from 'expo-location';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { Text, Icon } from 'react-native-ui-kitten';
import { withNavigationFocus } from 'react-navigation';
import PermissionDenied from '@components/PermissionDenied.js';
import ListEnclosures from '@screens/General/Enclosures/ListEnclosuresScreen.js';

function LocationNearby({ isFocused }) {
    const [status, setStatus] = useState('undetermined');
    const [watcher, setWatcher] = useState(undefined);
    const [location, setLocation] = useState(undefined);
    console.log('rerender: ', location && location.timestamp);

    // Start the location watcher instance.
    startWatcher = async () => {
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
    requestPermission = async () => {
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
        <ListEnclosures showRefresh={false} variables={{
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
    );
}

export default withNavigationFocus(LocationNearby);
