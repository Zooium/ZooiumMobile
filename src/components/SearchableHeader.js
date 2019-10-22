import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default function SearchableHeader(props) {
    const { value, toggle } = props;

    return (
        <HeaderButtons>
            <Item title="search" iconName="search" onPress={() => toggle(! value)} {...props} />
        </HeaderButtons>
    )
}
