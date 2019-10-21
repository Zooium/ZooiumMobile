import { createSwitchNavigator } from 'react-navigation';

import Login from '@screens/Auth/LoginScreen.js';
import Maintenance from '@screens/Auth/MaintenanceScreen.js';

export default createSwitchNavigator({
    Login, Maintenance
});
