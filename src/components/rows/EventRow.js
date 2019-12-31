import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { withNavigation } from 'react-navigation';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';

const eventStateSettings = {
    active: {
        bought: {
            icon: 'wallet',
            text: i18n.t('Bought'),
            color: theme['color-success-500'],
        },

        default: {
            icon: 'plus',
            text: i18n.t('Active'),
            color: theme['color-success-500'],
        }
    },

    inactive: {
        sold: {
            icon: 'wallet',
            text: i18n.t('Sold'),
            color: theme['color-danger-500'],
        },

        deceased: {
            icon: 'tombstone',
            text: i18n.t('Deceased'),
            color: theme['color-danger-500'],
        },

        default: {
            icon: 'minus',
            text: i18n.t('Inactive'),
            color: theme['color-danger-500'],
        },
    },
}

const eventConnetionSettings = {
    TransactionItem: {
        text: i18n.t('Transaction'),
        onPress: ({ item: { connection: { transaction } }, navigation }) => {
            const view = 'TransactionView';
            navigation.navigate({
                key: view + transaction.id,
                routeName: view,
                params: { item: transaction },
            });
        },
    },
}

export const getEventStateSettings = ({ state, value }) => {
    return eventStateSettings[state]
        && eventStateSettings[state][value]
        || eventStateSettings[state]['default'];
}

function EventRow({ item, navigation }) {
    const settings = getEventStateSettings(item);
    const connection = item.connection && eventConnetionSettings[item.connection.__typename];

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                {item.state && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            fixedWidth
                            size={20}
                            name={settings.icon}
                            color={settings.color}
                            style={{marginRight: 10}}
                        />

                        <Text category="h6">
                            {settings.text}
                        </Text>
                    </View>
                )}

                {item.notes && (
                    <Text>{item.notes}</Text>
                )}

                <Text category="label" appearance="hint">
                    {new Date(item.occurred_at).toLocaleString()}
                </Text>
            </View>

            {connection && (
                <TouchableOpacity
                    style={{ flexShrink: 0, alignItems: 'flex-end' }}
                    onPress={() => connection.onPress({ item, navigation })}
                >
                    <Text style={{ fontWeight: 'bold' }}>
                        {connection.text}
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

export default withNavigation(EventRow);
