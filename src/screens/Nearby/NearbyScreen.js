import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import BarcodeNearby from './components/BarcodeNearby.js';
import LocationNearby from './components/LocationNearby.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default function NearbyScreen({ navigation }) {
    const [view, setView] = useState('location');

    useEffect(() => {
        navigation.setParams({ view, setView });
    }, [view]);

    return (
        <View style={{ flex: 1 }}>
            {view === 'location' && <LocationNearby /> || <BarcodeNearby />}
        </View>
    );
}

NearbyScreen.navigationOptions = ({ navigation }) => {
    const view = navigation.getParam('view') || 'location';
    const isBarcode = view && view === 'barcode';

    return {
        headerRight: (
            <HeaderButtons>
                <Item
                    title={isBarcode ? 'scan' : 'location'}
                    iconName={isBarcode ? 'location-arrow' : 'qrcode'}
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.getParam('setView')(isBarcode ? 'location' : 'barcode')}
                />
            </HeaderButtons>
        ),
    }
};
