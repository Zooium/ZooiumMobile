import React from 'react';
import i18n from '@src/i18n.js';
import { TouchableOpacity } from 'react-native';
import { Text, Layout } from 'react-native-ui-kitten';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';

export default function ViewLocationScreen({ navigation }) {
    const items = [
        {
            title: i18n.t('General'),
            data: [
                {
                    title: i18n.t('Name'),
                    text: resource => resource.name,
                },
                {
                    title: i18n.t('Address'),
                    text: resource => resource.address,
                },
                {
                    title: i18n.t('City'),
                    text: resource => resource.city,
                },
                {
                    title: i18n.t('Postcode'),
                    text: resource => resource.postcode,
                },
                {
                    title: i18n.t('State'),
                    text: resource => resource.state,
                },
                {
                    title: i18n.t('Country'),
                    text: resource => resource.country,
                },
            ],
        },
        {
            title: i18n.t('Data'),
            data: [
                {
                    title: i18n.t('Enclosure', { count: 2 }),
                    onPress: () => {
                        alert('@wip');
                    },
                },
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
                fetch={VIEW_LOCATION}
                    
                routes={{
                    edit: 'EditLocation',
                }}
            />
        </Layout>
    )
}

ViewLocationScreen.navigationOptions = ResourceView.navigationOptions;
