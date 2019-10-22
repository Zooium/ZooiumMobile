import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import SexPreview from './components/SexPreview.js';
import { Text, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';

export default function ListAnimalsScreen() {
    specieText = (specie) => {
        return specie
            ? specie[i18n.localeName()] || specie.english_name || specie.scientifi
            : '(' + i18n.t('not provided') + ')';
    }

    preview = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                        <Text category="h6">
                            { item.name || item.identifier || '(' + i18n.t('name not set') + ')' }
                        </Text>
                    </View>

                    <Text>{ specieText(item.specie) }</Text>
                </View>

                {item.enclosure &&
                    <View style={{ flexShrink: 0, alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {i18n.t('Enclosure', { count: 1 })}
                        </Text>

                        <Text>{ item.enclosure.name }</Text>
                    </View>
                }
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
                    edit: 'EditAnimal',
                }}
            />
        </Layout>
    );
}

ListAnimalsScreen.navigationOptions = ResourceList.navigationOptions;
