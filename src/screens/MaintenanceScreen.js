import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import React, { useEffect } from 'react';
import SafeView from '@components/SafeView.js';
import PING from '@graphql/queries/ping.gql.js';
import { useLazyQuery } from '@apollo/react-hooks';
import { Text, Layout } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';

export default function MaintenanceScreen({ navigation }) {
    // Create lazy status checking query.
    const [checkStatus, { data }] = useLazyQuery(PING);

    // Redirect to login screen when online.
    useEffect(() => {
        if (data && data.ping === 'pong') {
            navigation.navigate('Login');
        }
    }, [data]);

    // Create interval on show. 
    useEffect(() => {
        // Define 10 seconds interval.
        const interval = setInterval(() => {
            checkStatus();
        }, 10000);

        // Clear interval on cleanup.
        return () => {
            clearInterval(interval);
        }
    }, [checkStatus]);

    // Return maintenance view.
    return (
        <Layout style={s.background}>
            <SafeView>
                <View style={s.brand}>
                    <Image style={s.logo} source={require('@assets/icon-foreground-close.png')} />
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
        width: 192,
        height: 192,
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
