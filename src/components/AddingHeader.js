import React from 'react';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

export default function AddingHeader(props) {
    return (
        <HeaderButtons>
            <Item title="add" iconName="plus" {...props} />
        </HeaderButtons>
    )
}
