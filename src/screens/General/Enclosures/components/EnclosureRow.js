import React from 'react';
import i18n from '@src/i18n.js';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity  } from 'react-native';

export default function EnclosureRow({ item, header: Header, navigation, layout: { showCount = true } = {} }) {
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

                {showCount && item.animals_count !== 0 &&
                    <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                        const route = 'ListAnimals';
                        const search = 'enclosure:'+item.id;
    
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
