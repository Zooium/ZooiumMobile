import i18n from '@src/i18n.js';
import React, { memo } from 'react';
import { Text } from '@ui-kitten/components';
import SexPreview from '@components/SexPreview.js';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import SpecieSettings from '@settings/SpecieSettings.js';

function AnimalRow({ item }) {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                    <Text category="h6">
                        {item && (item.name || item.identifier || '(' + i18n.t('name not set') + ')')}
                    </Text>
                </View>

                <Text>{SpecieSettings.title(item.specie, '(' + i18n.t('not provided') + ')')}</Text>
            </View>

            {item.enclosure && (
                <TouchableOpacity style={{ flexShrink: 0, alignItems: 'flex-end' }} onPress={() => {
                    const route = 'EnclosureView';
                    navigation.navigate({
                        key: route + item.enclosure.id,
                        routeName: route,
                        params: {
                            item: item.enclosure,
                        },
                    })
                }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {i18n.t('Enclosure')}
                    </Text>

                    <Text>
                        {item.enclosure.name}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default memo(AnimalRow);
