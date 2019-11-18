import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteAnimals(ids: $ids) {
            id
        }
    }
`
