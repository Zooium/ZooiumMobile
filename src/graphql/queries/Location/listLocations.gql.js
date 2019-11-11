import gql from 'graphql-tag'
import BASE_LOCATION from '@graphql/fragments/Location/baseLocation.gql.js'

export default LIST_LOCATIONS = gql`
    ${BASE_LOCATION}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        locations(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseLocation
            }
        }
    }
`
