import React from 'react';
import i18n from '@src/i18n.js';
import { Icon } from '@ui-kitten/components';
import BottomTabStyle from './styles/BottomTabStyle.js';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MenuNavigator from './MenuNavigator.js';
import NearbyNavigator from './NearbyNavigator.js';
import AnimalsNavigator from './AnimalsNavigator.js';
import EnclosuresNavigator from './EnclosuresNavigator.js';

/* eslint-disable react/prop-types */
export default createBottomTabNavigator({
    Animals: {
        screen: AnimalsNavigator,
        navigationOptions: {
            title: i18n.t('Animal', { count: 2 }),
            tabBarIcon: function AnimalIcon({ tintColor }) {
                return <Icon name="dove" size={22} color={tintColor} />;
            },
        },
    },

    Enclosures: {
        screen: EnclosuresNavigator,
        navigationOptions: {
            title: i18n.t('Enclosure', { count: 2 }),
            tabBarIcon: function EnclosureIcon({ tintColor }) {
                return <Icon name="map-marked-alt" size={22} color={tintColor} />;
            },
        },
    },

    Nearby: {
        screen: NearbyNavigator,
        navigationOptions: {
            title: i18n.t('Nearby'),
            tabBarIcon: function NearbyIcon({ tintColor }) {
                return <Icon name="street-view" size={22} color={tintColor} />;
            },
        },
    },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: i18n.t('Menu'),
            tabBarIcon: function MenuIcon({ tintColor }) {
                return <Icon name="ellipsis-h" size={22} color={tintColor} />;
            },
        },
    },
}, BottomTabStyle);
