import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Loader from '@components/Loader.js';
import { withNavigation } from 'react-navigation';
import ResourceViewItem from './ResourceViewItem.js';
import ResourceViewHeader from './ResourceViewHeader.js';
import { View, FlatList, SectionList } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DeletionConfirmation from '@utils/DeletionConfirmation.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceView({ items, headers, fetch, variables = {}, routes: { edit } = {}, mutations: { remove } = {}, render = 'View', loading = false, form, navigation }) {    
    // Get item from navigation params.
    const item = navigation.getParam('item');
    const creating = ! item;

    // Prepare removal mutation.
    const [removeItems] = useMutation(remove, {
        update(cache, { data }) {
            // Deep delete the items from cache.
            let deleted = data[Object.keys(data)[0]];
            deleted.forEach(item => cache.deepDelete(item));
        },
    });

    // Prepare fetch query if passed.
    const { loading: fetching, data, refetch } = fetch && useQuery(fetch, {
        skip: creating,
        variables: {
            id: item && item.id,
            ...variables,
        },
    }) || {};

    // Parse the response or fallback to item.
    const key = data && Object.keys(data)[0];
    let response = key && data && data[key];
    if (! fetch) response = item;

    // @wip - deleting via: List > View > Edit, navigates back while showing deleted item.

    // Share edit and delete actions with header.
    useEffect(() => {
        navigation.setParams({
            editItem: edit && ((item) => {
                navigation.navigate({
                    key: edit + item.id,
                    routeName: edit,
                    params: { item },
                });
            }),

            deleteItem: ! creating && ((item) => {
                // Remove item form back-end.
                removeItems({
                    variables: {
                        ids: [item.id],
                    },
                });

                // Return back to previous view.
                navigation.goBack();
            }),
        });
    }, []);

    // Share response on change.
    useEffect(() => {
        // Skip if missing response.
        if (! response) return;

        // Set response item in navigation.
        navigation.setParams({
            item: response,
        });
    }, [response]);

    // Prepare render functions.
    const renderItem = ({ item, index, section }) => <ResourceViewItem item={item} index={index} section={section} form={form} response={response} render={render} />;
    const renderSectionHeader = ({ section }) => <ResourceViewHeader section={section} render={render} />;
    const renderHeaderActions = (
        <FlatList
            data={headers}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        />
    );

    // Return resource view.
    return (loading || fetching) ? <Loader /> : (
        <SectionList
            sections={items}
            initialNumToRender={25}
            keyExtractor={(item, index) => index.toString()}

            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListHeaderComponent={renderHeaderActions}

            refreshing={loading || fetching}
            onRefresh={render === 'View' && (() => {
                return refetch && refetch();
            })}
        />
    );
}

ResourceView.propTypes = {
    fetch: PropTypes.object,
    variables: PropTypes.object,

    routes: PropTypes.shape({
        edit: PropTypes.string,
    }),

    items: PropTypes.arrayOf(PropTypes.object),
    item: PropTypes.shape({
        required: PropTypes.bool,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.elementType,
        ]).isRequired,

        
        text: PropTypes.string,
        description: PropTypes.string,
        render: PropTypes.elementTypeType,
        onPress: PropTypes.func,
        multiline: PropTypes.func,
    }),

    section: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
}

ResourceView.navigationOptions = ({ title, showEdit = true, navigation }) => {
    const item = navigation.getParam('item');
    const editItem = navigation.getParam('editItem');
    const deleteItem = navigation.getParam('deleteItem');

    return {
        title: title && title(item),
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: showEdit && (
            <HeaderButtons>
                <Item title="delete" iconName="trash-alt" onPress={() => {
                    deleteItem && DeletionConfirmation(title(item), () => {
                        deleteItem(item);
                    });
                }} />

                <Item title="edit" iconName="pencil" onPress={() => {
                    editItem && editItem(item);
                }} />
            </HeaderButtons>
        ) || <View />,
    };
};

export default withNavigation(ResourceView);
