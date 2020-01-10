import gql from 'graphql-tag';

export default gql`
    fragment fullEvent on Event {
        id
        state
        value
        notes
        occurred_at

        resource {
            ...on Animal {
                id
                identifier
                animalName: name
            }

            ...on Enclosure {
                id
                enclosureName: name
            }
        }

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
