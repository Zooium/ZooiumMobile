import { createBottomTabNavigator } from 'react-navigation-tabs';

import MenuNavigator from './MenuNavigator.js';
import NerbyNavigator from './NerbyNavigator.js';
import AnimalsNavigator from './AnimalsNavigator.js';

export default createBottomTabNavigator({
    Animals: {
        screen: AnimalsNavigator,
    },

    Nerby: {
        screen: NerbyNavigator,
    },

    Menu: {
        screen: MenuNavigator,
    },
});
