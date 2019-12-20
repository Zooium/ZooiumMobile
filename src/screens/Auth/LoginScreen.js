import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import SafeView from '@components/SafeView.js';
import AuthManager from '@utils/AuthManager.js';
import React, { useState, useEffect } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';
import LoadingButton from '@components/LoadingButton.js';

export default function LoginScreen({ navigation }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Allow unauthorized network attempts.
        navigation.setParams({
            allowUnauthorized: true,
        });

        // Load auth state from storage.
        AuthManager.init().then(loggedIn => {
            // Navigate to main if authenticated or disable loading.
            if (loggedIn) {
                navigation.navigate('Main');
            } else {
                setLoading(false);
            }
        });
    }, []);

    const authenticate = async () => {
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
            <SafeView>
                <View style={s.brand}>
                    <Image style={s.logo} source={require('@assets/icon-foreground-close.png')} />
                    <Text category="h3" style={s.brandText}>Zooium</Text>
                </View>

                <LoadingButton loading={loading} status="basic" size="giant" onPress={authenticate} style={s.auth} textStyle={s.authText}>
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
        width: 192,
        height: 192,
        marginBottom: 20,
    },

    brandText: {
        color: 'white',
    },

    auth: {
        margin: 20,
        backgroundColor: 'white',
    },

    authText: {
        color: theme['color-primary-500'],
    },
})
