import React from 'react';
import i18n from '@src/i18n.js';
import { Text } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';

export default function ViewAnimalScreen() {
    title = item => (item.name || item.identifier || '(' + i18n.t('name not set') + ')')

    page = ({ item }) => {
        return (
            <Text>@wip - {item.id}</Text>
        )
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                page={page}
                title={title}
                fetch={VIEW_ANIMAL}
            />
        </Layout>
    )
}

ViewAnimalScreen.navigationOptions = ResourceView.navigationOptions;
