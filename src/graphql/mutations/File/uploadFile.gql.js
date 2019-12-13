import gql from 'graphql-tag';

export default gql`
    mutation($team_id: ID!, $resource_id: ID, $resource_type: String!, $file: Upload!, $name: String, $tag: String) {
        uploadFile(team_id: $team_id, resource_id: $resource_id, resource_type: $resource_type, file: $file, name: $name, tag: $tag) {
            id
            view_url
            download_url
            thumbnail_url
            extension
            name
            tag
        }
    }
`
