import gql from 'graphql-tag';
import FULL_TRANSACTION_ITEM from '@graphql/fragments/Transaction/Item/fullTransactionItem.gql.js';

export default gql`
    ${FULL_TRANSACTION_ITEM}
    mutation($team_id: ID!, $relation_id: ID, $transaction_id: ID, $resource_id: ID, $resource_type: String, $direction: TransactionDirectionEnum!, $type: String, $attribute: String, $value: Int) {
        createTransactionItem(team_id: $team_id, relation_id: $relation_id, transaction_id: $transaction_id, resource_id: $resource_id, resource_type: $resource_type, direction: $direction, type: $type, attribute: $attribute, value: $value) {
            ...fullTransactionItem
        }
    }
`
