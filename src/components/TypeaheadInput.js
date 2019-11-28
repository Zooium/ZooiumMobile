import React from 'react';
import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation';
import InputButton from '@components/InputButton.js';

function TypeaheadInput({ view, preview, appendSearch, add, resource, value, onChange, navigation }) {
    return (
        <InputButton
            icon={value && (() => (
                <Icon name="times" size={22} color="#000" style={{ opacity: .4 }} onPress={() => {
                    onChange(undefined);
                }} />
            ))}
            onPress={() => {
                navigation.navigate(view, {
                    showSearch: true,
                    focusSearch: true,
                    resource, onChange, appendSearch, add,
                })
            }}
        >
            {value && preview(value) || i18n.t('Press to select {{resource}}...', { resource: resource.toLowerCase() })}
        </InputButton>
    );
}

TypeaheadInput.propTypes = {
    add: PropTypes.string,
    appendSearch: PropTypes.string,
    view: PropTypes.string.isRequired,
    preview: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}

export default withNavigation(TypeaheadInput);
