// Import React navigation functions.
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Import navigator instances.
import AuthNavigator from '@routes/AuthNavigator.js';
import MainNavigator from '@routes/MainNavigator.js';

// Create and return new app container.
export default createAppContainer(
    createSwitchNavigator({
        Auth: AuthNavigator,
        Main: MainNavigator,
    }),
);
