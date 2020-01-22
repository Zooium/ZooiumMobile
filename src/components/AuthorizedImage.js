import React from 'react';
import { Image } from 'react-native';
import { useToken } from '@providers/AuthProvider.js';

export default function AuthorizedImage({ uri, ...props }) {
    const token = useToken();

    return (
        <Image source={{
            uri: uri,
            headers: {
                Authorization: 'Bearer ' + token.accessToken,
            },
        }} {...props} />
    );
}
