import './IconLibrary.js';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

function FontAwesome5({ name, style, ...otherProps }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style) || {};
    
    let pack = 'far';
    if (otherProps.light) pack = 'fal';
    if (otherProps.solid) pack = 'fas';

    return (
        <Icon
            icon={[pack, name]}
            size={height}
            color={tintColor}
            style={iconStyle}
            {...otherProps}
        />
    )
}

FontAwesome5.propTypes = {
    name: PropTypes.string.isRequired,
    style: Icon.propTypes.style,
}

function IconProvider(name) {
    return {
        toReactElement: (props) => FontAwesome5({ name, ...props }),
    }
}

function createIconsMap() {
    return new Proxy({}, {
        get(target, name) {
            return IconProvider(name);
        },
    })
}

export default {
    name: 'fa5',
    icons: createIconsMap(),
}
