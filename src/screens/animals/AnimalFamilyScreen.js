import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import Loader from '@components/Loader.js';
import { useQuery } from '@apollo/react-hooks';
import { withNavigation } from 'react-navigation';
import parseQuery from '@utils/apollo/parseQuery.js';
import FamilyRow from '@components/rows/FamilyRow.js';
import ResourceSwipeList from '@components/resource/ResourceSwipeList.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';
import VIEW_ANIMAL_FAMILY from '@graphql/queries/Animal/viewAnimalFamily.gql.js';

const parseFamily = (item, list = [], level = 0, side = null, parent = null) => {
    // Skip if missing item.
    if (! item) return list;

    // Parse father and mother recursively.
    parseFamily(item.father, list, level + 1, 'father', side);
    parseFamily(item.mother, list, level + 1, 'mother', side);

    // Push the item to the list with level and side.
    list.push({
        ...item,
        family_side: side,
        family_level: level,
        family_parent_side: parent,
    });

    // Return the defined list.
    return list;
}

function AnimalFamilyScreen({ navigation }) {
    // Get passed item and define family query.
    const item = navigation.getParam('item');
    const query = useQuery(VIEW_ANIMAL_FAMILY, {
        variables: {
            id: item && item.id,
        },
    });

    // Parse the query response.
    const { loading, data } = query;
    const { response } = parseQuery(data);

    // Parse response family and sort by level and side.
    const list = parseFamily(response).sort((a, b) => {
        return a.family_level - b.family_level || (
            a.family_side > b.family_side ? 1 : -1
        ) || (
            a.family_parent_side > b.family_parent_side ? 1 : -1
        );
    });

    // Return the resource list view.
    return (loading ? <Loader /> : (
        <View style={{flex: 1}}>
            <ResourceSwipeList
                list={list}
                query={query}
                keyExtractor={item => {
                    return item.family_parent_side
                        + item.family_level
                        + item.family_side
                        + item.id;
                }}

                preview={FamilyRow}
                name={i18n.t('Animal', { count: 2 })}
                
                routes={{
                    view: 'AnimalView',
                    edit: 'AnimalEdit',
                }}

                mutations={{
                    remove: DELETE_ANIMALS,
                }}
            />
        </View>
    ));
}

AnimalFamilyScreen.navigationOptions = {
    title: i18n.t('Family'),
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
    },
    
    headerRight: <View />,
}

export default withNavigation(AnimalFamilyScreen);