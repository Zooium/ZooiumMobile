import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import AuthState from '@utils/AuthState.js';

export default function AuthorizedImage({ uri, ...props }) {
    return (
        <Image source={{
            uri: uri,
            headers: {
                Authorization: 'Bearer ' + AuthState.accessToken(),
            },
        }} {...props} />
    );
}

AuthorizedImage.propTypes = {
    uri: PropTypes.string,
}
