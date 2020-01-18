import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import Specie from '@models/Specie.model.js';
import Animal from '@models/Animal.model.js';
import SexPreview from '@components/SexPreview.js';
import { Icon, Text } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import CitesListing from '@components/CitesListing.js';

export const tradeTypeSettings = {
    animal: {
        icon: 'dove',
        color: theme['color-primary-500'],
        render: function RenderAnimalTradeItem(item) {
            const cites = item.resource.cites || item.resource.specie && item.resource.specie.cites;
            const listings = cites && cites.listing.split('/')

            return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SexPreview sex={item.resource.sex} size={16} style={{ marginRight: 4 }} />

                            <Text style={{ fontWeight: 'bold', flexShrink: 1 }}>
                                {Animal.title(item.resource)}
                            </Text>

                            {item.resource.name && item.resource.identifier && (
                                <Text appearance="hint" style={{ marginLeft: 6, flexShrink: 1 }}>
                                    ({item.resource.identifier})
                                </Text>
                            )}
                        </View>

                        <Text style={{ fontSize: 14 }}>
                            {Specie.title(item.resource.specie, '(' + i18n.t('not provided') + ')')}
                        </Text>
                    </View>

                    {cites && listings && (
                        <View style={{ flexShrink: 0, alignItems: 'flex-end' }}>
                            {listings.map((value) => (
                                <CitesListing key={value} listing={value} style={{ marginLeft: 4 }} />
                            ))}
                        </View>
                    )}
                </View>
            );
        },
    },
    currency: {
        icon: 'money-bill-wave',
        color: theme['color-success-500'],
        render: function RenderCurrencyTradeItem(item) {
            return (
                <Text>
                    {item.value.toLocaleString(undefined, {
                        style: 'currency',
                        currency: item.attribute,
                    })}
                </Text>
            );
        },
    },
    other: {
        icon: 'pencil',
        color: theme['color-basic-600'],
        render: function RenderOtherTradeItem(item) {
            return <Text>{item.attribute}</Text>;
        },
    },
}

export default function TradeItem({ item, style, onPress, ...props }) {
    const settings = tradeTypeSettings[item.type] || tradeTypeSettings['other'];
    const color = item.direction === 'to'
        ? theme['color-danger-200']
        : theme['color-success-200'];

    return (
        <TouchableOpacity disabled={onPress === false} onPress={() => onPress(item)} style={[style, {
            borderRadius: 4,
            backgroundColor: 'white',

            borderWidth: 1,
            borderColor: color,

            alignItems: 'center',
            flexDirection: 'row',

            paddingVertical: 8,
            paddingHorizontal: 10,
        }]} {...props}>
            <Icon name={settings.icon} color={settings.color} style={{ marginRight: 12 }} fixedWidth solid />
            {settings.render(item)}
        </TouchableOpacity>
    );
}
