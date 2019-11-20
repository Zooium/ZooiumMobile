import gql from 'graphql-tag';
import FULL_LOCATION from '@graphql/fragments/Location/fullLocation.gql.js';

export default gql`
    ${FULL_LOCATION}
    mutation($team_id: ID!, $name: String!, $address: String, $city: String, $postcode: String, $state: String, $country: String) {
        createLocation(team_id: $team_id, name: $name, address: $address, city: $city, postcode: $postcode, state: $state, country: $country) {
            ...fullLocation
        }
    }
`
