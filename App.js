import '@src/sentry.js';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import client from '@src/apollo.js';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { mapping } from '@eva-design/eva';
import { I18nextProvider } from 'react-i18next';
import AppContainer from '@routes/AppContainer.js';
import { ApolloProvider } from '@apollo/react-hooks';
import FontAwesome5Pack from '@utils/FontAwesome5Pack.js';
import NavigationService from '@utils/NavigationService.js';
import { AppearanceProvider } from 'react-native-appearance';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';

export default function App() {
    return (
        <Fragment>
            <StatusBar barStyle="light-content" />
            <IconRegistry icons={[FontAwesome5Pack]} />
            <AppearanceProvider>
                <ApplicationProvider mapping={mapping} theme={theme}>
                    <ApolloProvider client={client}>
                        <I18nextProvider i18n={i18n}>
                            <AppContainer ref={i => NavigationService.setInstance(i)} />
                        </I18nextProvider>
                    </ApolloProvider>
                </ApplicationProvider>
            </AppearanceProvider>
        </Fragment>
    );
}
