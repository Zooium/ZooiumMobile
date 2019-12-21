import React from 'react';
import { Layout } from '@ui-kitten/components';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import UPDATE_ANIMAL from '@graphql/mutations/Animal/updateAnimal.gql.js';
import CREATE_ANIMAL from '@graphql/mutations/Animal/createAnimal.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';

export default function EditAnimalScreen() {
    return (
        <KeyboardAvoidingLayout>
            <Layout style={{ flex: 1 }}>
                <ResourceEdit
                    items={AnimalSettings.fields}
                    formInit={AnimalSettings.formInit}
                    formParser={AnimalSettings.formParser}
                    
                    fetch={VIEW_ANIMAL}
                    mutations={{
                        save: UPDATE_ANIMAL,
                        create: CREATE_ANIMAL,
                    }}

                    routes={{
                        view: 'ViewAnimal',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

EditAnimalScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: AnimalSettings.title,
});
