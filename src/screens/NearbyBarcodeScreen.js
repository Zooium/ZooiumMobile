import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet } from 'react-native';
import ModalClose from '@components/ModalClose.js';
import { useLazyQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { NavigationEvents } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon, Text, Layout } from '@ui-kitten/components';
import PermissionDenied from '@components/PermissionDenied.js';
import VIEW_SHORTLINK from '@graphql/queries/Shortlink/viewShortlink.gql.js';

export default function NearbyBarcodeScreen({ navigation, ...props }) {
    const [render, setRender] = useState(true);
    const [status, setStatus] = useState('undetermined');
    const [invalid, setInvalid] = useState(false);
    const [timer, setTimer] = useState(undefined);
    const [hash, setHash] =  useState(undefined);

    // Request camera usage permissions.
    const requestPermission = async () => {
        // Request the user permission to camera services.
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        setStatus(status);
    }

    // Start view on boot
    useEffect(() => {
        // Request user for permissions.
        requestPermission();

        // Allow unauthorized network attempts.
        navigation.setParams({
            allowUnauthorized: true,
        });
    }, []);

    const [loadShortlink, { loading, error, data }] = useLazyQuery(VIEW_SHORTLINK, {
        variables: {
            id: hash,
        },
    });

    // Show invalid indicator.
    const markInvalid = () => {
        // Mark as invalid and start unset timer.
        setInvalid(true);
        const timer = setTimeout(() => {
            setInvalid(false);
        }, 1000);

        // Save timer and return out.
        setTimer(timer);
    }

    // Clear the invalid timer on change.
    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    // Listen for fetching changes.
    useEffect(() => {
        // Handle error and missing data.
        if (error) markInvalid();
        if (! data || ! data.shortlink) return;

        // Extract item and type from request.
        const item = data.shortlink.resource;
        const { __typename: type } = item;

        // Navigate to the type and pass item.
        const route = type+'View';
        navigation.navigate({
            key: route + item.id,
            routeName: route,
            params: { item },
        });
    }, [data, error]);

    // Callback on barcode scan result.
    const scan = ({ data }) => {
        // Skip if already loading.
        if (loading) return;

        // Attempt to extract key from QR-code.
        let key = data.match('https://link.zooium.com/(.*)');

        // Check if invalid QR-code.
        if (! key || ! key[1]) {
            markInvalid();
            return;
        }

        // Set hash and fetch.
        setHash(key[1]);
        loadShortlink();
    }

    // Return permission status based views.
    if (status === 'undetermined') {
        return <Loader />;
    } else if (status !== 'granted') {
        return (
            <PermissionDenied text={i18n.t('In order to use this feature you must allow access to your camera!')} retry={requestPermission}>
                <ModalClose />
            </PermissionDenied>    
        );
    }

    // Return bar code scanner view.
    return (
        <Layout {...props} style={{flex: 1, backgroundColor: status === 'granted' && 'black'}}>
            <NavigationEvents
                onWillFocus={() => setRender(true)}
                onDidBlur={() => setRender(false)}
            />

            {render && <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scan}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.8,
                }}>
                    <ModalClose />

                    {invalid && (
                        <View>
                            <Icon name="times" size={150} color={theme['color-danger-500']} />
                            <Text status="danger" category="h6">
                                {i18n.t('Invalid code').toUpperCase()}
                            </Text>
                        </View>
                    ) || loading && (
                        <Loader />
                    )}
                </View>
            </BarCodeScanner>}
        </Layout>
    );
}
