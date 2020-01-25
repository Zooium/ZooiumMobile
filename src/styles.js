import React from 'react';
import theme from '@src/theme.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export const TITLE_OFFSET_ALIGN = 80;

export default {
    /**
     * Theme and change logic for navigation stacks.
     */
    navigationStack: ({ navigation }) => {
        let canGoBack = navigation.dangerouslyGetState().index > 0;

        return {
            // Change default header spacing.
            /* TODO: headerTitleContainerStyle: {
                left: TITLE_OFFSET_ALIGN,
                right: TITLE_OFFSET_ALIGN,
            }, */

            // Center header text and make title bold.
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold',
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
        };
    },
}
