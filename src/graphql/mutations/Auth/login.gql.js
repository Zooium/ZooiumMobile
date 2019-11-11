import gql from 'graphql-tag';
import FULL_USER from '@graphql/fragments/fullUser.gql.js';

export default gql`
    ${FULL_USER}
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token

            user {
                ...fullUser
            }
        }
    }
`;
