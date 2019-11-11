import gql from 'graphql-tag'
import BASE_LOCATION from '@graphql/fragments/Location/baseLocation.gql.js'

export default VIEW_LOCATION = gql`
    ${BASE_LOCATION}
    query($id: ID!) {
        location(id: $id) {
            ...baseLocation
        }
    }
`
