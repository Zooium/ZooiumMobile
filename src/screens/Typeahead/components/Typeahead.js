import React from 'react';
import { withNavigation } from 'react-navigation';
import ResourceList from '@components/resource/ResourceList.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import ResourceSelectList from '@components/resource/ResourceSelectList.js';

function Typeahead(props) {
    return (
        <KeyboardAvoidingLayout>
            <ResourceList List={ResourceSelectList} {...props} />
        </KeyboardAvoidingLayout>
    );
}

Typeahead.navigationOptions = ({ navigation }) => {
    const add = navigation.getParam('add', false);

    return {
        ...ResourceList.navigationOptions({ navigation, hasRightSearchItem: true, onSearchCancel: () => {
            navigation.goBack();
        } }),

        headerRight: add && (
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
        ) || undefined,
    };
}

export default withNavigation(Typeahead);
