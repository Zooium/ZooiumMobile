import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import SexPreview from '@components/SexPreview.js';
import { Icon, Text } from '@ui-kitten/components';
import CitesListing from '@components/CitesListing.js';
import AnimalSettings from '@settings/AnimalSettings.js';
import SpecieSettings from '@settings/SpecieSettings.js';

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

                            <Text style={{ fontWeight: 'bold' }}>
                                {AnimalSettings.title(item.resource)}
                            </Text>

                            {item.resource.name && item.resource.identifier && (
                                <Text appearance="hint" style={{ marginLeft: 6 }}>
                                    ({item.resource.identifier})
                                </Text>
                            )}
                        </View>

                        <Text style={{ fontSize: 14 }}>
                            {SpecieSettings.title(item.resource.specie, '(' + i18n.t('not provided') + ')')}
                        </Text>
                    </View>

                    {cites && listings.map((value) => {
                        return <CitesListing key={value} listing={value} style={{ marginLeft: 4 }} />;
                    })}
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
                    })} {item.attribute}
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

export default function TradeItem({ item, style, ...props }) {
    const settings = tradeTypeSettings[item.type] || tradeTypeSettings['other'];
    const color = item.direction === 'to'
        ? theme['color-danger-200']
        : theme['color-success-200'];

    return (
        <View style={[style, {
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
        </View>
    );
}
