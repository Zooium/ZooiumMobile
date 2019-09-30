import React from 'react';
import theme from '@src/theme.js';
import client from '@src/apollo.js';
import { SplashScreen } from 'expo';
import { mapping } from '@eva-design/eva';
import AppContainer from '@routes/AppContainer.js';
import { ApolloProvider } from '@apollo/react-hooks';
import NavigationService from '@utils/NavigationService.js';
import { ApplicationProvider } from 'react-native-ui-kitten';

export default class App extends React.Component {
    componentDidMount() {
        SplashScreen.preventAutoHide();
    }

    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={theme}>
                <ApolloProvider client={client}>
                    <AppContainer ref={i => NavigationService.setInstance(i)} />
                </ApolloProvider>
            </ApplicationProvider>
        );
    }
}
