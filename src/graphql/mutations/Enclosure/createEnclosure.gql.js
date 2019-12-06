import gql from 'graphql-tag';
import BASE_ENCLOSURE from '@graphql/fragments/Enclosure/baseEnclosure.gql.js';

export default gql`
    ${BASE_ENCLOSURE}
    mutation($name: String!, $team_id: ID!, $location_id: ID, $coordinate: CoordinateInput) {
        createEnclosure(name: $name, team_id: $team_id, location_id: $location_id, coordinate: $coordinate) {
            ...baseEnclosure
        }
    }
`
