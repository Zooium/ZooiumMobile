import gql from 'graphql-tag'
import FULL_ANIMAL from '@graphql/fragments/Animal/fullAnimal.gql.js'

export default gql`
    ${FULL_ANIMAL}
    query($id: ID!) {
        animal(id: $id) {
            ...fullAnimal
        }
    }
`
