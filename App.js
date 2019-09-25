import React from 'react';
import theme from '@src/theme.js';
import client from '@src/apollo.js';
import { mapping } from '@eva-design/eva';
import AppContainer from '@routes/AppContainer.js';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApplicationProvider } from 'react-native-ui-kitten';

export default class App extends React.Component {
    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={theme}>
                <ApolloProvider client={client}>
                    <AppContainer />
                </ApolloProvider>
            </ApplicationProvider>
        );
    }
}
