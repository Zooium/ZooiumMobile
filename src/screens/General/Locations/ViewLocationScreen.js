import React from 'react';
import i18n from '@src/i18n.js';
import { Layout } from '@ui-kitten/components';
import LocationSettings from '@settings/LocationSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';

export default function ViewLocationScreen() {
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
                    onPress: ({ response, navigation }) => {
                        const route = 'ListEnclosures';
                        const search = 'location:'+response.id;
    
                        navigation.navigate({
                            key: route + search,
                            routeName: route,
                            params: {
                                search: search,
                                showSearch: true,
                                focusSearch: false,
                            },
                        });
                    },
                },
                {
                    title: i18n.t('Animal', { count: 2 }),
                    onPress: ({ response, navigation }) => {
                        const route = 'ListAnimals';
                        const search = 'location:'+response.id;
    
                        navigation.navigate({
                            key: route + search,
                            routeName: route,
                            params: {
                                search: search,
                                showSearch: true,
                                focusSearch: false,
                            },
                        });
                    },
                },
            ],
        },
    ];

    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={items}
                fetch={VIEW_LOCATION}
                    
                routes={{
                    edit: 'EditLocation',
                }}
            />
        </Layout>
    )
}

ViewLocationScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: LocationSettings.title,
});
