import { merge } from 'lodash';
import i18n from '@src/i18n.js';
import { Text, View } from 'react-native';
import Loader from '@components/Loader.js';
import AuthState from '@utils/AuthState.js';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation';
import ResourceListItem from './ResourceListItem.js';
import ResourceListEmpty from './ResourceListEmpty.js';
import AddingHeader from '@components/AddingHeader.js';
import ResourceListFooter from './ResourceListFooter.js';
import ResourceListActions from './ResourceListActions.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import FullWidthSearch from '@components/FullWidthSearch.js';
import SearchableHeader from '@components/SearchableHeader.js';
import React, { useState, useEffect, useCallback, createRef } from 'react';

function ResourceList({ fetch, variables = {}, routes: { view, edit }, preview, navigation }) {
    const searchInput = createRef();
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    viewItem = (item) => navigation.navigate(view, { item });
    editItem = (item = undefined) => navigation.navigate(edit, { item });
    deleteItem = (item) => { /* @wip */ };

    itemCallback = useCallback(({ item }) => <ResourceListItem item={item} viewItem={viewItem} preview={preview} />, []);
    emptyCallback = useCallback(() => <ResourceListEmpty resource={i18n.t('Animal', { count: 2 }).toLowerCase()} />, []);
    actionsCallback = useCallback(({ item }) => <ResourceListActions item={item} editItem={editItem} deleteItem={deleteItem} />, []);

    useEffect(() => {
        navigation.setParams({
            editItem: editItem,
            toggleSearch: () => setShowSearch(state => ! state),
        })
    }, []);

    useEffect(() => {
        // Focus search input if shown and not focused.
        if (showSearch && searchInput.current && ! searchInput.current.isFocused()) {
            searchInput.current.focus();
        }
    }, [showSearch]);

    const team = AuthState.currentTeam();
    const { loading, data, refetch, fetchMore } = useQuery(fetch, {
        notifyOnNetworkStatusChange: true,
        variables: {
            search: showSearch && query || undefined,
            team_id: team && team.id,
            ...variables,
        },
    });

    const key = data && Object.keys(data)[0] || undefined;
    const response = key && data && data[key] || [];

    const init = ! response || ! response.data;
    const page = ! init ? Math.ceil(response.data.length / response.per_page) : 1;
    const hasMore = !init && response.total > (response.per_page * page);

    loadMore = () => {
        // Skip if loading or has no more items to show.
        if (loading || ! hasMore) return;

        // Fetch more results.
        fetchMore({
            variables: { page: page + 1 },
            updateQuery: (previous, { fetchMoreResult: results }) => {
                // Return previous if has no results.
                if (! results || ! results[key] || ! results[key].data) return previous;

                // Merge the two data sources.
                let data = merge({}, results);
                data[key].data = [
                    ...previous[key].data,
                    ...results[key].data,
                ];

                // Return new list.
                return data;
            },
        });
    }

    return (loading && init && ! query ? <Loader /> : (
        <View style={{flex:1}}>
            {showSearch && <FullWidthSearch get={query} set={setQuery} ref={searchInput} setShowSearch={setShowSearch} />}

            <SwipeListView
                keyExtractor={item => item.id}
                data={response && response.data || []}
                renderItem={itemCallback}
                renderHiddenItem={actionsCallback} 
                ListEmptyComponent={emptyCallback}
                ListFooterComponent={() => <ResourceListFooter hasMore={hasMore} />}
                onRefresh={() => refetch()}
                refreshing={loading}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
                leftOpenValue={75}
                stopLeftSwipe={85}
                rightOpenValue={-75}
                stopRightSwipe={-85}
            />
        </View>
    ));
}

ResourceList.navigationOptions = ({ navigation }) => ({
    headerLeft: <AddingHeader style={{ marginLeft: 10 }} onPress={() => navigation.getParam('editItem')()} />,
    headerRight: <SearchableHeader style={{ marginRight: 10 }} onPress={() => navigation.getParam('toggleSearch')()} />,
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
    },
});

export default withNavigation(ResourceList);
