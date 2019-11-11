import React from 'react';
import i18n from '@src/i18n.js';
import { View, TouchableOpacity  } from 'react-native';
import { Text, Icon, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/resource/ResourceList.js';
import { withNavigation, NavigationActions } from 'react-navigation';
import LIST_LOCATIONS from '@graphql/queries/Location/listLocations.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

function ListLocationsScreen({ showRefresh = true, variables = {}, navigation }) {
    preview = ({ item }) => {
        const locationText = item &&
            [
                item.address,
                item.city,
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

                {item.enclosures_count !== 0 &&
                    <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => navigation.navigate({
                        routeName: 'Enclosures',
                        action: NavigationActions.navigate({
                            routeName: 'ListEnclosures',
                            params: {
                                search: 'location:'+item.id,
                                focusInput: false,
                            },
                        }),
                    })}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.enclosures_count} {i18n.t('Enclosure', { count: 2 })}
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
                    fetch={LIST_LOCATIONS}
                    variables={variables}
                    showRefresh={showRefresh}
                    name={i18n.t('Location', { count: 2 })}
                    
                    routes={{
                        view: 'ViewLocation',
                        edit: 'EditLocation',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    );
}

ListLocationsScreen.navigationOptions = ResourceList.navigationOptions;

export default withNavigation(ListLocationsScreen);
