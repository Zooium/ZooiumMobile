import theme from '@src/theme.js';
import React, { useCallback } from 'react';
import AppStyles from '@utils/AppStyles.js';
import ResourceListEmpty from './ResourceListEmpty.js';
import mergeLoadMore from '@utils/apollo/mergeLoadMore.js';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function ResourceSelectList({ name, list, query, preview: Preview, extraData }) {
    // Seperate out variables.
    const { loading, refetch } = query;

    // Define resource item view functions.
    const navigation = useNavigation();
    const onChange = useNavigationParam('onChange');
    const viewItem = (item) => {
        onChange && onChange(item);
        navigation.goBack();
    };

    // Create callbacks for resource item renderings.
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={name.toLowerCase()} />, []);
    const itemCallback = useCallback(({ item }) => (
        <TouchableHighlight underlayColor={theme['color-basic-200']} style={{ backgroundColor: 'white' }} onPress={() => viewItem(item)}>
            <View style={AppStyles.listItem}>
                <Preview item={item} {...extraData} />
            </View>
        </TouchableHighlight>
    ), [Preview, extraData]);

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
            extraData={extraData}
            contentContainerStyle={{
                flexGrow: 1,
            }}
        />
    );
}
