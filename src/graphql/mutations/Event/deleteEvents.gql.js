import gql from 'graphql-tag';

export default gql`
    mutation($ids: [ID]!) {
        deleteEvents(ids: $ids) {
            id
        }
    }
`
