import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import React, { useState } from 'react';
import TradeItem from '@components/TradeItem.js';
import { withNavigation } from 'react-navigation';
import { Text, Icon, Button, Tooltip } from '@ui-kitten/components';

function TradeLine({ line, item: current, editing = false, transaction, navigation, ...props }) {
    const [showTooltips, setShowTooltips] = useState(false);

    const leftItems = transaction.items.filter(item => {
        return item.direction === 'to' && (item.id === current.id || (item.relation && item.relation.id === current.id));
    });

    const rightItems = transaction.items.filter(item => {
        return item.direction === 'from' && (item.id === current.id || (item.relation && item.relation.id === current.id));
    });

    const route = 'TransactionItemEdit';
    const editItem = (item = undefined, defaults = {}) => navigation.navigate({
        key: route + ((item && item.id) || Math.random().toString(36).slice(2)),
        routeName: route,
        params: {
            item, defaults,
            onSave: (item, isSaving) => {
                // @wip
                console.log({ item, isSaving })
            },
        },
    });

    const AddItem = ({ status, direction, count }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {count !== 0 && (
                    <View style={{ flex: 1, height: 1, marginRight: 12, backgroundColor: theme['color-'+status+'-200'] }} />
                ) || direction === 'from' && <View style={{ flex: 1}} />}

                <Button size="tiny" status={status} style={{ marginBottom: 6 }} onPress={() => {
                    editItem(undefined, {
                        direction: direction,
                        relation_id: current.id,
                        transaction_id: transaction.id,
                    });
                }}>
                    {i18n.t('Add Item')}
                </Button>

                {count !== 0 && (
                    <View style={{ flex: 1, height: 1, marginLeft: 12, backgroundColor: theme['color-'+status+'-200'] }} />
                ) || direction === 'to' && <View style={{ flex: 1}} />}
            </View>
        );
    }

    return (
        <View {...props}>
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
                    {! leftItems.length && (
                        <Text appearance="hint" style={{ textAlign: 'left', marginBottom: 6 }}>
                            {i18n.t('None')}
                        </Text>
                    )}

                    {leftItems.map(item => (
                        <TradeItem
                            key={item.id}
                            item={item}
                            editing={editing}
                            style={{ marginBottom: 6 }}
                            onPress={editing && (item => editItem(item))}
                        />
                    ))}

                    {editing && <AddItem status="danger" direction="to" count={leftItems.length} />}
                </View>
            </View>

            {/* Right Side */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={{ flex: 1 }}>
                    {! rightItems.length && (
                        <Text appearance="hint" style={{ textAlign: 'right', marginBottom: 6 }}>
                            {i18n.t('None')}
                        </Text>
                    )}

                    {rightItems.map(item => (
                        <TradeItem
                            key={item.id}
                            item={item}
                            editing={editing}
                            style={{ marginBottom: 6 }}
                            onPress={editing && (item => editItem(item))}
                        />
                    ))}

                    {editing && <AddItem status="success" direction="from" count={rightItems.length} />}
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

export default withNavigation(TradeLine);
