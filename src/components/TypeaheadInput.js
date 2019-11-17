import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation';

function TypeaheadInput({ view, preview, appendQuery, resource, value, onChange, navigation }) {
    return (
        <Button
            status="basic"
            appearance="outline"
            style={s.inputButton}
            textStyle={s.inputButtonText}
            icon={value && (() => (
                <Icon name="times" size={22} color="#000" style={{ opacity: .4 }} onPress={() => {
                    onChange(undefined);
                }} />
            ))}
            onPress={() => {
                navigation.navigate(view, {
                    resource, onChange, appendQuery,
                })
            }}
        >
            {value && preview(value) || i18n.t('Press to select {{resource}}...', { resource: resource.toLowerCase() })}
        </Button>
    );
}

TypeaheadInput.propTypes = {
    appendQuery: PropTypes.string,
    view: PropTypes.string.isRequired,
    preview: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}

let s = StyleSheet.create({
    inputButton: {
        minHeight: 48,
        paddingVertical: 7,
        paddingHorizontal: 8,

        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        borderColor: theme['color-basic-300'],
        backgroundColor: theme['color-basic-200'],
    },

    inputButtonText: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'normal',
        marginHorizontal: 8,
    },
})

export default withNavigation(TypeaheadInput);
