import gql from 'graphql-tag';
import { localeName, shortLocale } from '@src/i18n.js';

export default gql`
    query($limit: Int, $page: Int, $search: String) {
        species(limit: $limit, page: $page, language: "${shortLocale()}", search: $search) {
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
