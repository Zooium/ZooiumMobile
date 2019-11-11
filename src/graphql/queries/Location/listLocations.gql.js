import gql from 'graphql-tag'
import FULL_LOCATION from '@graphql/fragments/Location/fullLocation.gql.js'

export default LIST_LOCATIONS = gql`
    ${FULL_LOCATION}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        locations(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...fullLocation
            }
        }
    }
`
