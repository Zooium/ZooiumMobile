import i18n from '@src/i18n.js';
import { View } from 'react-native';
import React, { memo } from 'react';
import Animal from '@models/Animal.model.js';
import { Text } from '@ui-kitten/components';
import SexPreview from '@components/SexPreview.js';

const familyNames = [
    [i18n.t('Current'), i18n.t('Current')],
    [i18n.t('Father'), i18n.t('Mother')],
    [i18n.t('Grandfather'), i18n.t('Grandmother')],
];

function FamilyRow({ item }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SexPreview sex={item.sex} size={20} style={{marginRight: 10}} />

                    <Text category="h6">
                        {Animal.title(item)}
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

export default memo(FamilyRow);
