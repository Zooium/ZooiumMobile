import i18n from '@src/i18n.js';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { mapping } from '@eva-design/eva';
import { I18nextProvider } from 'react-i18next';
import { Updates, ScreenOrientation } from 'expo';
import AppContainer from '@routes/AppContainer.js';
import { AppState, StatusBar } from 'react-native';
import theme, { customMapping } from '@src/theme.js';
import AuthProvider from '@providers/AuthProvider.js';
import FontAwesome5Pack from '@utils/icons/IconPack.js';
import SocketProvider from '@providers/SocketProvider.js';
import ApolloProvider from '@providers/ApolloProvider.js';
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
                <ApolloProvider>
                    <AuthProvider>
                        <SocketProvider>
                            <I18nextProvider i18n={i18n}>
                                <ActionSheetProvider>
                                    <AppContainer />
                                </ActionSheetProvider>
                            </I18nextProvider>
                        </SocketProvider>
                    </AuthProvider>
                </ApolloProvider>
            </ApplicationProvider>
        </Fragment>
    );
}
