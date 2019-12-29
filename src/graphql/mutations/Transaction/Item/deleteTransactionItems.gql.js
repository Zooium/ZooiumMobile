import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteTransactionItems(ids: $ids) {
            id
        }
    }
`
