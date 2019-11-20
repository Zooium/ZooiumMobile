import gql from 'graphql-tag';
import BASE_ENCLOSURE from '@graphql/fragments/Enclosure/baseEnclosure.gql.js';

export default gql`
    ${BASE_ENCLOSURE}
    mutation($id: ID!, $name: String!, $location_id: ID) {
        updateEnclosure(id: $id, name: $name, location_id: $location_id) {
            ...baseEnclosure
        }
    }
`
