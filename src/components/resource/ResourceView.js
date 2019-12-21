import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Loader from '@components/Loader.js';
import { useQuery } from '@apollo/react-hooks';
import { View, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResourceViewItem from './ResourceViewItem.js';
import ResourceViewHeader from './ResourceViewHeader.js';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceView({ items, fetch, variables = {}, routes: { edit } = {}, render = 'View', loading = false, form, navigation }) {
    useEffect(() => {
        navigation.setParams({
            editItem: edit && ((item) => {
                navigation.navigate({
                    key: edit + item.id,
                    routeName: edit,
                    params: { item },
                });
            }),
        });
    }, []);
    
    const item = navigation.getParam('item');
    const creating = ! item;

    const { loading: fetching, data } = fetch && useQuery(fetch, {
        skip: creating,
        variables: {
            id: item && item.id,
            ...variables,
        },
    }) || {};

    const key = data && Object.keys(data)[0];
    let response = key && data && data[key];
    if (! fetch) response = item;

    useEffect(() => {
        // Skip if missing response.
        if (! response) return;

        // Set response item in navigation.
        navigation.setParams({
            item: response,
        });
    }, [response]);

    const renderItem = ({ item, section }) => <ResourceViewItem item={item} section={section} form={form} response={response} render={render} />;
    const renderSectionHeader = ({ section }) => <ResourceViewHeader section={section} render={render} />;

    return (loading || fetching) ? <Loader /> : (
        <SectionList
            sections={items}
            initialNumToRender={25}
            keyExtractor={(item, index) => index.toString()}

            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
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

    return {
        title: title && title(item),
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: showEdit && (
            <HeaderButtons>
                <Item title="edit" iconName="pencil" onPress={() => {
                    editItem && editItem(item);
                }} />
            </HeaderButtons>
        ) || <View />,
    };
};

export default withNavigation(ResourceView);
