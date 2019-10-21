import i18n from '@src/i18n.js';
import StackStyle from './styles/StackStyle.js';
import { createStackNavigator } from 'react-navigation-stack';

import Popovers from './Popovers.js';
import ListAnimals from '@screens/General/Animals/ListAnimalsScreen.js';

export default createStackNavigator({
    ListAnimals: {
        screen: ListAnimals,
        navigationOptions: {
            title: i18n.t('Animal', { count: 2 }),
        },
    },
    ...Popovers,
}, StackStyle);
