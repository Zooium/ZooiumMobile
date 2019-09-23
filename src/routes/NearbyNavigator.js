import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js'
import Nearby from '@screens/Nearby/NearbyScreen.js';

export default createStackNavigator({
    Nearby,
    ...Popovers,
});
