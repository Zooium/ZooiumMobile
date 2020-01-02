import React from 'react';
import { Layout } from '@ui-kitten/components';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalViewScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={AnimalSettings.fields}
                headers={AnimalSettings.headers}
                fetch={VIEW_ANIMAL}

                mutations={{
                    remove: DELETE_ANIMALS,
                }}
                    
                routes={{
                    edit: 'AnimalEdit',
                }}
            />
        </Layout>
    )
}

AnimalViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: AnimalSettings.title,
});
