import gql from 'graphql-tag';
import PREVEW_ANIMAL from '@graphql/fragments/Animal/previewAnimal.gql.js';

export default gql`
    ${PREVEW_ANIMAL}
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
                    ...previewAnimal
                }
            }
        }
    }
`
