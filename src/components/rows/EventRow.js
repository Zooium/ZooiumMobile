import i18n from '@src/i18n.js';
import React, { memo } from 'react';
import Event from '@models/Event.model.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

function EventRow({ item }) {
    const navigation = useNavigation();
    const { value, state } = Event.getEventStateSettings(item);
    const connection = Event.getEventConnectionSettings(item);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                {value && state && (
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

export default memo(EventRow);
