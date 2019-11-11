import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

function FontAwesome5(props) {
    const { name, style, ...otherProps } = props;
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
