import gql from 'graphql-tag';
import BASE_CONTACT from '@graphql/fragments/Contact/baseContact.gql.js';

export default gql`
    ${BASE_CONTACT}
    mutation($team_id: ID!, $name: String!, $email: String, $phone: String, $address: String, $notes: String) {
        createContact(team_id: $team_id, name: $name, email: $email, phone: $phone, address: $address, notes: $notes) {
            ...baseContact
        }
    }
`
