import React from 'react';
import { Layout } from '@ui-kitten/components';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';

export default function ViewAnimalScreen() {
    return (
        <Layout style={{ flex: 1 }}>
            <ResourceView
                items={AnimalSettings.fields}
                headers={AnimalSettings.headers}
                fetch={VIEW_ANIMAL}
                    
                routes={{
                    edit: 'EditAnimal',
                }}
            />
        </Layout>
    )
}

ViewAnimalScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: AnimalSettings.title,
});
