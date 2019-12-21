import theme from '@src/theme.js';

export default {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: theme['color-primary-500'],
        },
    },

    /*
    @wip - Runs both slide and modal animation.

    transitionConfig: (props, prevProps)  => {
        const route = props.scene.route;
        StackViewTransitionConfigs.defaultTransitionConfig(
            props, prevProps, route.params && route.params.isModal || false,
        );
    },*/
}