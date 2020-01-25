import React from 'react';
import theme from '@src/theme.js';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import InputButton from '@components/InputButton.js';
import { useNavigation } from '@react-navigation/native';

export default function TypeaheadInput({ view, preview, appendSearch, add, value, onChange }) {
    const navigation = useNavigation();

    return (
        <InputButton
            icon={value && ((style) => (
                <TouchableOpacity style={style} onPress={() => onChange(null)}>
                    <Icon name="times" size={22} color={theme['color-basic-600']} />
                </TouchableOpacity>
            ))}
            onPress={() => {
                const rand = Math.random().toString(36).slice(2);
                navigation.navigate({
                    key: view + rand,
                    name: view,
                    params: {
                        showSearch: true,
                        focusSearch: true,
                        onChange, appendSearch, add,
                        
                        createParams: {
                            onSave: (item) => {
                                // Bind item to input.
                                onChange(item);

                                // Pop navigation 2 levels (create screen, typeahead).
                                return 2;
                            },
                        },
                    },
                });
            }}
        >
            {value && preview(value)}
        </InputButton>
    );
}
