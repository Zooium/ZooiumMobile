import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Icon, Text } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PermissionDenied from '@components/PermissionDenied.js';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import VIEW_SHORTLINK from '@graphql/queries/Shortlink/viewShortlink.gql.js';

function BarcodeNearby(props) {
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
        props.navigation.setParams({
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
        props.navigation.navigate({
            routeName: 'View'+type,
            params: { item },
        })
    }, [data, error]);

    // Callback on barcode scan result.
    const scan = ({ data }) => {
        // Skip if already loading or not focused.
        if (loading || ! props.isFocused) return;

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
        return <PermissionDenied text={i18n.t('In order to use this feature you must allow access to your camera!')} retry={requestPermission} />;
    }

    // Return bar code scanner view.
    return (
        <View {...props} style={{flex: 1}}>
            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scan}
                style={{ flex: 1 }}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.8,
                }}>
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
            </BarCodeScanner>
        </View>
    );
}

export default withNavigationFocus(withNavigation(BarcodeNearby));
