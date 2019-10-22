import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchableHeader({ value, toggle }) {
    return (
        <FontAwesome5 name="search" size={20} color="white" style={{ marginRight: 20 }} onPress={() => toggle(! value)} />
    )
}
