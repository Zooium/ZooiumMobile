import React, { useState } from 'react';
import * as Location from 'expo-location';
import { Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { NavigationEvents } from 'react-navigation';

export default function NearbyScreen() {
    const [status, setStatus] = useState('undetermined');
    const [watcher, setWatcher] = useState(undefined);
    const [location, setLocation] = useState(undefined);

    requestPermission = async () => {
        // Request the user permission to location services.
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        setStatus(status);

        // Returns whether or not request was granted.
        return status === 'granted';
    }

    boot = async() => {
        // Request permission from user.
        if (await requestPermission()) {
            // Start location watcher service.
            let service = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 500,
                distanceInterval: 0,
            }, (location) => setLocation(location));

            // Save the watcher service.
            setWatcher(service);
        }
    }

    cleanup = () => {
        // Remove location watcher if set.
        if (watcher) {
            watcher.remove();
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NavigationEvents onWillFocus={boot} onDidBlur={cleanup} />

            <Text>Status: {status}</Text>
            <Text>Location: {location && location.coords.longitude}, {location && location.coords.latitude}</Text>
        </View>
    );
}
