import gql from 'graphql-tag';

export default gql`
    mutation($id: ID!, $resource_id: ID, $resource_type: String, $name: String, $tag: String) {
        updateFile(id: $id, resource_id: $resource_id, resource_type: $resource_type, name: $name, tag: $tag) {
            id
            name
            tag
        }
    }
`
