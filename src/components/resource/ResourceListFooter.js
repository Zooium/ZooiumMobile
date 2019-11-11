import React, { memo } from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import { Text, Spinner } from 'react-native-ui-kitten';

export default memo(function ResourceListFooter({ hasMore }) {
    return (
        <View style={{                    
            alignItems: 'center',
            paddingVertical: 12,
        }}>
            {hasMore && <Spinner /> || <Text>{i18n.t('You have reached the end!')}</Text>}
        </View>
    );
});
