import gql from 'graphql-tag'
import FULL_TRANSACTION from '@graphql/fragments/Transaction/fullTransaction.gql.js'

export default gql`
    ${FULL_TRANSACTION}
    query($id: ID!) {
        transaction(id: $id) {
            ...fullTransaction
        }
    }
`
