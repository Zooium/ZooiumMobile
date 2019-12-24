import gql from 'graphql-tag'
import BASE_CONTACT from '@graphql/fragments/Contact/baseContact.gql.js'

export default gql`
    ${BASE_CONTACT}
    query($id: ID!) {
        contact(id: $id) {
            ...baseContact
        }
    }
`
