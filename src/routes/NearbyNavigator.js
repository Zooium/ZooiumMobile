import i18n from '@src/i18n.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';
import Nearby from '@screens/Nearby/NearbyScreen.js';

export default createStackNavigator({
    ViewNearby: {
        screen: Nearby,
        navigationOptions: {
            title: i18n.t('Nearby'),
        },
    },
    ...Popovers,
}, StackStyle);
