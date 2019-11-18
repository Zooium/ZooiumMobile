import i18n from '@src/i18n.js';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import InputButton from '@components/InputButton.js';
import Picker from "react-native-modal-datetime-picker";

export default function DateTimePicker({ value, onChange }) {
    const date = value && new Date(value);
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
            />
        </Fragment>
    );
}

DateTimePicker.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
}
