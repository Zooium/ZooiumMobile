import gql from 'graphql-tag';

export default LOGOUT = gql`
    mutation {
        logout {
            id
        }
    }
`;
