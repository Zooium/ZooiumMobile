import gql from 'graphql-tag';

export default FULL_USER = gql`
    fragment fullUser on User {
        id
        name
        email
        username
        created_at
        updated_at
        email_verified_at

        team {
            id
            name
            created_at
            updated_at

            owner {
                id
            }
        }
    }
`;
