import i18n from '@src/i18n.js';
import React, { memo } from 'react';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity  } from 'react-native';
import Transaction from '@models/Transaction.model.js';

function TransactionRow({ item }) {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <Text category="h6">
                    {Transaction.title(item)}
                </Text>

                <Text style={{ marginRight: 6 }} numberOfLines={1}>
                    {item.notes || '(' + i18n.t('not provided') + ')'}
                </Text>
            </View>

            {item.contact && (
                <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                    const route = 'ContactView';
                    navigation.navigate({
                        key: route + item.contact.id,
                        name: route,
                        params: {
                            item: item.contact,
                        },
                    })
                }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {i18n.t('Contact')}
                    </Text>

                    <Text>
                        {item.contact.name}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default memo(TransactionRow);
