import React from 'react';
import { View } from 'react-native';
import i18n, { localeName } from '@src/i18n.js';
import SexPreview from './components/SexPreview.js';
import { Text, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

export default function ListAnimalsScreen() {
    preview = ({ item }) => {
        const specieText = item.specie
            ? item.specie[localeName()] || item.specie.english_name || item.specie.scientific
            : '(' + i18n.t('not provided') + ')';

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                        <Text category="h6">
                            { item.name || item.identifier || '(' + i18n.t('name not set') + ')' }
                        </Text>
                    </View>

                    <Text>{ specieText }</Text>
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
        <KeyboardAvoidingLayout>
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
        </KeyboardAvoidingLayout>
    );
}

ListAnimalsScreen.navigationOptions = ResourceList.navigationOptions;
