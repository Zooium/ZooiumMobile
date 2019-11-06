import i18n from '@src/i18n.js';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-ui-kitten';
import React, { useState, useEffect } from 'react';
import BarcodeNearby from './components/BarcodeNearby.js';
import LocationNearby from './components/LocationNearby.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default function NearbyScreen({ navigation }) {
    const [view, setView] = useState(
        navigation.getParam('view', 'location')
    );

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
        headerTitleStyle: {
            flex: 1,
            textAlign: 'left',
        },

        headerTitleContainerStyle: {
            left: 0,
        },
    
        headerRight: (
            <HeaderButtons>
                <Item
                    title="toggle"
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.getParam('setView')(isBarcode ? 'location' : 'barcode')}
                    ButtonElement={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                marginRight: 14,
                            }}>
                                {i18n.t(isBarcode ? 'Use location' : 'Scan code')}
                            </Text>

                            <Icon color="white" size={20} name={isBarcode ? 'location-arrow' : 'qrcode'} />
                        </View>
                    }
                />
            </HeaderButtons>
        ),
    }
};
