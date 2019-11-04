import gql from 'graphql-tag'
import { localeName } from '@src/i18n.js'

export default PREVIEW_ANIMAL = gql`
    fragment previewAnimal on Animal {
        id
        name
        identifier

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

            cites {
                id
                source
                source_id
                listing
            }

            specie {
                id
                cites {
                    id
                    source
                    source_id
                    listing
                }
            }
        }
    }
`
