import React from 'react';
import i18n from '@src/i18n.js';
import { View, Text } from 'react-native';

export default ({ resource }) => {
    return (
        <View style={{
            alignItems: 'center',
            paddingVertical: 12,
        }}>
            <Text>
                {i18n.t('No {{resource}} matched the given criteria.', { resource })}
            </Text>
        </View>
    );
};
