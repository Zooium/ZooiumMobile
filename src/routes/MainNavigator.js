import React from 'react';
import i18n from '@src/i18n.js';
import { Icon } from '@ui-kitten/components';
import StackStyle from './styles/StackStyle.js';
import BottomTabStyle from './styles/BottomTabStyle.js';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Popovers from './Popovers.js';
import MenuNavigator from './MenuNavigator.js';
import NearbyNavigator from './NearbyNavigator.js';

const navigationOptionsWrapper = (defaults, { navigation }) => {
    // Get the current route from navigation.
    const routes = navigation.state.routes;
    const route = routes[routes.length - 1];

    // Return the navigation options.
    return {
        ...defaults,
        tabBarVisible: route.params && route.params.hideTabBar ? false : true,
    }
}

/* eslint-disable react/prop-types */
export default createBottomTabNavigator({
    Animals: {
        screen: createStackNavigator(Popovers, {
            ...StackStyle, initialRouteName: 'AnimalList',
        }),

        navigationOptions: (props) => navigationOptionsWrapper({
            title: i18n.t('Animal', { count: 2 }),
            tabBarIcon: function AnimalIcon({ tintColor }) {
                return <Icon name="dove" size={22} color={tintColor} solid />;
            },
        }, props),
    },

    Enclosures: {
        screen: createStackNavigator(Popovers, {
            ...StackStyle, initialRouteName: 'EnclosureList',
        }),

        navigationOptions: (props) => navigationOptionsWrapper({
            title: i18n.t('Enclosure', { count: 2 }),
            tabBarIcon: function EnclosureIcon({ tintColor }) {
                return <Icon name="map-marked-alt" size={22} color={tintColor} solid />;
            },
        }, props),
    },

    Nearby: {
        screen: NearbyNavigator,
        navigationOptions: (props) => navigationOptionsWrapper({
            title: i18n.t('Nearby'),
            tabBarIcon: function NearbyIcon({ tintColor }) {
                return <Icon name="street-view" size={22} color={tintColor} solid />;
            },
        }, props),
    },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: (props) => navigationOptionsWrapper({
            title: i18n.t('Menu'),
            tabBarIcon: function MenuIcon({ tintColor }) {
                return <Icon name="ellipsis-h" size={22} color={tintColor} solid />;
            },
        }, props),
    },
}, BottomTabStyle);
