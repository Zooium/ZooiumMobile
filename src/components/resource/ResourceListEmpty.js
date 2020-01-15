import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

export default function ResourceListEmpty({ resource }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
            <Icon name="binoculars" size={75} color={theme['color-basic-500']} solid />

            <Text style={{ marginTop: 20 }}>
                {i18n.t('No {{resource}} matched the given criteria.', { resource })}
            </Text>
        </View>
    );
}
