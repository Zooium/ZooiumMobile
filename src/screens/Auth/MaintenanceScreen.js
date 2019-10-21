import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import apollo from '@src/apollo.js';
import { SplashScreen } from 'expo';
import SafeView from '@components/SafeView.js';
import PING from '@graphql/queries/ping.gql.js';
import { Text, Layout } from 'react-native-ui-kitten';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

export default function MaintenanceScreen({ navigation }) {
    // Hide the app splash screen.
    SplashScreen.hide();

    // Start 10 sec ping interval.
    let interval = setInterval(() => {
        apollo.query({
            query: PING,
        }).then(({ data }) => {
            // Redirect to main if available.
            if (data.ping === 'pong') {
                clearInterval(interval);
                navigation.navigate('Login');
            }
        }).catch(() => { /* Left blank intentionally */ });
    }, 10000);

    return (
        <Layout style={s.background}>
            <StatusBar barStyle="light-content" />
            <SafeView>
                <View style={s.brand}>
                    <Image style={s.logo} source={require('@assets/icon.png')} />
                    <Text category="h3" style={s.brandText}>Zooium</Text>
                </View>

                <Text style={s.auth}>
                    {i18n.t('Under maintenance')}
                </Text>
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
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})
