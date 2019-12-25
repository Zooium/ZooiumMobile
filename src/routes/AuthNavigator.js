import { createSwitchNavigator } from 'react-navigation';

import Login from '@screens/AuthLoginScreen.js';
import Maintenance from '@screens/MaintenanceScreen.js';

export default createSwitchNavigator({
    Login, Maintenance
});
