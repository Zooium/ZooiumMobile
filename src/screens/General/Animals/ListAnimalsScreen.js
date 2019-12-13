import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import i18n, { localeName } from '@src/i18n.js';
import { withNavigation } from 'react-navigation';
import SexPreview from './components/SexPreview.js';
import { Text, Layout } from '@ui-kitten/components';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ANIMALS from '@graphql/queries/Animal/listAnimals.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export const animalPreview = ({ item }) => {
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

function ListAnimalsScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={animalPreview}
                    fetch={LIST_ANIMALS}
                    name={i18n.t('Animal', { count: 2 })}
                    
                    routes={{
                        view: 'ViewAnimal',
                        edit: 'EditAnimal',
                    }}

                    mutations={{
                        remove: DELETE_ANIMALS,
                    }}

                    filters={[
                        { key: 'active', text: i18n.t('Active') },
                        { key: 'sold', text: i18n.t('Sold') },
                        { key: 'deceased', text: i18n.t('Deceased') },
                    ]}

                    sorting={[
                        { key: 'id', text: i18n.t('Recent') },
                        { key: 'identifier', text: i18n.t('ID') },
                        { key: 'name', text: i18n.t('Name') },
                        { key: 'specie', text: i18n.t('Specie', { count: 1 }) },
                        { key: 'enclosure', text: i18n.t('Enclosure', { count: 1 }) },
                    ]}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ListAnimalsScreen.navigationOptions = ResourceList.navigationOptions;
ListAnimalsScreen.propTypes = {
    item: PropTypes.object,
}

export default withNavigation(ListAnimalsScreen);
