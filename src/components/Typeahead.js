import React from 'react';
import ResourceList from '@components/resource/ResourceList.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import ResourceSelectList from '@components/resource/ResourceSelectList.js';

export default function Typeahead(props) {
    return (
        <ResourceList List={ResourceSelectList} {...props} />
    );
}

Typeahead.navigationOptions = ({ navigation }) => {
    const add = navigation.getParam('add', false);

    return {
        ...ResourceList.navigationOptions({ navigation, hasRightSearchItem: true, onSearchCancel: () => {
            navigation.goBack();
        } }),

        headerRight: add && (() => (
            <HeaderButtons>
                <Item title="add" iconName="plus" onPress={() => {
                    const rand = Math.random().toString(36).slice(2);
                    navigation.navigate({
                        key: add + rand,
                        routeName: add,
                        params: { item: undefined },
                    });
                }} />
            </HeaderButtons>
        )) || undefined,
    };
}
