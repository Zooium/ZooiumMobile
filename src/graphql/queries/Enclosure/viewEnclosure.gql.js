import gql from 'graphql-tag'
import BASE_ENCLOSURE from '@graphql/fragments/Enclosure/baseEnclosure.gql.js'

export default VIEW_ENCLOSURE = gql`
    ${BASE_ENCLOSURE}
    query($id: ID!) {
        enclosure(id: $id) {
            ...baseEnclosure
        }
    }
`
