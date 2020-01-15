import * as Location from 'expo-location';
import { withNavigation } from 'react-navigation';
import { default as Map, Marker } from 'react-native-maps';
import React, { Fragment, useRef, useEffect } from 'react';
import MapViewExpander from '@components/MapViewExpander.js';

function MapView({ latitude, longitude, setCoordinates, editable = false, isFullscreen = false, style, navigation }) {
    // Hold map view reference.
    const mapRef = useRef(null);

    // Animate to coordinates on change.
    useEffect(() => {
        // Animate camera to new coordinates.
        if (mapRef && mapRef.current && latitude && longitude) {
            mapRef.current.animateCamera({
                center: { latitude, longitude },
            }, 1);
        }
    }, [latitude, longitude]);

    // Go to user coordinates if editing new.
    useEffect(() => {
        // Skip if not editable or already has locations.
        if (! editable || latitude && longitude) return;

        // Create and call async function.
        (async () => {
            // Ask user for location permissions.
            const response = await Location.requestPermissionsAsync();
            if (! response.granted) return;

            // Get users last known location.
            const location = await Location.getLastKnownPositionAsync();
            if (! location || ! location.coords) return;

            // Extract coordinate data from location. 
            const { coords: { latitude, longitude, altitude } } = location;

            // Set camera to new coordinates.
            if (mapRef && mapRef.current) {
                mapRef.current.setCamera({
                    zoom: 16,
                    altitude: altitude+500,
                    center: { latitude, longitude },
                });
            }
        })();
    }, []);

    // Set coordinates on parent on edit event.
    const handleEvent = ({ nativeEvent: { coordinate } }) => {
        setCoordinates(coordinate.latitude, coordinate.longitude);
    };

    // Return map view.
    return (
        <Fragment>
            <Map
                ref={mapRef}
                mapType="hybrid"
                showsUserLocation={editable && true}
                onPress={editable && handleEvent || undefined}
                initialRegion={latitude && longitude && ({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })}
                style={[{
                    width: '100%',
                    aspectRatio: 1,
                }, style]}
            >
                {latitude && longitude && (
                    <Marker
                        draggable={editable}
                        onDragEnd={editable && handleEvent || undefined}
                        coordinate={{ latitude, longitude }}
                    />
                )}
            </Map>

            {! isFullscreen && (
                <MapViewExpander onPress={() => navigation.navigate('MapView', {
                    editable,
                    latitude,
                    longitude,
                    setCoordinates,
                })} />
            )}
        </Fragment>
    )
}

export default withNavigation(MapView);
