import { merge } from 'lodash';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import Loader from '@components/Loader.js';
import AuthState from '@utils/AuthState.js';
import { View, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { Layout } from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation';
import AddingHeader from '@components/AddingHeader.js';
import FullWidthSearch from '@components/FullWidthSearch.js';
import React, { useEffect, useCallback, createRef } from 'react';
import ResourceListItem from '@components/resource/ResourceListItem.js';
import ResourceListEmpty from '@components/resource/ResourceListEmpty.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

function Typeahead({ name, fetch, preview, itemProps, variables = {}, navigation }) {
    const searchInput = createRef();
    const query = navigation.getParam('search') || '';
    const appendQuery = navigation.getParam('appendSearch') || '';

    useEffect(() => {
        searchInput && searchInput.current && searchInput.current.focus();
    }, [searchInput]);

    const onChange = navigation.getParam('onChange');
    const selectItem = (item) => {
        onChange && onChange(item);
        navigation.goBack();
    };

    const itemCallback = useCallback(({ item }) => <ResourceListItem item={item} viewItem={selectItem} preview={preview} {...itemProps} />, []);
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={name.toLowerCase()} />, []);

    const team = AuthState.currentTeam();
    const { loading, data, refetch, fetchMore } = useQuery(fetch, {
        notifyOnNetworkStatusChange: true,
        variables: {
            search: [appendQuery, query].join(' ').trim() || undefined,
            team_id: team && team.id,
            ...variables,
        },
    });

    const key = data && Object.keys(data)[0] || undefined;
    const response = key && data && data[key] || [];

    const init = ! response || ! response.data;
    const page = ! init ? Math.ceil(response.data.length / response.per_page) : 1;

    const listData = response && response.data || [];
    const hasMore = ! init && response.total > (response.per_page * page);

    const loadMore = () => {
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
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <FullWidthSearch get={query} set={(query) => {
                    navigation.setParams({ search: query })
                }} closeable={false} ref={searchInput} />

                <FlatList
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    data={listData}
                    renderItem={itemCallback}
                    ListEmptyComponent={emptyCallback}
                    onRefresh={() => refetch()}
                    refreshing={loading}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.2}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    ));
}

Typeahead.navigationOptions = ({ navigation }) => {
    const add = navigation.getParam('add', false);

    return {
        title: i18n.t('Select {{resource}}', {
            resource: navigation.getParam('resource'),
        }),

        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: add && (
            <AddingHeader style={{ marginRight: 10 }} onPress={() => {
                navigation.navigate(add, { item: undefined })
            }} />
        ) || <View />,
    }
}

Typeahead.propTypes = {
    variables: PropTypes.object,
    name: PropTypes.string.isRequired,
    fetch: PropTypes.object.isRequired,
    preview: PropTypes.elementType.isRequired,
    itemProps: PropTypes.object,
}

export default withNavigation(Typeahead);
