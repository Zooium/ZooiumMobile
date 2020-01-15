import React from 'react';
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
