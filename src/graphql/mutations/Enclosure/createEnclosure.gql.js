import gql from 'graphql-tag';
import BASE_ENCLOSURE from '@graphql/fragments/Enclosure/baseEnclosure.gql.js';

export default gql`
    ${BASE_ENCLOSURE}
    mutation($name: String!, $team_id: ID!, $location_id: ID) {
        createEnclosure(name: $name, team_id: $team_id, location_id: $location_id) {
            ...baseEnclosure
        }
    }
`
