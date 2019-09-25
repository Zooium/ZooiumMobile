import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import { Text, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js'

export default function ListAnimalsScreen() {
    preview = ({ item }) => {
        return (
            <View>
                <Text category="h6">{ item.name || item.identifier || '(' + i18n.t('name not set') + ')' }</Text>
                <Text>{ item.specie[i18n.localeName()] || item.specie.english_name || item.specie.scientific }</Text>
            </View>
        );
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceList
                preview={preview}
                fetch={LIST_ANIMALS}
                routes={{
                    view: 'ViewAnimal',
                    edit: 'EditAnimal'
                }}
            />
        </Layout>
    );
}
