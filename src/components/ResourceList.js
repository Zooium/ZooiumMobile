import { merge } from 'lodash';
import theme from '@src/theme.js';
import Loader from '@components/Loader.js';
import AuthState from '@utils/AuthState.js';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import React, { useState, useEffect } from 'react';
import AddingHeader from '@components/AddingHeader.js';
import DebouncedInput from '@components/DebouncedInput.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import SearchableHeader from '@components/SearchableHeader.js';
import { View, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';

function ResourceList({ fetch, variables = {}, routes: { view, edit }, preview: Preview, navigation }) {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    let searchInput = React.createRef();

    viewItem = (item) => navigation.navigate(view, { item });
    editItem = (item = undefined) => navigation.navigate(edit, { item });

    useEffect(() => {
        navigation.setParams({
            editItem: editItem,
        });
    }, []);

    useEffect(() => {
        // Focus search input if shown and not focused.
        if (showSearch && searchInput.current && ! searchInput.current.isFocused()) {
            searchInput.current.focus();
        }

        // Pass search value and toggle to navigator.
        if (navigation.getParam('showSearch') !== showSearch) {
            navigation.setParams({
                showSearch: showSearch,
                setShowSearch: setShowSearch,
            })
        }
    }, [showSearch]);

    const team = AuthState.currentTeam();
    const { loading, data, refetch, fetchMore } = useQuery(fetch, {
        variables: {
            search: showSearch && query || undefined,
            team_id: team && team.id,
            ...variables,
        },
    });

    key = data && Object.keys(data)[0] || undefined;
    response = key && data && data[key] || [];

    if (loading && page === 1 && ! query) return <Loader />;

    refresh = () => {
        setPage(1);
        refetch();
    }

    loadMore = () => {
        // Skip if loading or has no more items to show.
        if (loading || response.total <= (response.per_page * page)) return;

        // Determine next page.
        let nextPage = page + 1;
        setPage(nextPage);

        // Fetch more results.
        fetchMore({
            variables: { page: nextPage },
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

    deleteItem = (item) => {
        // @wip
    }

    item = ({ item }) => {
        return (
            <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)}>
                <View style={s.frontRow}>
                    <Preview item={item} />
                </View>
            </TouchableHighlight>
        );
    }

    actions = ({ item }) => {
        return (
            <View style={s.backRow}>
                <TouchableOpacity style={s.delete} onPress={() => deleteItem(item)}>
                    <FontAwesome5 name="trash-alt" size={22} color="white" style={{ opacity: .8 }} />
                </TouchableOpacity>

                <TouchableOpacity style={s.edit} onPress={() => editItem(item)}>
                    <FontAwesome5 name="pencil-alt" size={22} color="white" style={{ opacity: .8 }} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            {showSearch &&
                <DebouncedInput ref={searchInput} get={query} set={setQuery} style={{
                    zIndex: 1,
                    borderRadius: 0,
                    borderColor: 'white',

                    shadowRadius: 4,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },

                    elevation: 3,
                }} onIconPress={() => setShowSearch(false)} icon={() => (
                    <FontAwesome5 name="times" size={22} color="#000" style={{ opacity: .4 }} />
                )} />
            }

            <SwipeListView
                keyExtractor={item => item.id}
                data={response && response.data || []}
                renderItem={item}
                renderHiddenItem={actions} 
                onRefresh={refresh}
                refreshing={loading}
                onEndReached={loadMore}
                leftOpenValue={75}
                stopLeftSwipe={85}
                rightOpenValue={-75}
                stopRightSwipe={-85}
            />
        </View>
    );
}

ResourceList.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <AddingHeader style={{ marginLeft: 10 }} onPress={() => navigation.getParam('editItem')()} />
    ),

    headerRight: (
        <SearchableHeader style={{ marginRight: 10 }} value={navigation.getParam('showSearch')} toggle={navigation.getParam('setShowSearch')} />
    ),

    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
    },
});

export default withNavigation(ResourceList);

let s = StyleSheet.create({
    frontRow: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',

        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 5,
    },

    backRow: {
		flex: 1,
		flexDirection: 'row',
        alignItems: 'stretch',
		justifyContent: 'space-between',
    },

    delete: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',

        paddingHorizontal: 25,
        backgroundColor: theme['color-danger-500'],
    },

    edit: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',

        paddingHorizontal: 25,
        backgroundColor: theme['color-primary-500'],
    },
});
