import gql from 'graphql-tag';
import FULL_TRANSACTION from '@graphql/fragments/Transaction/fullTransaction.gql.js';

export default gql`
    ${FULL_TRANSACTION}
    mutation($team_id: ID!, $contact_id: ID, $notes: String, $occurred_at: String, $items: [ID]) {
        createTransaction(team_id: $team_id, contact_id: $contact_id, notes: $notes, occurred_at: $occurred_at, items: $items) {
            ...fullTransaction
        }
    }
`
