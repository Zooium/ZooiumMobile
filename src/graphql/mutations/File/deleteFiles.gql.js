import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteFiles(ids: $ids) {
            id
        }
    }
`
