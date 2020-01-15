import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

export default function SafeView({ style, children }) {
    return (
        <SafeAreaView style={{ 
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            ...style,
        }}>
            {children}
        </SafeAreaView>
    );
}
