import React from 'react';
import i18n from '@src/i18n.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity  } from 'react-native';
import ContactSettings from '@settings/ContactSettings.js';

export default function ContactRow({ item, navigation, layout: { showCount = true } = {} }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text category="h6">
                    {ContactSettings.title(item)}
                </Text>

                <Text>
                    {item.address || item.phone || item.email || '(' + i18n.t('not provided') + ')'}
                </Text>
            </View>

            {/* @wip - showCount && item.transactions_count !== 0 &&
                <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                    const route = 'ListTransactions';
                    const search = 'contact:'+item.id;

                    navigation.navigate({
                        key: route + search,
                        routeName: route,
                        params: {
                            search: search,
                            showSearch: true,
                            focusSearch: false,
                        },
                    });
                }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {item.transactions_count} {i18n.t('Transaction', { count: 2 })}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{marginRight: 6}}>
                            {i18n.t('View')}
                        </Text>

                        <Icon name="angle-right" size={14} style={{ opacity: 0.6 }} />
                    </View>
                </TouchableOpacity>
            }*/}
        </View>
    );
}
