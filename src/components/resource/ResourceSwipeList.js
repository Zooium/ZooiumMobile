import theme from '@src/theme.js';
import React, { useCallback } from 'react';
import AppStyles from '@utils/AppStyles.js';
import { useMutation } from '@apollo/react-hooks';
import ResourceListEmpty from './ResourceListEmpty.js';
import { useNavigation } from 'react-navigation-hooks';
import mergeLoadMore from '@utils/apollo/mergeLoadMore.js';
import ResourceListActions from './ResourceListActions.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Alert, View, TouchableHighlight } from 'react-native';
import DeletionConfirmation from '@utils/DeletionConfirmation.js';

export default function ResourceSwipeList({ name, list, title, query, routes, mutations: { remove }, preview: Preview, extraData, showRefresh = true, canModify, ...props }) {
    // Seperate out variables.
    const { view, edit } = routes;
    const { loading, refetch } = query;

    // Get navigation state.
    const navigation = useNavigation();

    // Prepare item removal mutation.
    const [removeItems] = useMutation(remove, {
        update(cache, { data }) {
            // Deep delete the items from cache.
            let deleted = data[Object.keys(data)[0]];
            deleted.forEach(item => cache.deepDelete(item));
        },
    });

    // Define resource item CRUD functions.
    const viewItem = useCallback((item) => {
        navigation.navigate({
            key: view + item.id,
            routeName: view,
            params: { item },
        });
    }, [view]);

    const editItem = useCallback((item = undefined) => {
        // Skip if not allowed to modify item. 
        const msg = item && canModify && canModify(item);
        if (typeof msg === 'string') return Alert.alert(msg);

        // Navigate to resource edit view.
        navigation.navigate({
            key: view + ((item && item.id) || Math.random().toString(36).slice(2)),
            routeName: edit,
            params: {
                item,
                editing: true, // TODO - Forcing edit as if key exists it will not use route name.
            },
        });
    }, [view, edit, canModify]);

    const deleteItem = useCallback((item) => {
        // Skip if not allowed to modify item. 
        const msg = item && canModify && canModify(item);
        if (typeof msg === 'string') return Alert.alert(msg);

        // Open deletion confirmation.
        return DeletionConfirmation(title(item), () => {
            removeItems({
                variables: {
                    ids: [item.id],
                },
            });
        });
    }, [canModify, title, removeItems]);

    // Create callbacks for resource item renderings.
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={name.toLowerCase()} />, [name]);
    const actionsCallback = useCallback(({ item }) => <ResourceListActions item={item} editItem={editItem} deleteItem={deleteItem} />, [editItem, deleteItem]);
    const itemCallback = useCallback(({ item }) => (
        <TouchableHighlight underlayColor={theme['color-basic-200']} style={{ backgroundColor: 'white' }} onPress={() => viewItem(item)}>
            <View style={AppStyles.listItem}>
                <Preview item={item} {...extraData} />
            </View>
        </TouchableHighlight>
    ), [extraData, viewItem]);

    // Return the swipe list view.
    return (
        <SwipeListView
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            data={list || []}
            renderItem={itemCallback}
            renderHiddenItem={actionsCallback} 
            ListEmptyComponent={emptyCallback}
            onRefresh={() => refetch()}
            refreshing={showRefresh && loading}
            onEndReached={() => mergeLoadMore(query)}
            onEndReachedThreshold={0.2}
            leftOpenValue={75}
            stopLeftSwipe={85}
            rightOpenValue={-75}
            stopRightSwipe={-85}
            extraData={extraData}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            {...props}
        />
    );
}
