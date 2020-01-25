import React from 'react';
import styles from '@src/styles.js';
import Popovers from '@routes/Popovers.js';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function EnclosureStack() {
    return (
        <Stack.Navigator initialRouteName="EnclosureList" screenOptions={styles.navigationStack}>
            {Popovers(Stack)}
        </Stack.Navigator>
    );
}
