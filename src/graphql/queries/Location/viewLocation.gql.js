import gql from 'graphql-tag'
import FULL_LOCATION from '@graphql/fragments/Location/fullLocation.gql.js'

export default gql`
    ${FULL_LOCATION}
    query($id: ID!) {
        location(id: $id) {
            ...fullLocation
        }
    }
`
