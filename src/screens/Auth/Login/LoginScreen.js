import React from 'react';
import Auth from '@src/Auth.js'
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { SplashScreen } from 'expo';
import SafeView from '@components/SafeView.js';
import { Text, Button, Layout } from 'react-native-ui-kitten';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

export default function LoginScreen() {
    // Initialize new auth instance.
    let auth = null;
    Auth.init().then(instance => {
        // Navigate to main if authenticated.
        auth = instance;
        if (instance.isAuthenticated()) {
            this.props.navigation.navigate('Main');
        }
    }).finally(() => {
        // Hide the splash screen.
        SplashScreen.hide();
    });

    authenticate = async () => {
        // Navigate to the main app if authorized.
        if (await auth.authorize()) {
            this.props.navigation.navigate('Main');
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

                <Button status="white" size="giant" onPress={authenticate} style={s.auth}>
                    {i18n.t('Login')}
                </Button>
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
        marginHorizontal: 20,
    },
})
