import { View } from 'react-native';
import React, { useEffect } from 'react';
import { ScreenOrientation } from 'expo';
import { WebView } from 'react-native-webview';
import { useToken } from '@providers/AuthProvider.js';

export default function AuthorizedWebViewScreen({ navigation }) {
    const token = useToken();
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
                    Authorization: 'Bearer ' + token.accessToken,
                },
            }}
        />
    );
}

AuthorizedWebViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerRight: function SpacerItem() {
        return <View />;
    },
})
