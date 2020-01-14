import React from 'react';
import AnimalSettings from '@settings/AnimalSettings.js';
import ResourceView from '@components/resource/ResourceView.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalViewScreen() {
    return (
        <ResourceView
            items={AnimalSettings.fields}
            parser={AnimalSettings.parser}
            headers={AnimalSettings.headers}
            fetch={VIEW_ANIMAL}

            mutations={{
                remove: DELETE_ANIMALS,
            }}
                
            routes={{
                edit: 'AnimalEdit',
            }}
        />
    );
}

AnimalViewScreen.navigationOptions = (props) => ResourceView.navigationOptions({
    ...props, title: AnimalSettings.title,
});
