import gql from 'graphql-tag';
import { localeName } from '@src/i18n.js';

export default gql`
    query($limit: Int, $page: Int, $language: String, $search: String) {
        species(limit: $limit, page: $page, language: $language, search: $search) {
            total
            per_page
            
            data {
                id
                scientific
                ${localeName()}
            }
        }
    }
`
