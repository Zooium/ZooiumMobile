import gql from 'graphql-tag';
import BASE_LOCATION from '@graphql/fragments/Location/baseLocation.gql.js';

export default BASE_ENCLOSURE = gql`
    ${BASE_LOCATION}
    fragment baseEnclosure on Enclosure {
        id
        name
        slug
        distance
        animals_count

        location {
            ...baseLocation
        }
    }
`
