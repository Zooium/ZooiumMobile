import gql from 'graphql-tag';

export default gql`
    fragment baseContact on Contact {
        id
        name
        email
        phone
        address
        notes
        transactions_count
    }
`
