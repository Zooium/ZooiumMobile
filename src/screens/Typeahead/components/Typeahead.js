import React from 'react';
import i18n from '@src/i18n.js';
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

        title: i18n.t('Select {{resource}}', {
            resource: navigation.getParam('resource'),
        }),

        headerRight: add && (
            <HeaderButtons>
                <Item title="add" iconName="plus" onPress={() => {
                    navigation.navigate(add, { item: undefined });
                }} />
            </HeaderButtons>
        ) || undefined,
    };
}

export default withNavigation(Typeahead);
