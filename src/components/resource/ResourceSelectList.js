import theme from '@src/theme.js';
import { FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableHighlight } from 'react-native';
import ResourceListItem from './ResourceListItem.js';
import ResourceListEmpty from './ResourceListEmpty.js';
import mergeLoadMore from '@utils/apollo/mergeLoadMore.js';

function ResourceSelectList({ name, list, deps = [], query, preview, itemProps, navigation }) {
    // Seperate out variables.
    const { loading, refetch } = query;

    // Define resource item view functions.
    const onChange = navigation.getParam('onChange');
    const viewItem = (item) => {
        onChange && onChange(item);
        navigation.goBack();
    };

    // Create callbacks for resource item renderings.
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={name.toLowerCase()} />, deps);
    const itemCallback = useCallback(({ item }) => (
        <TouchableHighlight underlayColor={theme['color-basic-200']} style={{ backgroundColor: 'white' }} onPress={() => viewItem(item)}>
            <ResourceListItem item={item} preview={preview} {...itemProps} />
        </TouchableHighlight>
    ), deps);

    // Return the flat list view.
    return (
        <FlatList
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            data={list || []}
            renderItem={itemCallback}
            ListEmptyComponent={emptyCallback}
            onRefresh={() => refetch()}
            refreshing={loading}
            onEndReached={() => mergeLoadMore(query)}
            onEndReachedThreshold={0.2}
            contentContainerStyle={{
                flexGrow: 1,
            }}
        />
    );
}

export default withNavigation(ResourceSelectList);
