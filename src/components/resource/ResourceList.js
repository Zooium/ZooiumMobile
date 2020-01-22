import i18n from '@src/i18n.js';
import { TextInput } from 'react-native';
import Loader from '@components/Loader.js';
import { useDebounce } from 'use-debounce';
import { Layout } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import parseQuery from '@utils/apollo/parseQuery.js';
import { useTeam } from '@providers/AuthProvider.js';
import ListSettings from '@components/ListSettings.js';
import ResourceSwipeList from './ResourceSwipeList.js';
import React, { Fragment, useState, useEffect } from 'react';
import parsePagination from '@utils/apollo/parsePagination.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function ResourceList({ fetch, variables = {}, List, routes, sorting, defaultSort = 'id', filters, ...props }) {
    const navigation = useNavigation();
    const [showSettings, setShowSettings] = useState(false);

    // Define sorting related variables.
    const [filter, setFilter] = useState(['active']);
    const [sort, setSort] = useState({
        column: defaultSort,
        direction: 'desc',
    });

    // Define search related variables.
    const navSearch = useNavigationParam('search', null);
    const appendSearch = useNavigationParam('appendSearch', null);
    const [search, setSearch] = useState(navSearch);
    const [debouncedSearch] = useDebounce(search, 500);

    // Determine final search query.
    const finalSearch = (search || appendSearch)
        ? [appendSearch, debouncedSearch].join(' ').trim()
        : undefined;

    // Share set search, show settings, and create item.
    const { view, edit } = routes || {};
    const createParams = useNavigationParam('createParams');
    useEffect(() => {
        navigation.setParams({
            setSearch,
            setShowSettings,

            createItem: () => {
                navigation.navigate({
                    key: view + Math.random().toString(36).slice(2),
                    routeName: edit,
                    params: createParams,
                });
            },
        });
    }, [view, edit, createParams, setSearch, setShowSettings]),

    // Share settings show state.
    useEffect(() => {
        navigation.setParams({ showSettings });
    }, [showSettings]);

    // Set search on navbar search text change.
    useEffect(() => {
        if (navSearch) setSearch(navSearch);
    }, [navSearch]);

    // Prepare resource list query.
    const team = useTeam();
    const query = useQuery(fetch, {
        notifyOnNetworkStatusChange: true,
        variables: {
            ...variables,
            team_id: team && team.id,

            search: finalSearch,
            filter: filter || undefined,
            sorting: sort || undefined,
        },
    });

    // Parse the query response.
    const { loading, data } = query;
    const { response } = parseQuery(data);
    const { init, list } = parsePagination(response);

    // Return the resource list view.
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                {(loading && init && ! search) && <Loader /> || (
                    <Fragment>
                        {showSettings && (
                            <ListSettings
                                sort={sort}
                                setSort={setSort}
                                sorting={sorting}
                                filter={filter}
                                setFilter={setFilter}
                                filters={filters}
                            />
                        )}

                        {List && (
                            <List list={list} query={query} {...props} />
                        ) || (
                            <ResourceSwipeList routes={routes} list={list} query={query} {...props} />
                        )}
                    </Fragment>
                )}
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ResourceList.navigationOptions = ({ navigation, showAdding = true, showFilters = true }) => {
    // Get show search status and if can return.
    const showSearch = navigation.getParam('showSearch', false);
    let canGoBack = navigation.isFocused() && navigation.dangerouslyGetParent().state.index > 0;

    // Return navigation options.
    return {
        headerTitleAlign: showSearch ? 'left' : 'center',

        headerLeft: function ResourceListLeftItems() {
            return (
                <HeaderButtons left={true}>
                    {(canGoBack || showSearch) && (
                        <Item title="return" iconName="arrow-left" onPress={() => {
                            // Navigate to previous view if not searching or has state.
                            if (! showSearch && navigation.goBack()) return;
                            if (navigation.state && navigation.state.key && navigation.goBack()) return;
                    
                            // Cancel searching.
                            navigation.getParam('setSearch')(null);
                            navigation.setParams({
                                search: null,
                                showSearch: false
                            });
                        }} />
                    )}

                    {! showSearch && showAdding && (
                        <Item title="add" iconName="plus" onPress={() => {
                            navigation.getParam('createItem') && navigation.getParam('createItem')();
                        }} />
                    )}
                </HeaderButtons>
            );
        },

        headerRight: function ResourceListRightItems() {
            return (
                <HeaderButtons>
                    {showSearch && showAdding && (
                        <Item title="add" iconName="plus" onPress={() => {
                            navigation.getParam('createItem') && navigation.getParam('createItem')();
                        }} />
                    ) || ! showSearch && (
                        <Item title="search" iconName="search" onPress={() => {
                            navigation.setParams({
                                showSearch: true,
                                focusSearch: true,
                            });
                        }} />
                    )}

                    {showFilters && (
                        <Item title="filter" iconName="filter" onPress={() => {
                            navigation.getParam('setShowSettings')(! navigation.getParam('showSettings', false));
                        }} />
                    )}
                </HeaderButtons>
            );
        },

        headerTitle: showSearch && (function SearchBarRender() {
            return (
                <TextInput
                    clearButtonMode="always"
                    selectionColor="white"
                    placeholder={i18n.t('Enter criteria to search...')}
                    autoFocus={navigation.getParam('focusSearch', true)}
                    defaultValue={navigation.getParam('search')}
                    onChangeText={navigation.getParam('setSearch')}
                    style={{
                        width: '100%',
                        color: 'white',
                        fontSize: 18,
                    }}
                />
            );
        }) || navigation.getParam('overrideTitle'),
    }
}
