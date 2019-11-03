import { View } from 'react-native';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

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

    return (
        <View {...props}>
            <BarCodeScanner
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scan}
                style={{flex: 1}}
            />
        </View>
    );
}
