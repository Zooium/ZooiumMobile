import React from 'react';
import theme from '@src/theme.js';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-kitten';

export default function inputButton({ children, ...props }) {
    return (
        <Button status="basic" appearance="outline" style={s.inputButton} textStyle={s.inputButtonText} {...props}>
            {children}
        </Button>
    );
}

let s = StyleSheet.create({
    inputButton: {
        minHeight: 48,
        paddingVertical: 7,
        paddingHorizontal: 8,

        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        borderColor: theme['color-basic-300'],
        backgroundColor: theme['color-basic-200'],
    },

    inputButtonText: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'normal',
        marginHorizontal: 8,
    },
})
