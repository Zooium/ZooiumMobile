import gql from 'graphql-tag';
import FULL_TRANSACTION_ITEM from '@graphql/fragments/Transaction/Item/fullTransactionItem.gql.js';

export default gql`
    ${FULL_TRANSACTION_ITEM}
    fragment fullTransaction on Transaction {
        id
        notes
        occurred_at

        contact {
            id
            name
        }

        items {
            ...fullTransactionItem
        }
    }
`
