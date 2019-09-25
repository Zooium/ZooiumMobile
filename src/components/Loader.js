import React from 'react';
import { Layout, Spinner } from 'react-native-ui-kitten';

export default function Loader() {
    return (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size='giant' />
        </Layout>
    );
};

