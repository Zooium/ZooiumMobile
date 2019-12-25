import gql from 'graphql-tag';

export default gql`
    fragment baseTransaction on Transaction {
        id
        notes,
        occurred_at

        contact {
            id
            name
        }
    }
`
