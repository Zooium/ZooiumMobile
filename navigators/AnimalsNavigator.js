import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js'
import ListAnimals from '../screens/General/Animals/ListAnimalsScreen.js';

export default createStackNavigator({
    ListAnimals,
    ...Popovers,
});
