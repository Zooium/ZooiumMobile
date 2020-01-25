import i18n from '@src/i18n.js';
import React, { memo } from 'react';
import Contact from '@models/Contact.model.js';
import { Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity  } from 'react-native';

function ContactRow({ item, layout: { showCount = true } = {} }) {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text category="h6">
                    {Contact.title(item)}
                </Text>

                <Text>
                    {item.address || item.phone || item.email || '(' + i18n.t('not provided') + ')'}
                </Text>
            </View>

            {showCount && item.transactions_count !== 0 && (
                <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                    const route = 'TransactionList';
                    const search = 'contact:'+item.id;

                    navigation.navigate({
                        key: route + search,
                        name: route,
                        params: {
                            search: search,
                            showSearch: true,
                            focusSearch: false,
                        },
                    });
                }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {item.transactions_count} {i18n.t('Transaction', {
                            count: item.transactions_count,
                        })}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{marginRight: 6}}>
                            {i18n.t('View')}
                        </Text>

                        <Icon name="angle-right" size={14} style={{ opacity: 0.6 }} />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default memo(ContactRow);
