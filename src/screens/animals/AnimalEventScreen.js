import i18n from '@src/i18n.js';
import React, { useCallback } from 'react';
import Loader from '@components/Loader.js';
import { View, FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import EventRow from '@components/rows/EventRow.js';
import parseQuery from '@utils/apollo/parseQuery.js';
import ResourceListItem from '@components/resource/ResourceListItem.js';
import ResourceListEmpty from '@components/resource/ResourceListEmpty.js';
import VIEW_ANIMAL_EVENT from '@graphql/queries/Animal/viewAnimalEvent.gql.js';

function AnimalEventScreen({ navigation }) {
    // Get passed item and define event query.
    const item = navigation.getParam('item');
    const query = useQuery(VIEW_ANIMAL_EVENT, {
        variables: {
            id: item && item.id,
        },
    });

    // Parse the query response.
    const { loading, data, refetch } = query;
    const { response } = parseQuery(data);

    // Sort events by occurred at date.
    let list = response && response.events.sort((a, b) => {
        return new Date(b.occurred_at) - new Date(a.occurred_at);
    });

    // Define view item callback.
    const viewItem = (item) => {
        alert('@wip');
    };

    // Create callbacks for resource item renderings.
    const emptyCallback = useCallback(() => <ResourceListEmpty resource={i18n.t('Event').toLowerCase()} />, []);
    const itemCallback = useCallback(({ item }) => <ResourceListItem item={item} viewItem={viewItem} preview={EventRow} />, []);

    // Return the resource list view.
    return (loading ? <Loader /> : (
        <View style={{flex: 1}}>
            <FlatList
                keyExtractor={item => item.id}
                data={list}
                renderItem={itemCallback}
                ListEmptyComponent={emptyCallback}
                onRefresh={() => refetch()}
                refreshing={loading}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            />
        </View>
    ));
}

AnimalEventScreen.navigationOptions = {
    title: i18n.t('Event', { count: 2 }),
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
    },
    
    headerRight: <View />,
}

export default withNavigation(AnimalEventScreen);
