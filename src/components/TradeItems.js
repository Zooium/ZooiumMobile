import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import TradeLine from '@components/TradeLine.js';
import { withNavigation } from 'react-navigation';
import { Text, Button } from '@ui-kitten/components';

function TradeItems({ editing = false, transaction, mergeState, navigation, ...props }) {
    let lineNumber = 1;

    const route = 'TransactionItemEdit';
    const createItem = (direction) => navigation.navigate({
        key: route + Math.random().toString(36).slice(2),
        routeName: route,
        params: {
            defaults: {
                direction: direction,
                transaction_id: transaction.id,
            },

            onSave: (item) => {
                // @wip
                console.log('new item', item)
            },
        },
    });

    return (
        <View {...props}>
            {transaction.items && transaction.items.map(item => {
                // Skip if not top-level item.
                if (item.relation) return;

                // Return trade line for top item.
                return (
                    <TradeLine
                        item={item}
                        key={item.id}
                        editing={editing}
                        line={lineNumber++}
                        transaction={transaction}
                    />
                );
            })}

            {editing && (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ flex: 1, height: 1, marginRight: 12, backgroundColor: theme['color-basic-400'] }} />

                        <Text style={{ color: theme['color-basic-600'] }}>
                            {i18n.t('Add Line')}
                        </Text>

                        <View style={{ flex: 1, height: 1, marginLeft: 12, backgroundColor: theme['color-basic-400'] }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: .5, paddingRight: 6 }}>
                            <Button status="danger" onPress={() => createItem('to')}>
                                {i18n.t('You deliver')}
                            </Button>
                        </View>

                        <View style={{ flex: .5, paddingLeft: 6 }}>
                            <Button status="success" onPress={() => createItem('from')}>
                                {i18n.t('You receive')}
                            </Button>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

export default withNavigation(TradeItems);
