import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteEnclosures(ids: $ids) {
            id
        }
    }
`
