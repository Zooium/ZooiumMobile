import React from 'react';
import styles from '@src/styles.js';
import Popovers from '@routes/Popovers.js';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AnimalStack() {
    return (
        <Stack.Navigator initialRouteName="AnimalList" screenOptions={styles.navigationStack}>
            {Popovers(Stack)}
        </Stack.Navigator>
    );
}
