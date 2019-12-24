import gql from 'graphql-tag'
import BASE_CONTACT from '@graphql/fragments/Contact/baseContact.gql.js'

export default gql`
    ${BASE_CONTACT}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        contacts(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseContact
            }
        }
    }
`
