import React from 'react';
import i18n from '@src/i18n.js';
import { Layout, Input } from '@ui-kitten/components';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';
import UPDATE_LOCATION from '@graphql/mutations/Location/updateLocation.gql.js';
import CREATE_LOCATION from '@graphql/mutations/Location/createLocation.gql.js';

const items = [
    {
        title: i18n.t('General'),
        data: [
            {
                key: 'name',
                required: true,
                title: i18n.t('Name'),
                render: function NameRender([state, mergeState]) {
                    return <Input value={state.name} onChangeText={(value) => mergeState({ name: value })} />;
                },
            },
            {
                key: 'address',
                title: i18n.t('Address'),
                render: function AddressRender([state, mergeState]) {
                    return <Input value={state.address} onChangeText={(value) => mergeState({ address: value })} />;
                },
            },
            {
                key: 'city',
                title: i18n.t('City'),
                render: function CityRender([state, mergeState]) {
                    return <Input value={state.city} onChangeText={(value) => mergeState({ city: value })} />;
                },
            },
            {
                key: 'postcode',
                title: i18n.t('Postcode'),
                render: function PostcodeRender([state, mergeState]) {
                    return <Input value={state.postcode} onChangeText={(value) => mergeState({ postcode: value })} />;
                },
            },
            {
                key: 'state',
                title: i18n.t('State'),
                render: function StateRender([state, mergeState]) {
                    return <Input value={state.state} onChangeText={(value) => mergeState({ state: value })} />;
                },
            },
            {
                key: 'country',
                title: i18n.t('Country'),
                render: function CountryRender([state, mergeState]) {
                    return <Input value={state.country} onChangeText={(value) => mergeState({ country: value })} />;
                },
            },
        ],
    },
];

const formInit = () => ({
    name: '',
    address: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
})

const formParser = (resource) => {
    return resource;
}

export default function EditLocationScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={items}
                    fetch={VIEW_LOCATION}
                    mutations={{
                        save: UPDATE_LOCATION,
                        create: CREATE_LOCATION,
                    }}

                    routes={{
                        view: 'ViewLocation',
                    }}

                    formInit={formInit}
                    formParser={formParser}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditLocationScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: item => {
        return item && (item.name|| '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Location', { count: 1 }),
        });
    },
});
