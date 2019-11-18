import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteLocations(ids: $ids) {
            id
        }
    }
`
