import React from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default function SearchableHeader(props) {
    return (
        <HeaderButtons>
            <Item title="search" iconName="search" {...props} />
        </HeaderButtons>
    )
}
