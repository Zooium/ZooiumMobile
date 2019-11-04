import i18n from '@src/i18n.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';
import Menu from '@screens/MenuScreen.js';
import ListLocations from '@screens/General/Locations/ListLocationsScreen.js';

export default createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: {
            title: i18n.t('Menu'),
        },
    },

    ListLocations,
    ...Popovers,
}, StackStyle);
