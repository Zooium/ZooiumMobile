import React from 'react';
import PropTypes from 'prop-types';
import Loader from '@components/Loader.js';
import { Button } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';

export default function LoadingButton({ size = 'medium', loading, children, ...props }) {
    const sizes = mapping.components.Button.appearances.filled.variantGroups.size;

    return (
        <Button size={size} icon={loading && (() => (
            <Loader size="small" style={{ width: '100%', height: sizes[size].textLineHeight }} />
        ))} {...props}>
            {! loading && children }
        </Button>
    );
}

LoadingButton.propTypes = {
    size: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    children: PropTypes.any,
}
