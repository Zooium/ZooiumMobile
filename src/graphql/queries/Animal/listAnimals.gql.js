import gql from 'graphql-tag'
import BASE_ANIMAL from '@graphql/fragments/Animal/baseAnimal.gql.js'

export default gql`
    ${BASE_ANIMAL}
    query($team_id: ID!, $limit: Int, $page: Int, $language: String, $search: String, $sorting: SortingInput) {
        animals(team_id: $team_id, limit: $limit, page: $page, language: $language, search: $search, sorting: $sorting) {
            total
            per_page

            data {
                ...baseAnimal
            }
        }
    }
`
