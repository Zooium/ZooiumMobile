import React from 'react';
import i18n from '@src/i18n.js';
import { TouchableOpacity } from 'react-native';
import { Text, Layout } from 'react-native-ui-kitten';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';

export default function ViewEnclosureScreen({ navigation }) {
    const items = [
        {
            title: i18n.t('General'),
            data: [
                {
                    title: i18n.t('Name'),
                    text: resource => resource.name,
                },
                {
                    title: i18n.t('Location', { count: 1 }),
                    provided: resource => resource.location,
                    render: resource => {  
                        const location = resource && resource.location;       
                        const locationText = location &&
                            [
                                location.address,
                                location.city,
                                location.postcode,
                            ].filter(Boolean).join(', ')
                        || '(' + i18n.t('not provided') + ')';

                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate({
                                    routeName: 'ViewLocation',
                                    params: {
                                        item: location,
                                    },
                                })
                            }}>
                                <Text status="primary">{location.name}</Text>

                                <Text category="c1" appearance="hint">
                                    {locationText}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                },
            ],
        },
        {
            title: i18n.t('Data'),
            data: [
                {
                    title: i18n.t('Animal', { count: 2 }),
                    onPress: () => {
                        alert('@wip');
                    },
                },
            ],
        },
    ];

    title = item => {
        return (item.name || '(' + i18n.t('name not set') + ')');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={items}
                title={title}
                fetch={VIEW_ENCLOSURE}
                    
                routes={{
                    edit: 'EditEnclosure',
                }}
            />
        </Layout>
    )
}

ViewEnclosureScreen.navigationOptions = ResourceView.navigationOptions;
