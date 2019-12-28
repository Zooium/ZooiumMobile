import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import React, { useState } from 'react';
import TradeItem from '@components/TradeItem.js';
import { Text, Icon, Tooltip } from '@ui-kitten/components';

export default function TradeLine({ line, item: current, transaction }) {
    const [showTooltips, setShowTooltips] = useState(false);

    const leftItems = transaction.items.filter(item => {
        return item.direction === 'to' && (item.id === current.id || (item.relation && item.relation.id === current.id));
    });

    const rightItems = transaction.items.filter(item => {
        return item.direction === 'from' && (item.id === current.id || (item.relation && item.relation.id === current.id));
    });

    return (
        <View>
            {/* Line Number */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: theme['color-basic-600'] }}>
                    {i18n.t('Line {{number}}', { number: line })}
                </Text>

                <View style={{ flex: 1, height: 1, marginLeft: 12, backgroundColor: theme['color-basic-400'] }} />
            </View>

            {/* Left Side */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Tooltip text={i18n.t('You - You deliver')} placement="top" visible={showTooltips} onBackdropPress={() => setShowTooltips(false)}>
                    <Icon name="user-circle" size={24} style={{ marginRight: 12, color: theme['color-danger-500'] }} onPress={() => {
                        setShowTooltips(true);
                    }} fixedWidth solid />
                </Tooltip>

                <View style={{ flex: 1 }}>
                    {leftItems.map(item => <TradeItem key={item.id} item={item} style={{ marginBottom: 6 }} />)}
                    {! leftItems.length && <Text appearance="hint">{i18n.t('None')}</Text>}
                </View>
            </View>

            {/* Right Side */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={{ flex: 1 }}>
                    {rightItems.map(item => <TradeItem key={item.id} item={item} style={{ marginBottom: 6 }} />)}
                    {! rightItems.length && <Text appearance="hint" style={{ textAlign: 'right' }}>{i18n.t('None')}</Text>}
                </View>

                <Tooltip text={i18n.t('Them - You receive')} placement="top" visible={showTooltips} onBackdropPress={() => setShowTooltips(false)}>
                    <Icon name="user-tag" size={24} style={{ marginLeft: 12, color: theme['color-success-500'] }} onPress={() => {
                        setShowTooltips(true);
                    }} fixedWidth solid />
                </Tooltip>
            </View>
        </View>
    );
}
