import i18n from '@src/i18n.js';
import React, { memo } from 'react';
import Enclosure from '@models/Enclosure.model.js';
import { Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity  } from 'react-native';

function EnclosureRow({ item, header: Header, layout: { showCount = true } = {} }) {
    const navigation = useNavigation();

    const locationText = item && item.location && item.location.name
        || '(' + i18n.t('not provided') + ')';

    return (
        <View style={{ width: '100%', flexDirection: 'column' }}>
            {Header && <Header item={item} />}
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text category="h6">
                        {Enclosure.title(item)}
                    </Text>

                    <Text>{locationText}</Text>
                </View>

                {showCount && item.animals_count !== 0 &&
                    <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                        const route = 'AnimalList';
                        const search = 'enclosure:'+item.id;
    
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
                            {item.animals_count} {i18n.t('Animal', {
                                count: item.animals_count,
                            })}
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

export default memo(EnclosureRow);
