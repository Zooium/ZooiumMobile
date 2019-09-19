import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 

import MenuNavigator from './MenuNavigator.js';
import NearbyNavigator from './NearbyNavigator.js';
import AnimalsNavigator from './AnimalsNavigator.js';
import EnclosuresNavigator from './EnclosuresNavigator.js';

export default createBottomTabNavigator({
    Animals: {
        screen: AnimalsNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <FontAwesome5 name="dove" size={22} color={tintColor} />;
            },
        },
    },

    Enclosures: {
        screen: EnclosuresNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <FontAwesome5 name="map-marked-alt" size={22} color={tintColor} />;
            },
        },
    },

    Nearby: {
        screen: NearbyNavigator,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <FontAwesome5 name="street-view" size={22} color={tintColor} />;
            },
        },
    },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'More',
            tabBarIcon: ({ tintColor }) => {
                return <FontAwesome5 name="ellipsis-h" size={22} color={tintColor} />;
            },
        },
    },
});
