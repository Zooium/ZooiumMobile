import gql from 'graphql-tag';
import { shortLocale } from '@src/i18n.js';
import BASE_ANIMAL from '@graphql/fragments/Animal/baseAnimal.gql.js';

export default gql`
    ${BASE_ANIMAL}
    query($team_id: ID!, $limit: Int, $page: Int, $search: String, $sorting: SortingInput, $filter: [String]) {
        animals(team_id: $team_id, limit: $limit, page: $page, language: "${shortLocale()}", search: $search, sorting: $sorting, filter: $filter) {
            total
            per_page

            data {
                ...baseAnimal
            }
        }
    }
`
