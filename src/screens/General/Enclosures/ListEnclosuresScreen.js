import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { View, TouchableOpacity  } from 'react-native';
import { Text, Icon, Layout } from 'react-native-ui-kitten';
import ResourceList from '@components/resource/ResourceList.js';
import { withNavigation, NavigationActions } from 'react-navigation';
import LIST_ENCLOSURES from '@graphql/queries/Enclosure/listEnclosures.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

function ListEnclosuresScreen({ header: Header, showRefresh = true, variables = {}, navigation }) {
    const preview = ({ item }) => {
        const locationText = item && item.location && item.location.name
            || '(' + i18n.t('not provided') + ')';

        return (
            <View style={{ width: '100%', flexDirection: 'column' }}>
                {Header && <Header item={item} />}
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text category="h6">
                            { item.name || '(' + i18n.t('name not set') + ')' }
                        </Text>

                        <Text>{locationText}</Text>
                    </View>

                    {item.animals_count !== 0 &&
                        <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => navigation.navigate({
                            routeName: 'Animals',
                            action: NavigationActions.navigate({
                                routeName: 'ListAnimals',
                                params: {
                                    search: 'enclosure:'+item.id,
                                    focusInput: false,
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
            </View>
        );
    }

    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceList
                    preview={preview}
                    fetch={LIST_ENCLOSURES}
                    variables={variables}
                    showRefresh={showRefresh}
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
ListEnclosuresScreen.propTypes = {
    header: PropTypes.elementType,
    showRefresh: PropTypes.bool,
    variables: PropTypes.object,

    item: PropTypes.object, // @wip - Model instance.
}

export default withNavigation(ListEnclosuresScreen);
