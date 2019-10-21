import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { SplashScreen } from 'expo';
import React, { useState, useEffect } from 'react';
import SafeView from '@components/SafeView.js';
import AuthManager from '@utils/AuthManager.js';
import { Text, Layout } from 'react-native-ui-kitten';
import LoadingButton from '@components/LoadingButton.js';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    // Load auth state from storage.
    AuthManager.init().then(loggedIn => {
        // Navigate to main if authenticated.
        if (loggedIn) navigation.navigate('Main');
    }).finally(() => {
        // Hide the splash screen.
        SplashScreen.hide();
    });

    authenticate = async () => {
        // Enable loading state.
        setLoading(true);

        // Wait for authorization response.
        let authed = await AuthManager.authorize();
        if (authed === undefined) return;

        // Disable loading state.
        setLoading(false);

        // Redirect to app if authed.
        if (authed) {
            navigation.navigate('Main');
        }
    };

    return (
        <Layout style={s.background}>
            <StatusBar barStyle="light-content" />
            <SafeView>
                <View style={s.brand}>
                    <Image style={s.logo} source={require('@assets/icon.png')} />
                    <Text category="h3" style={s.brandText}>Zooium</Text>
                </View>

                <LoadingButton loading={loading} status="white" size="giant" onPress={authenticate} style={s.auth}>
                    {i18n.t('Login')}
                </LoadingButton>
            </SafeView>
        </Layout>
    );
}

let s = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme['color-primary-500'],
    },

    brand: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginBottom: 20,
    },

    brandText: {
        color: 'white',
    },

    auth: {
        margin: 20,
    },
})
