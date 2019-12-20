import React from 'react';
import { View } from 'react-native';
import Loader from '@components/Loader.js';
import { Text } from '@ui-kitten/components';

export default function LoadingModal({ text }) {
    return (
        <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <Loader size="small" style={{
                borderRadius: 6,
                paddingVertical: 14,
                paddingHorizontal: 34,
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <Text category="s1" status="primary" style={{ marginTop: 10 }}>
                    {text}
                </Text>
            </Loader>
        </View>
    )
}
