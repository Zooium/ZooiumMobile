import React from 'react';
import { View } from 'react-native';
import { Spinner } from 'react-native-ui-kitten';

export default function Loader({ size = 'giant', status = 'primary' }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={size} status={status} />
        </View>
    );
};

