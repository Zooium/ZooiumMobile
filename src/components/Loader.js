import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

export default function Loader({ size = 'giant', status = 'primary', children, ...props }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} {...props}>
            <Spinner size={size} status={status} />
            {children}
        </View>
    );
}

Loader.propTypes = {
    size: PropTypes.string,
    status: PropTypes.string,
}
