import React from 'react';
import AppStyles from '@utils/AppStyles.js';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

export default function MapViewExpander({ onPress }) {
    return (
        <TouchableOpacity style={[AppStyles.shadow1, {
            position: 'absolute',
            top: 5, right: 5,
            width: 36, height: 30,

            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, .6)',

            alignItems: 'center',
            justifyContent: 'center',
        }]} onPress={onPress}>
            <Icon name="external-link-alt" color="white" size={16} solid />
        </TouchableOpacity>
    );
}
