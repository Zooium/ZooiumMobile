import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import InputButton from '@components/InputButton.js';
import Picker from 'react-native-modal-datetime-picker';
import { useColorScheme } from 'react-native-appearance';

export default function DateTimePicker({ value, onChange }) {
    const date = value && new Date(value) || new Date();
    const [show, setShow] = useState(false);

    return (
        <Fragment>
            <InputButton onPress={() => setShow(true)}>
                {value && date.toLocaleString() || i18n.t('Press to select {{resource}}...', {
                    resource: i18n.t('Date').toLowerCase(),
                })}
            </InputButton>

            <Picker
                mode="datetime"
                date={date}
                isVisible={show}
                locale={i18n.language}
                onConfirm={date => {
                    setShow(false);
                    onChange(date);
                }}
                onCancel={() => {
                    setShow(false);
                }}
                isDarkModeEnabled={useColorScheme() === 'dark'}
            />
        </Fragment>
    );
}

DateTimePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}
