import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import Loader from '@components/Loader.js';
import { useDebounce } from 'use-debounce';
import AuthState from '@utils/AuthState.js';
import { useQuery } from '@apollo/react-hooks';
import { View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import React, { useState, useEffect } from 'react';
import parseQuery from '@utils/apollo/parseQuery.js';
import ResourceSwipeList from './ResourceSwipeList.js';
import parsePagination from '@utils/apollo/parsePagination.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceList({ fetch, variables = {}, List, navigation, ...props }) {
    // Define search related variables.
    const navSearch = navigation.getParam('search', null);
    const appendSearch = navigation.getParam('appendSearch', null);
    const [search, setSearch] = useState(navSearch);
    const [debouncedSearch] = useDebounce(search, 500);

    // Determine final search query.
    const finalSearch = (search || appendSearch)
        ? [appendSearch, debouncedSearch].join(' ').trim()
        : undefined;

    // Share set search function.
    useEffect(() => {
        navigation.setParams({ setSearch });
    }, []),

    // Set search on navbar search text change.
    useEffect(() => {
        if (navSearch) setSearch(navSearch);
    }, [navSearch]);

    // Prepare resource list query.
    const query = useQuery(fetch, {
        notifyOnNetworkStatusChange: true,
        variables: {
            ...variables,
            search: finalSearch,
            team_id: AuthState.currentTeamID(),
        },
    });

    // Parse the query response.
    const { loading, data } = query;
    const { response } = parseQuery(data);
    const { init, list } = parsePagination(response);

    // Return the resource list view.
    return (loading && init && ! search ? <Loader /> : (
        <View style={{flex:1}}>
            {List && <List list={list} query={query} {...props} /> || <ResourceSwipeList list={list} query={query} {...props} />}
        </View>
    ));
}

ResourceList.navigationOptions = ({ navigation: { getParam, setParams }, onSearchCancel = undefined, hasRightSearchItem = false }) => {
    // Return search based header options if requested.
    if (getParam('showSearch', false)) {
        return {
            headerRight: null,
            headerLeft: (
                <HeaderButtons left={true}>
                    <Item title="return" iconName="arrow-left" onPress={() => {
                        if (onSearchCancel) return onSearchCancel();

                        getParam('setSearch')(null);
                        setParams({
                            search: null,
                            showSearch: false
                        });
                    }} />
                </HeaderButtons>
            ),
    
            headerTitle: (
                <TextInput
                    clearButtonMode="always"
                    selectionColor="white"
                    placeholder={i18n.t('Enter criteria to search...')}
                    autoFocus={getParam('focusSearch', true)}
                    defaultValue={getParam('search')}
                    onChangeText={getParam('setSearch')}
                    style={{
                        width: '100%',
                        color: 'white',
                        fontSize: 18,
                    }}
                />
            ),

            headerTitleContainerStyle: {
                right: hasRightSearchItem ? undefined : 14,
            },
        }
    }

    // Return default navigation options.
    return {
        headerLeft: getParam('createItem') ? (
            <HeaderButtons left={true}>
                <Item title="add" iconName="plus" onPress={() => {
                    getParam('createItem')();
                }} />
            </HeaderButtons>
        ) : undefined,

        headerRight: ({ items = undefined } = {}) => (
            <HeaderButtons>
                <Item title="search" iconName="search" onPress={() => {
                    setParams({
                        showSearch: true,
                        focusSearch: true,
                    });
                }} />

                { items && items() }
            </HeaderButtons>
        ),

        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },
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
