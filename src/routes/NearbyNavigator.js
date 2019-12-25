import i18n from '@src/i18n.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';
import BarcodeNearby from '@screens/NearbyBarcodeScreen.js';
import LocationNearby from '@screens/NearbyLocationScreen.js';

export default createStackNavigator({
    LocationNearby: {
        screen: LocationNearby,
        navigationOptions: {
            title: i18n.t('Nearby'),
        },
    },

    BarcodeNearby: {
        screen: BarcodeNearby,
        params: {
            isModal: true,
            hideTabBar: true,
        },
        navigationOptions: {
            header: null,
        },
    },

    ...Popovers,
}, StackStyle);
