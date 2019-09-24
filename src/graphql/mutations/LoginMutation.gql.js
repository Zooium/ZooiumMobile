import gql from 'graphql-tag';
import FULL_USER from '@graphql/fragments/FullUser.gql.js';

export default gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token

            user {
                ...fullUser
            }
        }
    }

    ${FULL_USER}
`;
