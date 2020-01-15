import { View } from 'react-native';
import React, { memo } from 'react';
import AppStyles from '@utils/AppStyles.js';

function ResourceListItem({ item, preview: Preview, ...props }) {
    return (
        <View style={AppStyles.listItem}>
            <Preview item={item} {...props} />
        </View>
    );
}

export default memo(ResourceListItem);
