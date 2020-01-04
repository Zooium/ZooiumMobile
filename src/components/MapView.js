import React, { useRef, Fragment } from 'react';
import { withNavigation } from 'react-navigation';
import { default as Map, Marker } from 'react-native-maps';
import MapViewExpander from '@components/MapViewExpander.js';

function MapView({ latitude, longitude, setCoordinates, editable = false, isFullscreen = false, style, navigation }) {
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
