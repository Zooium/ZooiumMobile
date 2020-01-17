import i18n from '@src/i18n.js';
import client from '@src/apollo.js';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import Settings from '@utils/Settings.js';
import { mapping } from '@eva-design/eva';
import { I18nextProvider } from 'react-i18next';
import { Updates, ScreenOrientation } from 'expo';
import AppContainer from '@routes/AppContainer.js';
import { AppState, StatusBar } from 'react-native';
import theme, { customMapping } from '@src/theme.js';
import { ApolloProvider } from '@apollo/react-hooks';
import FontAwesome5Pack from '@utils/icons/IconPack.js';
import { SocketProvider } from '@utils/SocketProvider.js';
import NavigationService from '@utils/NavigationService.js';
import React, { Fragment, useState, useEffect } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

Sentry.init({ dsn: 'https://5b87f47102bb45ee8126ca2fcd94e2aa@sentry.io/1806931' });
Sentry.setRelease(Constants.manifest.revisionId);

export default function App() {
    // Lock to portrait up orientation.
    ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    // Listen for app state changes. 
    const [state, setState] = useState('active');
    useEffect(() => {
        // Register app state listener.
        const listener = AppState.addEventListener('change', (state) => {
            setState(state);
        });

        // Remove app state listener on cleanup.
        return () => {
            listener && AppState.removeEventListener(listener);
        }
    }, [setState]);

    // Check for updates on active.
    useEffect(() => {
        // Skip if not active state.
        if (state !== 'active') return;

        // Check for application updates.
        Updates.checkForUpdateAsync().then(({ isAvailable }) => {
            // Reload from source if available.
            if (isAvailable) Updates.reload();
        }).catch(() => { /* Left blank intentionally */ });
    }, [state]);

    // Return application.
    return (
        <Fragment>
            <StatusBar barStyle="light-content" />
            <IconRegistry icons={[FontAwesome5Pack]} />
            <ApplicationProvider mapping={mapping} theme={theme} customMapping={customMapping}>
                <ApolloProvider client={client}>
                    <SocketProvider settings={Settings.socket}>
                        <I18nextProvider i18n={i18n}>
                            <ActionSheetProvider>
                                <AppContainer ref={i => NavigationService.setInstance(i)} />
                            </ActionSheetProvider>
                        </I18nextProvider>
                    </SocketProvider>
                </ApolloProvider>
            </ApplicationProvider>
        </Fragment>
    );
}
