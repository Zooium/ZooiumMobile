import gql from 'graphql-tag';
import FULL_LOCATION from '@graphql/fragments/Location/fullLocation.gql.js';

export default gql`
    ${FULL_LOCATION}
    mutation($id: ID!, $name: String, $address: String, $city: String, $postcode: String, $state: String, $country: String) {
        updateLocation(id: $id, name: $name, address: $address, city: $city, postcode: $postcode, state: $state, country: $country) {
            ...fullLocation
        }
    }
`
