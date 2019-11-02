import gql from 'graphql-tag'
import i18n from '@src/i18n.js'
import PREVIEW_ANIMAL from './previewAnimal.gql.js';

export default FULL_ANIMAL = gql`
    ${PREVIEW_ANIMAL}
    fragment fullAnimal on Animal {
        id
        identifier
        name
        slug
        sex
        notes
        born_at

        father {
            ...previewAnimal

            father {
                ...previewAnimal
            }

            mother {
                ...previewAnimal
            }
        }

        mother {
            ...previewAnimal

            father {
                ...previewAnimal
            }

            mother {
                ...previewAnimal
            }
        }

        enclosure {
            id
            name
            slug
            
            location {
                id
                name
            }
        }
        
        specie_name
        specie {
            id
            scientific
            english_name
            ${i18n.localeName()}

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

        files {
            id
            view_url
            download_url
            thumbnail_url
            extension
            name
            tag
        }
    }
`
