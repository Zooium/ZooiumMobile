import i18n from '@src/i18n.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';
import ListEnclosures from '@screens/General/Enclosures/ListEnclosuresScreen.js';

export default createStackNavigator(Popovers, {
    ...StackStyle,
    initialRouteName: 'ListEnclosures',
});
