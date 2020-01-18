import React, { memo } from 'react';
import { View  } from 'react-native';
import { Text } from '@ui-kitten/components';
import SpecieSettings from '@settings/SpecieSettings.js';

function SpecieRow({ item }) {    
    return (
        <View>
            <Text category="h6">
                {SpecieSettings.title(item)}
            </Text>

            <Text appearance="hint">
                {item.scientific}
            </Text>
        </View>
    );
}

export default memo(SpecieRow);
