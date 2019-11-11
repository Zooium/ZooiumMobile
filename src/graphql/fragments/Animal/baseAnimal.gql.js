import gql from 'graphql-tag'
import { localeName } from '@src/i18n.js'

export default gql`
    fragment baseAnimal on Animal {
        id
        identifier
        name
        slug
        sex
        notes
        born_at

        enclosure {
            id
            name
            slug
        }
        
        specie_name
        specie {
            id
            scientific
            english_name
            ${localeName()}
        }
    }
`
