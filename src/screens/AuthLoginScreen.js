import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import React, { useEffect } from 'react';
import SafeView from '@components/SafeView.js';
import { Text, Layout } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';
import LoadingButton from '@components/LoadingButton.js';
import { useLoading, useAuthed, useLogin } from '@providers/AuthProvider.js';

export default function AuthLoginScreen({ navigation }) {
    // Get authentication states. 
    const loading = useLoading();
    const authed = useAuthed();

    // Allow unauthorized network attempts.
    useEffect(() => {
        navigation.setParams({
            allowUnauthorized: true,
        });
    }, []);

    // Get authentication trigger. 
    const authenticate = useLogin();

    // Return login view.
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
