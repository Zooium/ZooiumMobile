import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AddingHeader(props) {
    return (
        <FontAwesome5 name="plus" size={20} color="white" style={{ marginLeft: 20 }} {...props} />
    )
}
