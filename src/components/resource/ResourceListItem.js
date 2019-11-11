import React, { memo } from 'react';
import AppStyles from '@utils/AppStyles.js';
import { View, TouchableHighlight } from 'react-native';

export default memo(function ResourceListItem({ item, viewItem, preview: Preview }) {
    return (
        <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)}>
            <View style={AppStyles.listItem}>
                <Preview item={item} />
            </View>
        </TouchableHighlight>
    );
});
