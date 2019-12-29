import gql from 'graphql-tag';
import FULL_ANIMAL from '@graphql/fragments/Animal/fullAnimal.gql.js';

export default gql`
    ${FULL_ANIMAL}
    fragment fullTransactionItem on TransactionItem {
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
`
