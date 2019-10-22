import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { HeaderButtons as Holder, HeaderButton } from 'react-navigation-header-buttons';

export function HeaderButtons(props) {
    return (
        <Holder color="white" HeaderButtonComponent={(props) => (
            <HeaderButton {...props} IconComponent={FontAwesome5} iconSize={20} color="white" />
        )} {...props} />
    )
}

export { Item } from 'react-navigation-header-buttons';
