import gql from 'graphql-tag';
import BASE_EVENT from '@graphql/fragments/Event/baseEvent.gql.js';

export default gql`
    ${BASE_EVENT}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput) {
        events(team_id: $team_id, limit: $limit, page: $page, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseEvent
            }
        }
    }
`
