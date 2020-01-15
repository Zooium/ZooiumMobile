import { View } from 'react-native';
import React, { useEffect } from 'react';
import { ScreenOrientation } from 'expo';
import AuthState from '@utils/AuthState.js';
import { WebView } from 'react-native-webview';

export default function AuthorizedWebViewScreen({ navigation }) {
    const uri = navigation.getParam('uri');

    useEffect(() => {
        // Unlock screen orientation.
        ScreenOrientation.unlockAsync();

        // Return back to portrait lock.
        return () => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
        }
    }, []);

    return (
        <WebView
            source={{
                uri: uri,
                headers: {
                    Authorization: 'Bearer ' + AuthState.accessToken(),
                },
            }}
        />
    );
}

AuthorizedWebViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerRight: () => <View />,
})
