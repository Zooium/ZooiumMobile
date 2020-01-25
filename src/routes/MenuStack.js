import React from 'react';
import i18n from '@src/i18n.js';
import styles from '@src/styles.js';
import Menu from '@screens/MenuScreen.js';
import Popovers from '@routes/Popovers.js';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MenuStack() {
    return (
        <Stack.Navigator initialRouteName="Menu" screenOptions={styles.navigationStack}>
            <Stack.Screen name="Menu" component={Menu} options={{ title: i18n.t('Menu') }} />
            {Popovers(Stack)}
        </Stack.Navigator>
    );
}
