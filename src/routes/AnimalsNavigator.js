import Popovers from './Popovers.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator(Popovers, {
    ...StackStyle,
    initialRouteName: 'AnimalList',
});
