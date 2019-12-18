import React from 'react';
import { View } from 'react-native';
import SexPreview from './SexPreview.js';
import { Text } from '@ui-kitten/components';
import i18n, { localeName } from '@src/i18n.js';

export default function AnimalRow({ item }) {
    const specieText = item.specie
        ? item.specie[localeName()] || item.specie.english_name || item.specie.scientific
        : '(' + i18n.t('not provided') + ')';

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                    <Text category="h6">
                        { item.name || item.identifier || '(' + i18n.t('name not set') + ')' }
                    </Text>
                </View>

                <Text>{ specieText }</Text>
            </View>

            {item.enclosure &&
                <View style={{ flexShrink: 0, alignItems: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {i18n.t('Enclosure', { count: 1 })}
                    </Text>

                    <Text>{ item.enclosure.name }</Text>
                </View>
            }
        </View>
    );
}
