import React from 'react';
import { Radio, RadioGroup as Group } from '@ui-kitten/components';

export default function RadioGroup({ options, selected, onChange, ...props }) {
    const keys = Object.keys(options);
    const values = Object.values(options);

    const onChangeHandler = (index) => onChange && onChange(keys[index]);

    return (
        <Group selectedIndex={keys.indexOf(selected)} onChange={onChangeHandler} {...props}>
            {values.map((value, key) => (
                <Radio key={key} text={value} textStyle={{ fontWeight: 'normal' }} />
            ))}
        </Group>
    )
}
