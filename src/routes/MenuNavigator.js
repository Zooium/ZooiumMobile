import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js'
import Menu from '@screens/MenuScreen.js';
import ListLocations from '@screens/General/Locations/ListLocationsScreen.js';
import ListEnclosures from '@screens/General/Enclosures/ListEnclosuresScreen.js';

export default createStackNavigator({
    Menu,
    ListLocations,
    ListEnclosures,
    ...Popovers,
});
