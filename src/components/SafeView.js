import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

export default function SafeView() {
    return (
        <SafeAreaView style={{ 
            ...this.props.style,
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
            {this.props.children}
        </SafeAreaView>
    );
}

SafeView.propTypes = {
    style: SafeAreaView.propTypes.style,
    children: PropTypes.func,
}
