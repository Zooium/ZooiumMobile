import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import React, { Fragment } from 'react';
import { Icon } from '@ui-kitten/components';
import ContextStore from '@utils/ContextStore.js';
import { useAuthed } from '@providers/AuthProvider.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '@screens/AuthLoginScreen.js';
import Maintenance from '@screens/MaintenanceScreen.js';

import AnimalStack from '@routes/AnimalStack.js';
import EnclosureStack from '@routes/EnclosureStack.js';
import NearbyStack from '@routes/NearbyStack.js';
import MenuStack from '@routes/MenuStack.js';

const Tab = createBottomTabNavigator();

/**
 * Toggles tab bar visibility based on route params.
 */
const options = (params, { route }) => {
    // Get the current route from navigation.
    const routes = route.state && route.state.routes;
    const current = routes && routes[route.state.index];

    // Return the navigation options.
    return {
        ...params,
        tabBarVisible: current && current.params && current.params.hideTabBar ? false : true,
    }
}

/**
 * Returns the navigation structure.
 */
export default function Router() {
    const authed = useAuthed();
    
    return (
        <SafeAreaProvider>
            <NavigationNativeContainer ref={i => ContextStore.saveContext('router', i)}>
                <Tab.Navigator initialRouteName="Login" tabBarOptions={{
                    keyboardHidesTabBar: true,
                    activeTintColor: theme['color-primary-500'],
                }}>
                    {authed && (
                        <Fragment>
                            <Tab.Screen name="Animal" component={AnimalStack} options={(props) => options({
                                title: i18n.t('Animal', { count: 2 }),
                                tabBarIcon: function AnimalIcon({ color, size }) {
                                    return <Icon name="dove" size={size} color={color} solid />;
                                },
                            }, props)} />

                            <Tab.Screen name="Enclosure" component={EnclosureStack} options={(props) => options({
                                title: i18n.t('Enclosure', { count: 2 }),
                                tabBarIcon: function EnclosureIcon({ color, size }) {
                                    return <Icon name="map-marked-alt" size={size} color={color} solid />;
                                },
                            }, props)} />

                            <Tab.Screen name="Nearby" component={NearbyStack} options={(props) => options({
                                title: i18n.t('Nearby'),
                                tabBarIcon: function NearbyIcon({ color, size }) {
                                    return <Icon name="street-view" size={size} color={color} solid />;
                                },
                            }, props)} />

                            <Tab.Screen name="Menu" component={MenuStack} options={(props) => options({
                                title: i18n.t('Menu'),
                                tabBarIcon: function MenuIcon({ color, size }) {
                                    return <Icon name="ellipsis-h" size={size} color={color} solid />;
                                },
                            }, props)} />
                        </Fragment>
                    ) || (
                        <Fragment>
                            <Tab.Screen name="Login" component={Login} options={{
                                tabBarVisible: false,
                            }} />
                        </Fragment>
                    )}

                    {/* Public */}
                    <Tab.Screen name="Maintenance" component={Maintenance} options={{
                        tabBarVisible: false,
                        tabBarButton: () => null,
                    }} />
                </Tab.Navigator>
            </NavigationNativeContainer>
        </SafeAreaProvider>
    );
}
