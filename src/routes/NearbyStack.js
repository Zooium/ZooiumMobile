import React from 'react';
import i18n from '@src/i18n.js';
import styles from '@src/styles.js';
import Popovers from '@routes/Popovers.js';
import BarcodeNearby from '@screens/NearbyBarcodeScreen.js';
import LocationNearby from '@screens/NearbyLocationScreen.js';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function NearbyStack() {
    return (
        <Stack.Navigator initialRouteName="LocationNearby" screenOptions={styles.navigationStack}>
            <Stack.Screen name="LocationNearby" component={LocationNearby} options={LocationNearby.navigationOptions} />
            <Stack.Screen name="BarcodeNearby" component={BarcodeNearby} initialParams={{ hideTabBar: true }} options={{ headerShown: false }} />
            {Popovers(Stack)}
        </Stack.Navigator>
    );
}
