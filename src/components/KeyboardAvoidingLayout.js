import React from 'react';
import Constants from 'expo-constants';
import { Header } from 'react-navigation-stack';
import { Platform, KeyboardAvoidingView } from 'react-native';

export default function KeyboardAvoidingLayout(props) {
    const offset = Header.HEIGHT + Platform.select({
        android: Constants.statusBarHeight,
        default: 0,
    }) + (props.offset || 0);

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={offset} {...props}>
            {props.children}
        </KeyboardAvoidingView>
    );
}