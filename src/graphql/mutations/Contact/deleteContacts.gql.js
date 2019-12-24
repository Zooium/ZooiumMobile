import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteContacts(ids: $ids) {
            id
        }
    }
`
