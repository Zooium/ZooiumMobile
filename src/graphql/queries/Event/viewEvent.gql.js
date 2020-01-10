import gql from 'graphql-tag'
import FULL_EVENT from '@graphql/fragments/Event/fullEvent.gql.js'

export default gql`
    ${FULL_EVENT}
    query($id: ID!) {
        event(id: $id) {
            ...fullEvent
        }
    }
`
