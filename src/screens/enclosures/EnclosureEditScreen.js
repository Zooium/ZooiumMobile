import React from 'react';
import { Layout } from '@ui-kitten/components';
import EnclosureSettings from '@settings/EnclosureSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import VIEW_ENCLOSURE from '@graphql/queries/Enclosure/viewEnclosure.gql.js';
import UPDATE_ENCLOSURE from '@graphql/mutations/Enclosure/updateEnclosure.gql.js';
import CREATE_ENCLOSURE from '@graphql/mutations/Enclosure/createEnclosure.gql.js';

export default function EnclosureEditScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={EnclosureSettings.fields}
                    formInit={EnclosureSettings.formInit}
                    formParser={EnclosureSettings.formParser}

                    fetch={VIEW_ENCLOSURE}
                    mutations={{
                        save: UPDATE_ENCLOSURE,
                        create: CREATE_ENCLOSURE,
                    }}

                    routes={{
                        view: 'EnclosureView',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EnclosureEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: EnclosureSettings.title,
});

