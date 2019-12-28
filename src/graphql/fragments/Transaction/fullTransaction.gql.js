import gql from 'graphql-tag';
import FULL_ANIMAL from '@graphql/fragments/Animal/fullAnimal.gql.js';

export default gql`
    ${FULL_ANIMAL}
    fragment fullTransaction on Transaction {
        id
        notes
        occurred_at

        contact {
            id
            name
        }

        items {
            id
            direction
            type
            attribute
            value

            relation { id }

            resource {
                ...on Animal {
                    ...fullAnimal
                }
            }
        }
    }
`
