import { View } from 'react-native';
import React, { useState } from 'react';
import MapView from '@components/MapView.js';
import ModalClose from '@components/ModalClose.js';
import useNavigationParam from '@hooks/useNavigationParam.js';

export default function MapViewScreen(props) {
    // Create local state for latitude and longitude.
    const [latitude, setLatitude] = useState(useNavigationParam('latitude'));
    const [longitude, setLongitude] = useState(useNavigationParam('longitude'));

    // Get editable state and setter function.
    const editable = useNavigationParam('editable');
    const setter = useNavigationParam('setCoordinates');

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
