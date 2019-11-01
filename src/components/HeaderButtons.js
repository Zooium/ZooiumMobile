import React from 'react';
import { Icon } from 'react-native-ui-kitten';
import { HeaderButtons as Holder, HeaderButton } from 'react-navigation-header-buttons';

export function HeaderButtons(props) {
    return (
        <Holder color="white" HeaderButtonComponent={(props) => (
            <HeaderButton {...props} IconComponent={Icon} iconSize={20} color="white" />
        )} {...props} />
    )
}

export { Item } from 'react-navigation-header-buttons';
