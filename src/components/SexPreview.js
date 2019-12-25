import React from 'react';
import theme from '@src/theme.js';
import PropTypes from 'prop-types';
import { Icon } from '@ui-kitten/components';

export default function SexPreview(props) {
    const sex = {
        male: {
            icon: 'mars',
            color: theme['color-primary-500'],
        },

        female: {
            icon: 'venus',
            color: '#CC6594',
        },

        unknown: {
            icon: 'genderless',
            color: theme['color-basic-500'],
        },
    }[props.sex || 'unknown'];

    return (
        <Icon name={sex.icon} color={sex.color} {...props} />
    );
}

SexPreview.propTypes = {
    sex: PropTypes.string,
}
