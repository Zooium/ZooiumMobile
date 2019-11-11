import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { Input } from 'react-native-ui-kitten';
import React, { useState, useEffect, forwardRef } from 'react';

function DebouncedInput(props, ref) {
    const [text, setText] = useState(props.get);
    const [update, setUpdate] = useState(false);
    const [debouncer] = useState(() => debounce(() => setUpdate(true), props.delay || 200));

    // Update parent value on request.
    useEffect(() => {
        if (update) {
            props.set(text);
            setUpdate(false);
        }
    }, [update]);

    // Update local value when parent changed.
    useEffect(() => {
        if (text !== props.get) {
            setText(props.get);
        }
    }, [props.get]);

    return (
        <Input ref={ref} value={text} onChangeText={text => {
            setText(text);
            debouncer();
        }} {...props} />
    );
}

DebouncedInput.propTypes = {
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    delay: PropTypes.number,
}

export default forwardRef(DebouncedInput);
