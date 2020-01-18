import React from 'react';
import theme from '@src/theme.js';
import Constants from 'expo-constants';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export const TITLE_OFFSET_ALIGN = 80;

export default {
    defaultNavigationOptions: ({ navigation }) => {
        const canGoBack = navigation.dangerouslyGetParent().state.index > 0;

        return {
            // Change default header spacing.
            headerTitleContainerStyle: {
                left: TITLE_OFFSET_ALIGN,
                right: TITLE_OFFSET_ALIGN,
            },

            // Center header text and make title bold.
            headerTitleAlign: 'center',
            headerTitleStyle: {
                flex: 1,
                fontWeight: 'bold',
                textAlign: 'center',
            },

            // Change header to primary color.
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: theme['color-primary-500'],
            },

            // Customize the back button if available.
            headerLeft: canGoBack && (() => (
                <HeaderButtons left={true}>
                    <Item title="return" iconName="arrow-left" onPress={() => {
                        navigation.goBack();
                    }} />
                </HeaderButtons>
            )) || (() => null),

            // Hard-code top safe area insert to prevent jumping when switching stacks.
            // Possible 'react-native-safe-area-context' issue, past stack v2.
            safeAreaInsets: {
                top: Constants.statusBarHeight,
            },
        }
    },
}