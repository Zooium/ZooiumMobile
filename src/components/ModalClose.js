import React from 'react';
import i18n from '@src/i18n.js';
import { Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

function ModalClose({ navigation }) {
    return (
        <TouchableOpacity onPress={() => {
            navigation.goBack();
        }} style={{
            position: 'absolute',
            bottom: 15,
            borderRadius: 6,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
            <Text category="h6" style={{ fontWeight: 'normal', color: 'white' }}>
                {i18n.t('Close')}
            </Text>
        </TouchableOpacity>
    )
}

export default withNavigation(ModalClose);