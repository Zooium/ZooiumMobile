import i18n from '@src/i18n.js';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import ResourceListItem from './ResourceListItem.js';
import React, { useEffect, useCallback } from 'react';
import ResourceListEmpty from './ResourceListEmpty.js';
import mergeLoadMore from '@utils/apollo/mergeLoadMore.js';
import ResourceListActions from './ResourceListActions.js';
import { SwipeListView } from 'react-native-swipe-list-view';

function ResourceSwipeList({ name, list, deps = [], query, routes, mutations: { remove }, preview, itemProps, extraData, showRefresh = true, navigation, ...props }) {
    // Seperate out variables.
    const { view, edit } = routes;
    const { loading, refetch } = query;

    // Prepare item removal mutation.
    const [removeItems] = useMutation(remove, {
        update() {
            refetch(); // @wip - Invalidate or write to cache instead?
        },
    });

    // Define resource item CRUD functions.
    const viewItem = (item) => navigation.navigate({
        key: view + item.id,
        routeName: view,
        params: { item },
    });

    const editItem = (item = undefined) => navigation.navigate({
        key: view + ((item && item.id) || Math.random().toString(36).slice(2)),
        routeName: edit,
        params: { item },
    });

    const deleteItem = (item) => Alert.alert(
        i18n.t('Deletion Confirmation'),
        i18n.t('Are you sure you want to delete "{{name}}"?', {
            name: item.name || item.identifier || '(' + i18n.t('name not set') + ')',
        }),
        [
            { text: i18n.t('Cancel'), style: 'cancel' },
            { text: i18n.t('Delete'), onPress: () => {
                removeItems({
                    variables: {
                        ids: [item.id],
                    },
                });
            } },
        ],
    );

    // Share create item with navigation.
    useEffect(() => {
        navigation.setParams({
            createItem: () => {
                editItem();
            },
        });
    }, []);

    // Create callbacks for resource item renderings.
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={name.toLowerCase()} />, deps);
    const actionsCallback = useCallback(({ item }) => <ResourceListActions item={item} editItem={editItem} deleteItem={deleteItem} />, deps);
    const itemCallback = useCallback(({ item }) => <ResourceListItem item={item} viewItem={viewItem} preview={preview} {...itemProps} />, deps);

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

export default withNavigation(ResourceSwipeList);
