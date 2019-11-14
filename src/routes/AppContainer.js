import { SplashScreen } from 'expo';
import React, { forwardRef } from 'react';
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
export default forwardRef(function AppContainer(props, ref) {
    // Keep splash screen shown.
    SplashScreen.preventAutoHide();

    // Return app navigation container.
    return <AppNavigationContainer ref={ref} />;
})
