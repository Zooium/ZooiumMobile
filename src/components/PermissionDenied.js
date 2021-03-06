import React from 'react';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import Constants from 'expo-constants';
import * as IntentLauncher from 'expo-intent-launcher';
import { View, Linking, Platform } from 'react-native';
import { Text, Icon, Button } from '@ui-kitten/components';

export default function PermissionDenied({ text, retry, children, ...props }) {
    const openSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings://');
        } else if (Platform.OS === 'android') {
            IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, {
                data: 'package:' + (Constants.manifest.releaseChannel
                    ? Constants.manifest.android.package
                    : 'host.exp.exponent'
                )
            });
        } else {
            alert('Unsupported Device');
        }
    }

    return (
        <View style={{ padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }} {...props}>
            <Icon name="exclamation-triangle" size={75} color={theme['color-warning-500']} solid />

            <Text category="s1" style={{ textAlign: 'center', marginVertical: 20 }}>
                {text}
            </Text>

            <Button onPress={openSettings} style={{ marginBottom: 10 }}>
                {i18n.t('Open Settings')}
            </Button>

            <Button appearance="ghost" onPress={retry}>
                {i18n.t('Retry')}
            </Button>

            {children}
        </View>
    );
}
