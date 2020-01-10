import theme from '@src/theme.js';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listSection: {
        paddingVertical: 10,
        paddingHorizontal: 16,

        color: theme['color-basic-600'],
        backgroundColor: theme['color-basic-200'],

        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: theme['color-basic-300'],
        borderBottomColor: theme['color-basic-300'],
    },

    listItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,

        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        borderBottomWidth: 1,
        borderBottomColor: theme['color-basic-200'],
    },

    shadow1: {
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
});
