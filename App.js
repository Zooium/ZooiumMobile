import { Updates } from 'expo';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import client from '@src/apollo.js';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { mapping } from '@eva-design/eva';
import { I18nextProvider } from 'react-i18next';
import AppContainer from '@routes/AppContainer.js';
import { ApolloProvider } from '@apollo/react-hooks';
import FontAwesome5Pack from '@utils/icons/IconPack.js';
import NavigationService from '@utils/NavigationService.js';
import { AppearanceProvider } from 'react-native-appearance';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

Sentry.init({ dsn: 'https://5b87f47102bb45ee8126ca2fcd94e2aa@sentry.io/1806931' });
Sentry.setRelease(Constants.manifest.revisionId);

export default function App() {
    // Check for application updates.
    Updates.checkForUpdateAsync().then(({ isAvailable }) => {
        // Reload from source if available.
        if (isAvailable) Updates.reload();
    }).catch(() => { /* Left blank intentionally */ });

    // Return application.
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
