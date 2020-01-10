import React from 'react';
import i18n from '@src/i18n.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import EventSettings from '@settings/EventSettings.js';

export default function EventRow({ item, navigation }) {
    const { value, state } = EventSettings.getEventStateSettings(item);
    const connection = EventSettings.getEventConnectionSettings(item);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                {item.state && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            fixedWidth
                            size={20}
                            name={value.icon}
                            color={value.color}
                            style={{marginRight: 10}}
                        />

                        <Text category="h6">
                            {value.text} ({state.text})
                        </Text>
                    </View>
                )}

                {item.notes && (
                    <Text>{item.notes}</Text>
                )}

                <Text category="label" appearance="hint">
                    {item.occurred_at && new Date(item.occurred_at).toLocaleString() || '(' + i18n.t('date not set') + ')'}
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
