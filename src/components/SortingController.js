import React from 'react';
import theme from '@src/theme.js';
import { Select, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';

export default function SortingController({ sort, setSort, sorting }) {
    return (
        <View style={{
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme['color-basic-200'],
        }}>
            <Select
                data={sorting}
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
    )
}
