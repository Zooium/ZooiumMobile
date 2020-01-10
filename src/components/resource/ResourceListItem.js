import PropTypes from 'prop-types';
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

ResourceListItem.propTypes = {
    item: PropTypes.object.isRequired,
    preview: PropTypes.elementType.isRequired,
}

export default memo(ResourceListItem);
