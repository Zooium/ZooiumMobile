import gql from 'graphql-tag';
import FULL_EVENT from '@graphql/fragments/Event/fullEvent.gql.js';

export default gql`
    ${FULL_EVENT}
    mutation($team_id: ID!, $resource_id: ID!, $resource_type: String!, $state: EventStatusEnum, $value: String, $notes: String, $occurred_at: String!) {
        createEvent(team_id: $team_id, resource_id: $resource_id, resource_type: $resource_type, state: $state, value: $value, notes: $notes, occurred_at: $occurred_at) {
            ...fullEvent
        }
    }
`
