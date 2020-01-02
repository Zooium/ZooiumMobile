import React from 'react';
import { Layout } from '@ui-kitten/components';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceEdit from '@components/resource/ResourceEdit.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import UPDATE_ANIMAL from '@graphql/mutations/Animal/updateAnimal.gql.js';
import CREATE_ANIMAL from '@graphql/mutations/Animal/createAnimal.gql.js';
import KeyboardAvoidingLayout from '@components/KeyboardAvoidingLayout.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalEditScreen() {
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
                        remove: DELETE_ANIMALS,
                    }}

                    routes={{
                        view: 'AnimalView',
                    }}
                />
            </Layout>
        </KeyboardAvoidingLayout>
    )
}

AnimalEditScreen.navigationOptions = (props) => ResourceEdit.navigationOptions({
    ...props, title: AnimalSettings.title,
});
