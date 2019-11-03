import theme from '@src/theme.js';
import React, { memo } from 'react';
import { Icon } from 'react-native-ui-kitten';
import { View, TouchableOpacity } from 'react-native';

export default memo(({ item, editItem, deleteItem }) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
        }}>
            <TouchableOpacity style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',

                paddingHorizontal: 25,
                backgroundColor: theme['color-danger-500'],
            }} onPress={() => deleteItem(item)}>
                <Icon name="trash-alt" size={22} color="white" style={{ opacity: .8 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',

                paddingHorizontal: 25,
                backgroundColor: theme['color-primary-500'],
            }} onPress={() => editItem(item)}>
                <Icon name="pencil-alt" size={22} color="white" style={{ opacity: .8 }} />
            </TouchableOpacity>
        </View>
    );
});
