import React from 'react';
import i18n from '@src/i18n.js';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function ModalClose() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.goBack();
        }} style={{
            position: 'absolute',
            bottom: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,

            backgroundColor: 'rgba(0, 0, 0, 0.6)',

            borderWidth: 1,
            borderRadius: 6,
            borderColor: 'rgba(255, 255, 255, 0.2)',
        }}>
            <Text category="h6" style={{ fontWeight: 'normal', color: 'white' }}>
                {i18n.t('Close')}
            </Text>
        </TouchableOpacity>
    )
}
