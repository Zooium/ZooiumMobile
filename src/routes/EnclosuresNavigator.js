import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js'
import ListEnclosures from '@screens/General/Enclosures/ListEnclosuresScreen.js';

export default createStackNavigator({
    ListEnclosures,
    ...Popovers,
});
