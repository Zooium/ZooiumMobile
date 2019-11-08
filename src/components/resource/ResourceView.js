import React, { useMemo, useState, useEffect } from 'react';
import Loader from '@components/Loader.js';
import { useQuery } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceView({ title, fetch, variables = {}, routes: { edit }, page: Page, navigation }) {
    useEffect(() => {
        navigation.setParams({
            getTitle: title,
            editItem: (item) => {
                navigation.navigate(edit, { item });
            },
        });
    }, []);
    
    const item = navigation.getParam('item');
    const { loading, data } = useQuery(fetch, {
        variables: {
            id: item.id,
            ...variables,
        },
    });

    const key = data && Object.keys(data)[0];
    const response = key && data && data[key];

    useEffect(() => {
        // Skip if missing response.
        if (! response) return;

        // Set response item in navigation.
        navigation.setParams({
            item: response,
        });
    }, [response]);

    return (loading ? <Loader /> : <Page item={response} />);
}

ResourceView.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');
    const getTitle = navigation.getParam('getTitle');

    return {
        title: getTitle ? getTitle(item) : undefined,
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerRight: (
            <HeaderButtons>
                <Item title="edit" iconName="edit" style={{ marginRight: 10 }} onPress={() => {
                    navigation.getParam('editItem')(item);
                }} />
            </HeaderButtons>
        ),
    };
};

export default withNavigation(ResourceView);