import gql from 'graphql-tag';
import FULL_ANIMAL from '@graphql/fragments/Animal/fullAnimal.gql.js';

export default gql`
    ${FULL_ANIMAL}
    mutation($team_id: ID!, $enclosure_id: ID, $specie_id: ID, $specie_name: String, $father_id: ID, $mother_id: ID, $identifier: String, $name: String, $sex: SexEnum, $notes: String, $born_at: String, $files: [ID]) {
        createAnimal(team_id: $team_id, enclosure_id: $enclosure_id, specie_id: $specie_id, specie_name: $specie_name, father_id: $father_id, mother_id: $mother_id, identifier: $identifier, name: $name, sex: $sex, notes: $notes, born_at: $born_at, files: $files) {
            ...fullAnimal
        }
    }
`
