import React from 'react';
import ContextStore from '@utils/ContextStore.js';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Import navigator instances.
import AuthNavigator from '@routes/AuthNavigator.js';
import MainNavigator from '@routes/MainNavigator.js';

// Create new app container for top level navigations.
const AppNavigationContainer = createAppContainer(
    createSwitchNavigator({
        Auth: AuthNavigator,
        Main: MainNavigator,
    }),
);

// Create and return new app container.
export default function AppContainer() {
    return <AppNavigationContainer ref={i => ContextStore.saveContext('router', i)} />;
}
