import gql from 'graphql-tag'
import { localeName } from '@src/i18n.js'
import PREVIEW_ANIMAL from './previewAnimal.gql.js';
import BASE_EVENT from '@graphql/fragments/Event/baseEvent.gql.js';

export default gql`
    ${BASE_EVENT}
    ${PREVIEW_ANIMAL}
    fragment fullAnimal on Animal {
        id
        identifier
        name
        slug
        sex
        notes
        born_at
        created_at

        state {
            ...baseEvent
        }

        father {
            ...previewAnimal
        }

        mother {
            ...previewAnimal
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
