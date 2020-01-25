import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

export default function KeyboardAvoidingLayout(props) {
    return <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={useHeaderHeight()} {...props} />;
}
