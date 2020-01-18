import React, { memo } from 'react';
import { View  } from 'react-native';
import { Text } from '@ui-kitten/components';
import Specie from '@models/Specie.model.js';

function SpecieRow({ item }) {    
    return (
        <View>
            <Text category="h6">
                {Specie.title(item)}
            </Text>

            <Text appearance="hint">
                {item.scientific}
            </Text>
        </View>
    );
}

export default memo(SpecieRow);
