import React from 'react';
import theme from '@src/theme.js';
import { TouchableOpacity } from 'react-native';
import { Icon, Datepicker } from '@ui-kitten/components';

/**
 * Awaiting time picker implementation.
 * @see https://github.com/akveo/react-native-ui-kitten/issues/778
 */
export default function DateTimePicker({ value, onChange, ...props }) {
    const date = value && new Date(value);

    return (
        <Datepicker
            date={date}
            placeholder={null}
            min={new Date(1800, 1, 1)}
            icon={value && ((style) => (
                <TouchableOpacity style={style} onPress={() => onChange(null)}>
                    <Icon name="times" size={22} color={theme['color-basic-600']} />
                </TouchableOpacity>
            ))}
            onSelect={date => {
                onChange(date.toISOString());
            }}
            {...props}
        />
    );
}
