import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View } from 'react-native';
import { Text, Card, Icon } from '@ui-kitten/components';

export default function TradeForm({ editing = false, transaction, mergeState }) {
    return (
        <View>

            {/* @wip */}
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <Text style={{ color: theme['color-basic-600'] }}>
                        {i18n.t('Line {{number}}', { number: 1 })}
                    </Text>

                    <View style={{ flex: 1, height: 1, marginLeft: 12, backgroundColor: theme['color-basic-400'] }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Icon name="user-crown" size={24} style={{ marginRight: 12, color: theme['color-danger-500'] }} fixedWidth />
                    <View style={{ flex: 1 }}>
                        <Card style={{ marginBottom: 6, borderColor: theme['color-danger-300'] }}>
                            <Text>@wip</Text>
                        </Card>

                        <Card style={{ marginBottom: 6, borderColor: theme['color-danger-300'] }}>
                            <Text>@wip</Text>
                        </Card>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Card style={{ marginBottom: 6, borderColor: theme['color-success-300'] }}>
                            <Text>@wip</Text>
                        </Card>
                    </View>
                    <Icon name="user-tag" size={24} style={{ marginLeft: 12, color: theme['color-success-500'] }} fixedWidth />
                </View>
            </View>
            {/* @wip */}

        </View>
    );
}
