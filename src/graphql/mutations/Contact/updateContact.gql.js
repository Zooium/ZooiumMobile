import gql from 'graphql-tag';
import BASE_CONTACT from '@graphql/fragments/Contact/baseContact.gql.js';

export default gql`
    ${BASE_CONTACT}
    mutation($id: ID!, $name: String!, $email: String, $phone: String, $address: String, $notes: String) {
        updateContact(id: $id, name: $name, email: $email, phone: $phone, address: $address, notes: $notes) {
            ...baseContact
        }
    }
`
