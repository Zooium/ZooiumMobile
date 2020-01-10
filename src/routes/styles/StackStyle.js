import React from 'react';
import theme from '@src/theme.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default {
    defaultNavigationOptions: ({ navigation }) => {
        const canGoBack = navigation.dangerouslyGetParent().state.index > 0;

        return {
            // Change header to primary color.
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: theme['color-primary-500'],
            },

            // Customize the back button if available.
            headerLeft: canGoBack && (() => (
                <HeaderButtons left={true}>
                    <Item title="return" iconName="arrow-left" onPress={() => navigation.goBack()} />
                </HeaderButtons>
            )) || null,
        }
    },

    /*
    TODO - Runs both slide and modal animation.

    transitionConfig: (props, prevProps)  => {
        const route = props.scene.route;
        StackViewTransitionConfigs.defaultTransitionConfig(
            props, prevProps, route.params && route.params.isModal || false,
        );
    },*/
}