import React from 'react';
import { Layout } from '@ui-kitten/components';
import LocationSettings from '@settings/LocationSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import VIEW_LOCATION from '@graphql/queries/Location/viewLocation.gql.js';
import UPDATE_LOCATION from '@graphql/mutations/Location/updateLocation.gql.js';
import CREATE_LOCATION from '@graphql/mutations/Location/createLocation.gql.js';

const formInit = () => ({
    name: '',
    address: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
})

export default function EditLocationScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={LocationSettings.fields}
                    formInit={LocationSettings.formInit}
                    
                    fetch={VIEW_LOCATION}
                    mutations={{
                        save: UPDATE_LOCATION,
                        create: CREATE_LOCATION,
                    }}

                    routes={{
                        view: 'ViewLocation',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditLocationScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: LocationSettings.title,
});
