import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, Select, Layout } from '@ui-kitten/components';

export default function ListSettings({ sort, setSort, sorting, filter, setFilter, filters }) {
    return (
        <Layout level="2" style={{ padding: 8 }}>
            {filters && (
                <View style={{ paddingBottom: sorting ? 10 : 0 }}>
                    <Text category="label" style={{ paddingBottom: 4, color: theme['color-basic-600'] }}>
                        {i18n.t('Filters').toUpperCase()}
                    </Text>

                    <Select
                        data={filters}
                        multiSelect={true}
                        keyExtractor={item => item.key}
                        selectedOption={filters.filter(item => {
                            return filter.includes(item.key);
                        })}
                        onSelect={options => setFilter(
                            options.map(option => option.key)
                        )}
                        controlStyle={{ backgroundColor: 'white' }}
                    />
                </View>
            )}

            {sorting && (
                <View>
                    <Text category="label" style={{ paddingBottom: 4, color: theme['color-basic-600'] }}>
                        {i18n.t('Sorting').toUpperCase()}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select
                            data={sorting}
                            keyExtractor={item => item.key}
                            selectedOption={sort && sort.column && sorting.find(item => {
                                return item.key === sort.column;
                            })}
                            onSelect={(option) => setSort({
                                ...sort,
                                column: option.key,
                            })}
                            style={{ flex: 1, marginRight: 8 }}
                            controlStyle={{ backgroundColor: 'white' }}
                        />

                        <TouchableOpacity onPress={() => setSort({
                            ...sort,
                            direction: sort && sort.direction === 'desc'
                                ? 'asc'
                                : 'desc',
                        })} style={{ padding: 8 }}>
                            <Icon
                                size={28}
                                color={theme['color-primary-500']}
                                name={sort && sort.direction === 'desc'
                                    ? 'sort-alpha-down-alt'
                                    : 'sort-alpha-down'
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Layout>
    )
}
