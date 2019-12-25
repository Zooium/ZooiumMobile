import gql from 'graphql-tag'
import BASE_TRANSACTION from '@graphql/fragments/Transaction/baseTransaction.gql.js'

export default gql`
    ${BASE_TRANSACTION}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        transactions(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseTransaction
            }
        }
    }
`
