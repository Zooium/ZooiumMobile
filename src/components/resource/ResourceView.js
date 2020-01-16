import React, { useEffect } from 'react';
import Loader from '@components/Loader.js';
import { Layout } from '@ui-kitten/components';
import ResourceViewItem from './ResourceViewItem.js';
import ResourceViewHeader from './ResourceViewHeader.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DeletionConfirmation from '@utils/DeletionConfirmation.js';
import { View, Alert, FlatList, SectionList } from 'react-native';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

export default function ResourceView({ items, headers, fetch, parser, variables = {}, routes: { edit } = {}, mutations: { remove } = {}, render = 'View', loading = false, form }) {    
    // Get item from navigation params.
    const navigation = useNavigation();
    const item = useNavigationParam('item');
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

    // Parse the response object if available.
    if (response && parser) parser(response);

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

                // Check if has on delete action.
                const onDelete = navigation.getParam('onDelete');
                onDelete && onDelete(item);
            }),
        });
    }, []);

    // Share response on change.
    useEffect(() => {
        // Navigate back if viewing missing item.
        if (! response && ! fetching && ! creating) {
            navigation.goBack();
        }

        // Set response item in navigation if set.
        if (response) {
            navigation.setParams({
                item: response,
            });
        }
    }, [response]);

    // Set fallback response while viewing deleted item.
    let fallback = undefined;
    if (! response && ! fetching && ! creating) {
        fallback = item;
        if (! fallback) return null;
    }

    // Prepare render functions.
    const renderItem = ({ item, index, section }) => <ResourceViewItem item={item} index={index} section={section} form={form} response={response || fallback} render={render} />;
    const renderSectionHeader = ({ section }) => <ResourceViewHeader section={section} render={render} />;
    const renderHeaderActions = render === 'View' && headers && (
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
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                {(loading || fetching) && <Loader /> || (
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
                )}
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ResourceView.navigationOptions = ({ title, canModify, showEdit = true, navigation }) => {
    const item = navigation.getParam('item');
    const editItem = navigation.getParam('editItem');
    const deleteItem = navigation.getParam('deleteItem');

    return {
        title: title && title(item),

        headerRight: showEdit && (() => (
            <HeaderButtons>
                <Item title="delete" iconName="trash-alt" onPress={() => {
                    // Skip if not allowed to modify item. 
                    const msg = item && canModify && canModify(item);
                    if (typeof msg === 'string') return Alert.alert(msg);

                    // Show deletion confirmation.
                    deleteItem && DeletionConfirmation(title(item), () => {
                        deleteItem(item);
                    });
                }} />

                <Item title="edit" iconName="pencil" onPress={() => {
                    // Skip if not allowed to modify item. 
                    const msg = item && canModify && canModify(item);
                    if (typeof msg === 'string') return Alert.alert(msg);

                    // Navigate to edit view.
                    editItem && editItem(item);
                }} />
            </HeaderButtons>
        ) || (() => <View />)),
    };
};
