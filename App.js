import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import client from '@src/apollo.js';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import Settings from '@utils/Settings.js';
import { mapping } from '@eva-design/eva';
import { I18nextProvider } from 'react-i18next';
import { Updates, ScreenOrientation } from 'expo';
import AppContainer from '@routes/AppContainer.js';
import { AppState, StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import FontAwesome5Pack from '@utils/icons/IconPack.js';
import { SocketProvider } from '@utils/SocketProvider.js';
import NavigationService from '@utils/NavigationService.js';
import { AppearanceProvider } from 'react-native-appearance';
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

    // Check for updates on application focus.
    const [updating, setUpdating] = useState(false);
    useEffect(() => {
        // Define check for updates function.
        const checkForUpdates = (state) => {
            // Skip if updating or app is not in foreground.
            if (updating || state !== 'active') return;

            // Check for application updates.
            Updates.checkForUpdateAsync().then(({ isAvailable }) => {
                // Reload from source if available.
                if (isAvailable) {
                    Updates.reload();
                } else {
                    setUpdating(false);
                }
            }).catch(() => { /* Left blank intentionally */ });
        }

        // Register app state listener and run on boot.
        const listener = AppState.addEventListener('change', checkForUpdates);
        checkForUpdates('active');

        // Remove app state listener.
        return () => {
            listener && AppState.removeEventListener(listener);
        }
    }, []);

    // Return application.
    return (
        <Fragment>
            <StatusBar barStyle="light-content" />
            <IconRegistry icons={[FontAwesome5Pack]} />
            <AppearanceProvider>
                <ApplicationProvider mapping={mapping} theme={theme}>
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
            </AppearanceProvider>
        </Fragment>
    );
}
