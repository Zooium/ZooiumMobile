import gql from 'graphql-tag';

export default gql`
    fragment baseEvent on Event {
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
                    occurred_at
                }
            }
        }
    }
`
