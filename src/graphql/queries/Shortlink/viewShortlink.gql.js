import gql from 'graphql-tag';

export default VIEW_SHORTLINK = gql`
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
