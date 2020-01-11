import React from 'react';
import i18n from '@src/i18n.js';
import { Input } from '@ui-kitten/components';
import FileSettings from '@settings/FileSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import UPDATE_FILE from '@graphql/mutations/File/updateFile.gql.js';
import UPLOAD_FILE from '@graphql/mutations/File/uploadFile.gql.js';
import DELETE_FILES from '@graphql/mutations/File/deleteFiles.gql.js';

const items = [
    {
        title: i18n.t('General'),
        data: [
            {
                key: 'name',
                required: () => true,
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

export default function FileEditScreen() {
    return (
        <ResourceEdit
            items={items}
            mutations={{
                save: UPDATE_FILE,
                create: UPLOAD_FILE,
                remove: DELETE_FILES,
            }}

            formInit={formInit}
        />
    );
}

FileEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: FileSettings.title,
});
