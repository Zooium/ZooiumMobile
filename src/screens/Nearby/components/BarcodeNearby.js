import i18n from '@src/i18n.js';
import { View } from 'react-native';
import Loader from '@components/Loader.js';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PermissionDenied from '@components/PermissionDenied.js';

export default function BarcodeNearby(props) {
    const [status, setStatus] = useState('undetermined');

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

    // Callback on barcode scan result.
    scan = ({ type, data }) => {
        alert(type + ", " + data);
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
                style={{flex: 1}}
            />
        </View>
    );
}
