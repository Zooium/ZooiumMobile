import gql from 'graphql-tag'
import i18n from '@src/i18n.js'

export default BASE_ANIMAL = gql`
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
            ${i18n.localeName()}
        }
    }
`
