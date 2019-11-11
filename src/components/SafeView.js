import React from 'react';
import PropTypes from 'prop-types';
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

SafeView.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any,
}
