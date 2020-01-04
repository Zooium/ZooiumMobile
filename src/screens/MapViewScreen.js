import { View } from 'react-native';
import React, { useState } from 'react';
import MapView from '@components/MapView.js';
import ModalClose from '@components/ModalClose.js';

export default function MapViewScreen({ navigation, ...props }) {
    // Create local state for latitude and longitude.
    const [latitude, setLatitude] = useState(navigation.getParam('latitude'));
    const [longitude, setLongitude] = useState(navigation.getParam('longitude'));

    // Get editable state and setter function.
    const editable = navigation.getParam('editable');
    const setter = navigation.getParam('setCoordinates');

    // Prepare setter with local state being updated.
    const setCoordinates = (latitude, longitude) => {
        // Update local state.
        setLatitude(latitude);
        setLongitude(longitude);

        // Call external setter.
        setter && setter(latitude, longitude);
    };

    // Return map view.
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
        }} {...props}>
            <MapView
                editable={editable}
                isFullscreen={true}
                latitude={latitude}
                longitude={longitude}
                setCoordinates={setter && setCoordinates}
                style={{
                    height: '100%',
                    aspectRatio: undefined,
                }}
            />

            <ModalClose />
        </View>
    );
}
