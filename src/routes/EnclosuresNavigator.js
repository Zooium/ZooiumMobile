import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';

export default createStackNavigator(Popovers, {
    ...StackStyle,
    initialRouteName: 'EnclosureList',
});
