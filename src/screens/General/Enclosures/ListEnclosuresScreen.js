import React from 'react';
import i18n from '@src/i18n.js';
import { NavigationActions } from 'react-navigation';
import { View, TouchableOpacity  } from 'react-native';
import { Text, Icon, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/resource/ResourceList.js';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

export default function ListEnclosuresScreen({ navigation }) {
    preview = ({ item }) => {
        const locationText = item &&
            [
                item.location.address,
                item.location.city,
                item.location.postcode,
            ].filter(Boolean).join(', ')
        || '(' + i18n.t('not provided') + ')';

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text category="h6">
                        { item.name || '(' + i18n.t('name not set') + ')' }
                    </Text>

                    <Text>{locationText}</Text>
                </View>

                {item.animals_count &&
                    <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => navigation.navigate({
                        routeName: 'Animals',
                        action: NavigationActions.navigate({
                            routeName: 'ListAnimals',
                            params: {
                                search: 'enclosure:'+item.id,
                            },
                        }),
                    })}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.animals_count} {i18n.t('Animal', { count: 2 })}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{marginRight: 6}}>
                                {i18n.t('View')}
                            </Text>

                            <Icon name="angle-right" size={14} style={{ opacity: 0.6 }} />
                        </View>
                    </TouchableOpacity>
                }
            </View>
        );
    }

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_ENCLOSURES}
                    name={i18n.t('Enclosure', { count: 2 })}
                    
                    routes={{
                        view: 'ViewEnclosure',
                        edit: 'EditEnclosure',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ListEnclosuresScreen.navigationOptions = ResourceList.navigationOptions;
