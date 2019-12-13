import gql from 'graphql-tag';

export default gql`
    query($id: ID!) {
        animal(id: $id) {
            id
            
            files {
                id
                view_url
                download_url
                thumbnail_url
                extension
                name
                tag
            }
        }
    }
`
