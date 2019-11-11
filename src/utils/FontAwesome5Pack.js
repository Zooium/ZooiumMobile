import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

function FontAwesome5({ name, style, ...otherProps }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style) || {};

    return (
        <Icon
            name={name}
            size={height}
            color={tintColor}
            style={iconStyle}
            {...otherProps}
            solid
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
