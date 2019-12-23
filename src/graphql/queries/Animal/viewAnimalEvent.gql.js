import gql from 'graphql-tag';

export default gql`
    query($id: ID!) {
        animal(id: $id) {
            id
            events {
                id
                state
                value
                notes
                occurred_at

                connection {
                    ...on TransactionItem {
                        id

                        transaction {
                            id
                        }
                    }
                }
            }
        }
    }
`
