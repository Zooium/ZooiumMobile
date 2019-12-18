import React from 'react';
import i18n from '@src/i18n.js';
import { View } from 'react-native';
import SexPreview from './SexPreview.js';
import { Text } from '@ui-kitten/components';
import AnimalSettings from '@settings/AnimalSettings.js';

const familyNames = [
    [i18n.t('Current'), i18n.t('Current')],
    [i18n.t('Father'), i18n.t('Mother')],
    [i18n.t('Grandfather'), i18n.t('Grandmother')],
];

export default function AnimalFamilyRow({ item }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                    <Text category="h6">
                        {AnimalSettings.title(item)}
                    </Text>
                </View>

                <Text>
                    {familyNames[item.family_level][
                        item.family_side === 'father' ? 0 : 1
                    ]}

                    {item.family_parent_side && (
                        <Text appearance="hint">
                            {' (' + familyNames[1][
                                item.family_parent_side === 'father' ? 0 : 1
                            ].toLowerCase() + ')'}
                        </Text>
                    )}
                </Text>
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
