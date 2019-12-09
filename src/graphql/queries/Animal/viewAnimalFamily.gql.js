import gql from 'graphql-tag';
import PREVIEW_ANIMAL from '@graphql/fragments/Animal/previewAnimal.gql.js';

export default gql`
    ${PREVIEW_ANIMAL}
    query($id: ID!) {
        animal(id: $id) {
            ...previewAnimal
            
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
        }
    }
`
