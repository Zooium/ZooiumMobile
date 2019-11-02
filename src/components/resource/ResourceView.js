import React, { useMemo, useState, useEffect } from 'react';
import Loader from '@components/Loader.js';
import { useQuery } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import { HeaderButtons, Item } from '@components/HeaderButtons.js';

function ResourceView({ title, fetch, variables = {}, page: Page, navigation }) {
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
        if (response) {
            navigation.setParams({
                title: title(response),
            });
        }
    }, [response])

    return (loading ? <Loader /> : <Page item={response} />)
}

ResourceView.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
    },

    headerRight: ( // @wip - button onPress
        <HeaderButtons>
            <Item title="edit" iconName="pen" style={{ marginRight: 10 }} />
        </HeaderButtons>
    ),
});

export default withNavigation(ResourceView);