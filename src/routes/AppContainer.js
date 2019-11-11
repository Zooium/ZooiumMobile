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

    // Return container and listen for state changes.
    return <AppNavigationContainer ref={ref} onNavigationStateChange={(prev, current) => {
        // Get params for the current route.
        const params = current.routes[current.index].params;

        // Hide splash screen after interacitons if requested.
        if (params && params.hideSplash) {
            setTimeout(() => {
                SplashScreen.hide();
            }, 2);
        }
    }} />;
})
