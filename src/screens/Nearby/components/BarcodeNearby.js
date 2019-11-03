import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { Icon, Text } from 'react-native-ui-kitten';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PermissionDenied from '@components/PermissionDenied.js';

export default function BarcodeNearby(props) {
    const [status, setStatus] = useState('undetermined');
    const [invalid, setInvalid] = useState(false);
    const [timer, setTimer] = useState(undefined);

    // Request camera usage permissions.
    requestPermission = async () => {
        // Request the user permission to camera services.
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        setStatus(status);
    }

    // Request permissions on boot.
    useEffect(() => {
        requestPermission();
    }, []);

    // Clear the invalid timer on change.
    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    // Callback on barcode scan result.
    scan = ({ data }) => {
        // Attempt to extract key from QR-code.
        let key = data.match('https:\/\/scan\.zooium\.com\/(.*)');

        // Check if invalid QR-code.
        if (! key) {
            // Mark as invalid and start unset timer.
            setInvalid(true);
            const timer = setTimeout(() => {
                setInvalid(false);
            }, 1000);

            // Save timer and return out.
            setTimer(timer);
            return;
        }

        // @wip
        alert(data);
    }

    // Return permission status based views.
    if (status === 'undetermined') {
        return <Loader />;
    } else if (status !== 'granted') {
        return <PermissionDenied text={i18n.t('In order to use this feature you must allow access to your camera')} retry={requestPermission} />;
    }

    // Return bar code scanner view.
    return (
        <View {...props} style={{flex: 1}}>
            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scan}
                style={{ flex: 1 }}
            >
                {invalid &&
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.8,
                    }}>
                        <Icon name="times" size={150} color={theme['color-danger-500']} />
                        <Text status="danger" category="h6">
                            {i18n.t('Invalid code').toUpperCase()}
                        </Text>
                    </View>
                }
            </BarCodeScanner>
        </View>
    );
}
