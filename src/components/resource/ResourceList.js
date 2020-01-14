import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import Loader from '@components/Loader.js';
import { useDebounce } from 'use-debounce';
import AuthState from '@utils/AuthState.js';
import { Layout } from '@ui-kitten/components';
import { useQuery } from '@apollo/react-hooks';
import { View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import parseQuery from '@utils/apollo/parseQuery.js';
import ListSettings from '@components/ListSettings.js';
import ResourceSwipeList from './ResourceSwipeList.js';
import React, { Fragment, useState, useEffect } from 'react';
import parsePagination from '@utils/apollo/parsePagination.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

function ResourceList({ fetch, variables = {}, List, navigation, routes, sorting, defaultSort = 'id', filters, ...props }) {
    const [showSettings, setShowSettings] = useState(false);

    // Define sorting related variables.
    const [filter, setFilter] = useState(['active']);
    const [sort, setSort] = useState({
        column: defaultSort,
        direction: 'desc',
    });

    // Define search related variables.
    const navSearch = navigation.getParam('search', null);
    const appendSearch = navigation.getParam('appendSearch', null);
    const [search, setSearch] = useState(navSearch);
    const [debouncedSearch] = useDebounce(search, 500);

    // Determine final search query.
    const finalSearch = (search || appendSearch)
        ? [appendSearch, debouncedSearch].join(' ').trim()
        : undefined;

    // Share set search, show settings, and create item.
    useEffect(() => {
        navigation.setParams({
            setSearch,
            setShowSettings,

            createItem: () => {
                navigation.navigate({
                    key: routes.view + Math.random().toString(36).slice(2),
                    routeName: routes.edit,
                    params: {
                        defaults: navigation.getParam('defaults'),
                    },
                });
            },
        });
    }, []),

    // Share settings show state.
    useEffect(() => {
        navigation.setParams({ showSettings })
    }, [showSettings]);

    // Set search on navbar search text change.
    useEffect(() => {
        if (navSearch) setSearch(navSearch);
    }, [navSearch]);

    // Prepare resource list query.
    const query = useQuery(fetch, {
        notifyOnNetworkStatusChange: true,
        variables: {
            ...variables,
            team_id: AuthState.currentTeamID(),

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

ResourceList.navigationOptions = ({ navigation, onSearchCancel = undefined, hasRightSearchItem = false }) => {
    // Return search based header options if requested.
    if (navigation.getParam('showSearch', false)) {
        return {
            headerRight: () => null,
            headerLeft: () => (
                <HeaderButtons left={true}>
                    <Item title="return" iconName="arrow-left" onPress={() => {
                        if (onSearchCancel) return onSearchCancel();
                        if (navigation.state && navigation.state.key && navigation.goBack()) return;

                        navigation.getParam('setSearch')(null);
                        navigation.setParams({
                            search: null,
                            showSearch: false
                        });
                    }} />
                </HeaderButtons>
            ),
    
            headerTitleAlign: 'left',
            headerTitleContainerStyle: {
                flex: 1,
                right: hasRightSearchItem ? 48 : 14,
            },

            headerTitle: () => (
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
            ),
        };
    }

    // Determine if can go back.
    let canGoBack = navigation.isFocused() && navigation.dangerouslyGetParent().state.index > 0;

    // Return default navigation options.
    return {
        headerLeft: () => (
            <HeaderButtons left={true}>
                {canGoBack && (
                    <Item title="return" iconName="arrow-left" onPress={() => navigation.goBack()} />
                )}

                <Item title="add" iconName="plus" onPress={() => {
                    navigation.getParam('createItem') && navigation.getParam('createItem')();
                }} />
            </HeaderButtons>
        ),

        headerRight: ({ items = undefined } = {}) => (
            <HeaderButtons>
                <Item title="search" iconName="search" onPress={() => {
                    navigation.setParams({
                        showSearch: true,
                        focusSearch: true,
                    });
                }} />

                <Item title="filter" iconName="filter" onPress={() => {
                    navigation.getParam('setShowSettings')(! navigation.getParam('showSettings', false));
                }} />

                { items && items() }
            </HeaderButtons>
        ),
    }
}

ResourceList.propTypes = {
    name: PropTypes.string.isRequired,
    fetch: PropTypes.object.isRequired,
    preview: PropTypes.elementType.isRequired,
    variables: PropTypes.object,
    showRefresh: PropTypes.bool,
    extraData: PropTypes.object,
    
    routes: PropTypes.shape({
        view: PropTypes.string.isRequired,
        edit: PropTypes.string.isRequired,
    }),
    
    mutations: PropTypes.shape({
        remove: PropTypes.object.isRequired,
    }),
}

export default withNavigation(ResourceList);
