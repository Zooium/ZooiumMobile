import React from 'react';
import AnimalSettings from '@settings/AnimalSettings.js';
import VIEW_ANIMAL from '@graphql/queries/Animal/viewAnimal.gql.js';
import ResourceWrapper from '@components/resource/ResourceWrapper.js';
import UPDATE_ANIMAL from '@graphql/mutations/Animal/updateAnimal.gql.js';
import CREATE_ANIMAL from '@graphql/mutations/Animal/createAnimal.gql.js';
import DELETE_ANIMALS from '@graphql/mutations/Animal/deleteAnimals.gql.js';

export default function AnimalViewScreen(props) {
    return (
        <ResourceWrapper
            items={AnimalSettings.fields}
            parser={AnimalSettings.parser}
            headers={AnimalSettings.headers}
            formInit={AnimalSettings.formInit}

            fetch={VIEW_ANIMAL}
            mutations={{
                save: UPDATE_ANIMAL,
                create: CREATE_ANIMAL,
                remove: DELETE_ANIMALS,
            }}
                
            routes={{
                view: 'AnimalView',
                edit: 'AnimalEdit',
            }}

            {...props}
        />
    );
}

AnimalViewScreen.navigationOptions = (props) => ResourceWrapper.navigationOptions({
    ...props, title: AnimalSettings.title,
});
