
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewSelector({ latitude, longitude, setCoordinates }) {
    const mapRef = useRef(null);

    const handleEvent = ({ nativeEvent: { coordinate } }) => {
        // Set coordinates on parent.
        setCoordinates(coordinate.latitude, coordinate.longitude);

        // Animate camera to new coordinates.
        if (mapRef && mapRef.current) {
            mapRef.current.animateCamera({
                center: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                },
            }, 1);
        }
    };

    return (
        <MapView
            ref={mapRef}
            mapType="hybrid"
            showsUserLocation={true}
            onPress={handleEvent}
            initialRegion={latitude && longitude && ({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })}
            style={{
                width: '100%',
                aspectRatio: 1,
            }}
        >
            {latitude && longitude && (
                <Marker
                    draggable
                    onDragEnd={handleEvent}
                    coordinate={{ latitude, longitude }}
                />
            )}
        </MapView>
    )
}
