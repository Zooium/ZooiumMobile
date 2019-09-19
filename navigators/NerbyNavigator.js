import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js'
import Nerby from '../screens/Nerby/NerbyScreen.js';

export default createStackNavigator({
    Nerby,
    ...Popovers,
});
