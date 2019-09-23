import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

export default class SafeView extends React.Component {
    render() {
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
}
