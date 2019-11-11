import gql from 'graphql-tag';

export default gql`
    query($id: ID!) {
        shortlink(id: $id) {
            id
            resource {
                ...on Animal {
                    id
                }

                ...on Enclosure {
                    id
                }
            }
        }
    }
`
