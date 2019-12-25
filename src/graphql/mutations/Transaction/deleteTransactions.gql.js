import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteTransactions(ids: $ids) {
            id
        }
    }
`
