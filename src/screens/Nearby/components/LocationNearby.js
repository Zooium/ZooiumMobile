import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';

export default function LocationNearby(props) {
    const [status, setStatus] = useState('undetermined');
    const [watcher, setWatcher] = useState(undefined);
    const [location, setLocation] = useState(undefined);

    // Start the location watcher instance.
    startWatcher = async () => {
        // Start location watcher service.
        const instance = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 500,
            distanceInterval: 0,
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

    // Request permission on start.
    useEffect(() => {
        requestPermission();
    }, []);

    // Remove watcher on cleanup.
    useEffect(() => {
        return () => {
            if (watcher) watcher.remove();
        }
    }, [watcher]);

    return (
        <View {...props}>
            <Text>Status: {status}</Text>
            <Text>Location: {location && location.coords.longitude}, {location && location.coords.latitude}</Text>
        </View>
    );
}
