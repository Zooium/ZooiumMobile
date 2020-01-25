import React from 'react';
import { Updates } from 'expo';
import i18n from '@src/i18n.js';
import theme from '@src/theme.js';
import Constants from 'expo-constants';
import AppStyles from '@utils/AppStyles.js';
import { useAuth } from '@providers/AuthProvider.js';
import { Text, Icon, Layout } from '@ui-kitten/components';
import { View, Alert, SectionList, TouchableHighlight } from 'react-native';

const menu = [
    {
        title: i18n.t('General'),
        data: [
            {
                icon: 'dove',
                title: i18n.t('Animal', { count: 2 }),
                onPress: ({ navigation }) => navigation.navigate('Animals'),
            },
        
            {
                icon: 'map-marked-alt',
                title: i18n.t('Enclosure', { count: 2 }),
                onPress: ({ navigation }) => navigation.navigate('Enclosures'),
            },
        
            {
                icon: 'globe-europe',
                title: i18n.t('Location', { count: 2 }),
                onPress: ({ navigation }) => navigation.navigate('LocationList'),
            },
        ],
    },

    {
        title: i18n.t('Sales'),
        data: [
            {
                icon: 'address-book',
                title: i18n.t('Contact', { count: 2 }),
                onPress: ({ navigation }) => navigation.navigate('ContactList'),
            },
        
            {
                icon: 'wallet',
                title: i18n.t('Transaction', { count: 2 }),
                onPress: ({ navigation }) => navigation.navigate('TransactionList'),
            },
        ],
    },

    {
        title: i18n.t('Location'),
        data: [
            {
                icon: 'location-arrow',
                title: i18n.t('Nearby'),
                onPress: ({ navigation }) => navigation.navigate('LocationNearby'),
            },
        
            {
                icon: 'qrcode',
                title: i18n.t('Scanner'),
                onPress: ({ navigation }) => navigation.navigate('BarcodeNearby'),
            },
        ],
    },

    {
        title: i18n.t('Account'),
        data: [
            {
                icon: 'sign-out-alt',
                title: i18n.t('Logout'),
                color: theme['color-danger-500'],
                onPress: ({ auth }) => {
                    auth.logout();
                },
            },
        ],
    },
];

export default function MenuScreen({ navigation }) {
    const auth = useAuth();

    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight underlayColor={theme['color-basic-200']} style={{ backgroundColor: 'white' }} onPress={() => {
                item.onPress({ auth, navigation })
            }}>
                <View style={[AppStyles.listItem, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }]}>
                    <View style={{ width: 40 }}>
                        <Icon
                            solid
                            size={24}
                            name={item.icon}
                            color={item.color || theme['color-primary-500']}
                            style={{
                                marginRight: 15,
                            }}
                        />
                    </View>

                    <Text category="s1">
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <Text category="label" style={AppStyles.listSection}>
                {section.title.toUpperCase()}
            </Text>
        );
    }

    return (
        <Layout style={{ flex: 1 }}>
            <SectionList
                sections={menu}
                initialNumToRender={25}
                keyExtractor={(item, index) => index.toString()}
                
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}

                ListFooterComponent={(
                    <View style={{
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text appearance="hint" category="c1" status="primary" onPress={() => {
                            Updates.checkForUpdateAsync().then(({ isAvailable }) => {
                                if (isAvailable) {
                                    // Update the application.
                                    Updates.reload();
                                } else {
                                    // Already up to date alert.
                                    Alert.alert(
                                        i18n.t('Update Unavailable'),
                                        i18n.t('Application is already up to date!')
                                    );
                                }
                            }).catch(() => {
                                // Failed to check for updates.
                                Alert.alert(
                                    i18n.t('Update Unavailable'),
                                    i18n.t('Failed to fetch updates. Try again later!')
                                );
                            });
                        }}>
                            {i18n.t('Check for updates...')}
                        </Text>
        
                        <Text appearance="hint" category="c1">
                            {Constants.manifest.revisionId || 'debug'}
                        </Text>
                    </View>
                )}
            />
        </Layout>
    );
}
