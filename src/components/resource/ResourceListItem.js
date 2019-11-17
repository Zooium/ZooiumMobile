import PropTypes from 'prop-types';
import React, { memo } from 'react';
import AppStyles from '@utils/AppStyles.js';
import { View, TouchableHighlight } from 'react-native';

function ResourceListItem({ item, viewItem, preview: Preview, ...props }) {
    return (
        <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)}>
            <View style={AppStyles.listItem}>
                <Preview item={item} {...props} />
            </View>
        </TouchableHighlight>
    );
}

ResourceListItem.propTypes = {
    item: PropTypes.object.isRequired,
    viewItem: PropTypes.func.isRequired,
    preview: PropTypes.elementType.isRequired,
}

export default memo(ResourceListItem);
