import React from 'react';
import { View } from 'react-native';
import TradeLine from '@components/TradeLine.js';

export default function TradeForm({ editing = false, transaction, mergeState }) {
    let lineNumber = 1;

    return (
        <View>
            {/* Lines */}
            {transaction.items.map(item => {
                // Skip if not top-level item.
                if (item.relation) return;

                // Return trade line for top item.
                return <TradeLine key={item.id} line={lineNumber++} item={item} transaction={transaction} />;
            })}

            {/* Form */}
            {/* @wip */}
        </View>
    );
}
