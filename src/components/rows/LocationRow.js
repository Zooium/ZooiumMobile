import React from 'react';
import i18n from '@src/i18n.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity  } from 'react-native';
import LocationSettings from '@settings/LocationSettings.js';

export default function LocationRow({ item, navigation, layout: { showCount = true } = {} }) {
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
                    {LocationSettings.title(item)}
                </Text>

                <Text>{locationText}</Text>
            </View>

            {showCount && item.enclosures_count !== 0 &&
                <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                    const route = 'EnclosureList';
                    const search = 'location:'+item.id;

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
