import React from 'react';
import i18n from '@src/i18n.js';
import { Layout, Input } from '@ui-kitten/components';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import UPDATE_FILE from '@graphql/mutations/File/updateFile.gql.js';
import UPLOAD_FILE from '@graphql/mutations/File/uploadFile.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

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
        ],
    },
];

const formInit = () => ({
    name: '',
})

const formParser = (resource) => {
    return resource;
}

export default function EditFileScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={items}
                    mutations={{
                        save: UPDATE_FILE,
                        create: UPLOAD_FILE,
                    }}

                    formInit={formInit}
                    formParser={formParser}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditFileScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: item => {
        return item && (item.name|| '(' + i18n.t('name not set') + ')') || i18n.t('Creating {{resource}}', {
            resource: i18n.t('Media'),
        });
    },
});
