import React from 'react';
import theme from '@src/theme.js';
import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import InputButton from '@components/InputButton.js';

function TypeaheadInput({ view, preview, appendSearch, add, value, onChange, navigation }) {
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
                    routeName: view,
                    params: {
                        showSearch: true,
                        focusSearch: true,
                        onChange, appendSearch, add,
                    },
                })
            }}
        >
            {value && preview(value)}
        </InputButton>
    );
}

export default withNavigation(TypeaheadInput);
