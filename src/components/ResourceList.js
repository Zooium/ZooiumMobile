import React from 'react';
import theme from '@src/theme.js';
import Loader from '@components/Loader.js';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

export default withNavigation(function ResourceList({ fetch, variables = {}, routes: { view, edit }, preview: Preview, navigation }) {
    const { loading, data, fetchMore } = useQuery(fetch, {
        variables: {
            team_id: 'y1dJ46', // @wip
            ...variables,
        },
    });

    response = data ? data[Object.keys(data)[0]] : [];

    if (loading) return <Loader />;

    loadMore = () => {
        // Check if has more items to show. @wip
        // if (data.animals.total <= (data.animals.per_page * this.state.page)) return;
    }

    viewItem = (item) => {
        navigation.navigate(view, { item });
    }

    editItem = (item) => {
        navigation.navigate(edit, { item });
    }

    deleteItem = (item) => {
        // @wip
    }

    item = ({ item }) => {
        return (
            <TouchableHighlight underlayColor="#AAA" onPress={() => viewItem(item)}>
                <View style={s.frontRow}>
                    <Preview item={item} />
                </View>
            </TouchableHighlight>
        );
    }

    actions = ({ item }) => {
        return (
            <View style={s.backRow}>
                <TouchableOpacity style={s.delete} onPress={() => deleteItem(item)}>
                    <FontAwesome5 name="trash-alt" size={22} color="white" style={{ opacity: .8 }} />
                </TouchableOpacity>

                <TouchableOpacity style={s.edit} onPress={() => editItem(item)}>
                    <FontAwesome5 name="pencil-alt" size={22} color="white" style={{ opacity: .8 }} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SwipeListView
            data={response ? response.data : []}
            renderItem={item}
            renderHiddenItem={actions} 
            keyExtractor={item => item.id}
            onEndReached={loadMore}
            leftOpenValue={75}
            stopLeftSwipe={85}
            rightOpenValue={-75}
            stopRightSwipe={-85}
        />
    );
})

let s = StyleSheet.create({
    frontRow: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',

        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 5,
    },

    backRow: {
		flex: 1,
		flexDirection: 'row',
        alignItems: 'stretch',
		justifyContent: 'space-between',
    },

    delete: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',

        paddingHorizontal: 25,
        backgroundColor: theme['color-danger-500'],
    },

    edit: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',

        paddingHorizontal: 25,
        backgroundColor: theme['color-primary-500'],
    },
});
