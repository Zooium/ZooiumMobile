import gql from 'graphql-tag'
import BASE_ENCLOSURE from '@graphql/fragments/Enclosure/baseEnclosure.gql.js'

export default LIST_ENCLOSURES = gql`
    ${BASE_ENCLOSURE}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        enclosures(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseEnclosure
            }
        }
    }
`
